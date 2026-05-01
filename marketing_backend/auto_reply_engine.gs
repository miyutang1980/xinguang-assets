/**
 * 太平新光自動回覆引擎
 *
 * 觸發器：每 5 分鐘掃 IG 與 FB 最新留言/私訊 → 比對 Auto_Reply 規則 → 自動回覆 + 寫 Interactions
 *
 * Functions:
 *   pollIGComments()     — 掃 IG 最新留言並自動回覆
 *   pollFBComments()     — 掃 FB 最新留言並自動回覆
 *   pollIGDMs()          — 掃 IG 私訊（需要 instagram_manage_messages 權限，後續加）
 *   installReplyTriggers()
 */

const AR_SS_ID = '1DybgWBdCyvkEijMyaE46rKLtQD9J2ImjU8xeYCKSKnA';
const AR_TZ = 'Asia/Taipei';

function ar_setting_(k) {
  const ss = SpreadsheetApp.openById(AR_SS_ID);
  const sh = ss.getSheetByName('Settings') || ss.getSheetByName('設定 Settings');
  const data = sh.getRange(1, 1, sh.getLastRow(), 2).getValues();
  for (const r of data) if (String(r[0]).trim() === k) return String(r[1]).trim();
  throw new Error('設定 ' + k + ' 不存在');
}

function pollAllPlatforms() {
  pollIGComments();
  pollFBComments();
}

/* ========================== IG ========================== */
function pollIGComments() {
  const ss = SpreadsheetApp.openById(AR_SS_ID);
  const qSh = ss.getSheetByName('排程佇列 Posting_Queue');
  const iSh = ss.getSheetByName('互動紀錄 Interactions');
  const rules = loadRules_(ss, 'IG');
  if (rules.length === 0) return;

  const token = ar_setting_('FB_PAGE_TOKEN');

  // 找最近 3 天 IG 已發貼文（從 Queue 取）
  const last = qSh.getLastRow();
  if (last < 2) return;
  const data = qSh.getRange(2, 1, last - 1, 22).getValues();
  const recent = data.filter(r => r[15] === '已發布' && r[17] && String(r[17]).indexOf('IG:') >= 0);
  const recentMedia = recent.slice(-30); // 最近 30 篇

  for (const r of recentMedia) {
    const m = String(r[17]).match(/IG:(\d+)/);
    if (!m) continue;
    const mediaId = m[1];

    try {
      const url = `https://graph.facebook.com/v19.0/${mediaId}/comments?fields=id,text,username,from,timestamp&limit=25&access_token=${token}`;
      const res = JSON.parse(UrlFetchApp.fetch(url, { muteHttpExceptions: true }).getContentText());
      if (!res.data) continue;

      for (const c of res.data) {
        if (alreadyHandled_(iSh, c.id)) continue;
        const matched = matchRules_(rules, c.text, '留言');
        if (matched) {
          replyIGComment_(c.id, matched.reply, token);
          appendInteraction_(iSh, 'IG', '留言', mediaId, c.from?.id || c.username, c.username, c.text, matched);
          incRuleHit_(ss, matched.ruleId);
          Utilities.sleep(2000);
        } else {
          appendInteraction_(iSh, 'IG', '留言', mediaId, c.from?.id || c.username, c.username, c.text, null);
        }
      }
    } catch (e) { Logger.log('IG poll fail: ' + e); }
  }
}

function replyIGComment_(commentId, message, token) {
  UrlFetchApp.fetch(`https://graph.facebook.com/v19.0/${commentId}/replies`, {
    method: 'post',
    payload: { message: message, access_token: token },
    muteHttpExceptions: true
  });
}

/* ========================== FB ========================== */
function pollFBComments() {
  const ss = SpreadsheetApp.openById(AR_SS_ID);
  const qSh = ss.getSheetByName('排程佇列 Posting_Queue');
  const iSh = ss.getSheetByName('互動紀錄 Interactions');
  const rules = loadRules_(ss, 'FB');
  if (rules.length === 0) return;

  const token = ar_setting_('FB_PAGE_TOKEN');
  const pageId = ar_setting_('FB_PAGE_ID');

  const last = qSh.getLastRow();
  if (last < 2) return;
  const data = qSh.getRange(2, 1, last - 1, 22).getValues();
  const recent = data.filter(r => r[15] === '已發布' && r[17] && String(r[17]).indexOf('FB:') >= 0);
  const recentPosts = recent.slice(-30);

  for (const r of recentPosts) {
    const m = String(r[17]).match(/FB:([\d_]+)/) || [];
    const postId = m[1];
    if (!postId) continue;

    try {
      const url = `https://graph.facebook.com/v19.0/${postId}/comments?fields=id,message,from,created_time&limit=25&access_token=${token}`;
      const res = JSON.parse(UrlFetchApp.fetch(url, { muteHttpExceptions: true }).getContentText());
      if (!res.data) continue;

      for (const c of res.data) {
        if (alreadyHandled_(iSh, c.id)) continue;
        // 略過自家粉專留言
        if (c.from && c.from.id === pageId) continue;
        const matched = matchRules_(rules, c.message || '', '留言');
        if (matched) {
          replyFBComment_(c.id, matched.reply, token);
          appendInteraction_(iSh, 'FB', '留言', postId, c.from?.id, c.from?.name, c.message, matched);
          incRuleHit_(ss, matched.ruleId);
          Utilities.sleep(2000);
        } else {
          appendInteraction_(iSh, 'FB', '留言', postId, c.from?.id, c.from?.name, c.message, null);
        }
      }
    } catch (e) { Logger.log('FB poll fail: ' + e); }
  }
}

function replyFBComment_(commentId, message, token) {
  UrlFetchApp.fetch(`https://graph.facebook.com/v19.0/${commentId}/comments`, {
    method: 'post',
    payload: { message: message, access_token: token },
    muteHttpExceptions: true
  });
}

/* ========================== 規則比對 ========================== */
function loadRules_(ss, platformPrefix) {
  const sh = ss.getSheetByName('自動回覆 Auto_Reply');
  const last = sh.getLastRow();
  if (last < 2) return [];
  const data = sh.getRange(2, 1, last - 1, 14).getValues();
  return data
    .filter(r => String(r[1]).toUpperCase() === 'TRUE' && String(r[2]).indexOf(platformPrefix) >= 0)
    .map(r => ({
      ruleId: r[0],
      platforms: r[2],
      triggerType: r[3],
      keywords: String(r[4]).split('|').map(s => s.trim()).filter(s => s),
      matchType: r[5],   // 包含/起始於/精準
      reply: r[6],
      replyMode: r[7],
      followUp: r[8],
      tag: r[9]
    }));
}

function matchRules_(rules, text, triggerType) {
  text = String(text || '').toLowerCase();
  for (const rule of rules) {
    if (rule.triggerType !== triggerType && rule.triggerType !== '全部') continue;
    for (const kw of rule.keywords) {
      const kwLow = kw.toLowerCase();
      if (rule.matchType === '起始於') {
        if (text.indexOf(kwLow) === 0) return rule;
      } else if (rule.matchType === '精準') {
        if (text === kwLow) return rule;
      } else { // 包含
        if (text.indexOf(kwLow) >= 0) return rule;
      }
    }
  }
  return null;
}

function appendInteraction_(sh, platform, type, postId, userId, userName, content, matched) {
  const now = Utilities.formatDate(new Date(), AR_TZ, 'yyyy-MM-dd HH:mm:ss');
  const id = `${platform}_${Math.random().toString(36).substr(2, 9)}_${Date.now()}`;
  sh.appendRow([
    id, now, platform, type, postId, userId || '', userName || '',
    content || '',
    matched ? '正向' : '中性',
    matched ? 'TRUE' : 'FALSE',
    matched ? matched.reply : '',
    matched ? matched.replyMode : '',
    matched ? '自動' : '',
    matched ? matched.tag : '',
    matched && matched.followUp === '建立預約Lead' ? 'TRUE' : ''
  ]);
}

function alreadyHandled_(iSh, externalId) {
  // 簡單 dedupe：如果 Interactions 內含這個 externalId 字串（用 user_name 或 內容 key），略
  // 這裡用 cache（PropertiesService）較精確
  const cache = PropertiesService.getScriptProperties();
  const key = 'h_' + externalId;
  if (cache.getProperty(key)) return true;
  cache.setProperty(key, '1');
  return false;
}

function incRuleHit_(ss, ruleId) {
  const sh = ss.getSheetByName('自動回覆 Auto_Reply');
  const last = sh.getLastRow();
  const ids = sh.getRange(2, 1, last - 1, 1).getValues();
  for (let i = 0; i < ids.length; i++) {
    if (ids[i][0] === ruleId) {
      const rowNum = i + 2;
      const cur = sh.getRange(rowNum, 11).getValue() || 0;
      sh.getRange(rowNum, 11).setValue(cur + 1);
      sh.getRange(rowNum, 12).setValue(Utilities.formatDate(new Date(), AR_TZ, 'yyyy-MM-dd HH:mm:ss'));
      return;
    }
  }
}

/* ========================== Triggers ========================== */
function installReplyTriggers() {
  ScriptApp.getProjectTriggers().forEach(t => {
    if (t.getHandlerFunction() === 'pollAllPlatforms') ScriptApp.deleteTrigger(t);
  });
  ScriptApp.newTrigger('pollAllPlatforms').timeBased().everyMinutes(5).create();
  SpreadsheetApp.getUi().alert('自動回覆觸發器：每 5 分鐘掃描 IG/FB 留言');
}

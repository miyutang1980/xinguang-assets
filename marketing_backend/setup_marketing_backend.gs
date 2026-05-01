/**
 * 太平新光社群行銷後台 — 一鍵初始化所有分頁與資料
 *
 * 執行：setupMarketingBackend()
 *
 * 會建立：
 *   1. 排程佇列 Posting_Queue   (核心發文佇列)
 *   2. 自動回覆 Auto_Reply       (關鍵字 → 回覆規則)
 *   3. Insights                  (IG/FB 數據快照)
 *   4. 互動紀錄 Interactions     (留言/私訊原始資料)
 *   5. 預約 Bookings             (LIFF 預約寫入)
 *
 * 並把已存在的 Asset_Library 八月疊字版 84 列搬入 Posting_Queue
 * 從 5/4(一) 09:00 開始，依「八月課表方向直行」邏輯排程
 */

const SS_ID = '1DybgWBdCyvkEijMyaE46rKLtQD9J2ImjU8xeYCKSKnA';
const ASSET_SHEET = '素材庫 Asset_Library';
const VISUAL_FOLDER_ID = '15rYYJ5ZEJ6rTYEy_QthJuEAf6OU652D9';

const SHEETS = {
  QUEUE:    '排程佇列 Posting_Queue',
  REPLY:    '自動回覆 Auto_Reply',
  INSIGHTS: 'Insights',
  INTERACT: '互動紀錄 Interactions',
  BOOK:     '預約 Bookings'
};

const HEADERS = {
  [SHEETS.QUEUE]: ['queue_id','排程日期','排程時間','平台','比例','asset_id','圖片URL','縮圖URL','主題','文案_主標','文案_內文','Hashtags','CTA連結','圖片審核','文案審核','排程狀態','發文時間','post_id','post_url','錯誤訊息','建立時間','備註'],
  [SHEETS.REPLY]: ['rule_id','啟用','平台','觸發類型','關鍵字','比對方式','回覆訊息','回覆方式','後續動作','標籤','命中次數','最後命中時間','建立時間','備註'],
  [SHEETS.INSIGHTS]: ['snapshot_id','日期','平台','post_id','queue_id','impressions','reach','likes','comments','saves','shares','profile_visits','clicks','engagement_rate','觸及佔比','黃金窗','備註'],
  [SHEETS.INTERACT]: ['interaction_id','時間','平台','類型','post_id','user_id','user_name','內容','情緒','已回覆','回覆內容','回覆方式','處理人','標籤','轉預約'],
  [SHEETS.BOOK]: ['booking_id','建立時間','管道','家長姓名','孩子姓名','孩子年級','聯絡電話','LINE_user_id','希望日期','希望時段','備註','狀態','處理人','已聯繫時間','結果']
};

function setupMarketingBackend() {
  const ss = SpreadsheetApp.openById(SS_ID);
  let report = [];

  // 建分頁
  for (const [k, name] of Object.entries(SHEETS)) {
    let sh = ss.getSheetByName(name);
    if (!sh) {
      sh = ss.insertSheet(name);
      report.push(`✅ 新建：${name}`);
    } else {
      report.push(`已存在：${name}`);
    }
    // 寫表頭（如果第一列空）
    if (sh.getRange(1, 1).getValue() === '') {
      const h = HEADERS[name];
      sh.getRange(1, 1, 1, h.length).setValues([h]);
      sh.getRange(1, 1, 1, h.length).setFontWeight('bold').setBackground('#1f3864').setFontColor('#ffffff');
      sh.setFrozenRows(1);
    }
  }

  // 自動回覆預設 6 條規則
  seedAutoReplyRules_(ss);

  // 從 Asset_Library 把八月疊字 84 列搬入 Posting_Queue（依課表排程）
  const queueAdded = seedPostingQueue_(ss);
  report.push(`✅ 排程佇列匯入：${queueAdded} 列`);

  // 顯示報告
  const ui = SpreadsheetApp.getUi();
  // 確認 Settings token 齊全
  const settingsCheck = ensureSettings_(ss);
  report.push(settingsCheck);

  ui.alert('行銷後台初始化', report.join('\n'), ui.ButtonSet.OK);
}

/* -------- 確認 Settings 分頁有 token -------- */
function ensureSettings_(ss) {
  const sh = ss.getSheetByName('Settings');
  if (!sh) return '⚠️ 找不到 Settings 分頁，請先跑 updateSettingsDay1Final()';
  const data = sh.getRange(1, 1, sh.getLastRow(), 2).getValues();
  const required = ['FB_PAGE_TOKEN', 'FB_PAGE_ID', 'IG_BUSINESS_ACCOUNT_ID'];
  const missing = [];
  for (const k of required) {
    const found = data.find(r => String(r[0]).trim() === k && String(r[1]).trim());
    if (!found) missing.push(k);
  }
  return missing.length === 0 ? '✅ Settings token 齊全' : ('⚠️ Settings 缺：' + missing.join(', '));
}

/* -------- 選單：開 Sheet 時自動加上「行銷後台」選單 -------- */
function onOpen() {
  SpreadsheetApp.getUi()
    .createMenu('🚀 行銷後台')
    .addItem('一鍵初始化', 'setupMarketingBackend')
    .addSeparator()
    .addItem('圖片全審', 'approveAllImages')
    .addItem('文案全審', 'approveAllCopies')
    .addItem('雙審過者設為已排程', 'scheduleAllApproved')
    .addSeparator()
    .addItem('立即跑一輪排程器', 'processPostingQueue')
    .addItem('立即掃 IG/FB 留言', 'pollAllPlatforms')
    .addItem('立即抓今日 Insights', 'snapshotInsightsDaily')
    .addSeparator()
    .addItem('安裝發文觸發器', 'installTriggers')
    .addItem('安裝回覆觸發器', 'installReplyTriggers')
    .addToUi();
}

/* -------- 自動回覆預設規則 -------- */
function seedAutoReplyRules_(ss) {
  const sh = ss.getSheetByName(SHEETS.REPLY);
  if (sh.getLastRow() > 1) return; // 已有資料就不覆蓋

  const now = new Date();
  const rules = [
    ['R001','TRUE','IG+FB','留言','預約|體驗|報名|想了解|怎麼上課','包含',
     '感謝詢問！弋果太平新光分校提供 50 分鐘精細英語檢測（Sarah 老師 1 對 1），可協助評估孩子目前程度。歡迎私訊或加 LINE @143qbory 預約，剩 X 位早鳥 85 折名額。',
     '公開留言+私訊DM','建立預約Lead','預約意圖',0,'',now,''],
    ['R002','TRUE','IG+FB','留言','學費|多少錢|價格|價位','包含',
     '您好，學費依照孩子年級與班別不同，方便加 LINE @143qbory 由 Sarah 老師 1 對 1 為您介紹合適方案，並安排 50 分鐘精細檢測。',
     '私訊DM','請業務聯繫','詢價',0,'',now,''],
    ['R003','TRUE','IG+FB','留言','地址|在哪|位置|怎麼去','包含',
     '我們在台中市太平區的太平新光分校，導航搜尋「弋果太平新光」即可。歡迎先 LINE @143qbory 預約，我們會準備好茶水與 Sarah 老師等您。',
     '公開留言','標記參觀意圖','地址',0,'',now,''],
    ['R004','TRUE','IG+FB','留言','時間|幾點|上課|課表|時段','包含',
     '我們有平日班（17:00–19:00）與週六班（09:30–11:30/14:00–16:00）。實際時段依年級與班別調整，加 LINE @143qbory 由顧問為您客製排課建議。',
     '私訊DM','排課諮詢','時段',0,'',now,''],
    ['R005','TRUE','IG+FB','留言','英文不好|跟不上|怕|擔心|害怕','包含',
     '完全理解。Sarah 老師 1 對 1 的 50 分鐘精細檢測就是為了找出孩子目前的「卡點」，再給最適合的學習路徑。LINE @143qbory 私訊我們即可預約，今年秋季班還有早鳥 85 折。',
     '私訊DM','心理門檻Lead','焦慮型',0,'',now,''],
    ['R006','TRUE','IG+FB','私訊','你好|哈囉|hi|hello|請問','起始於',
     '哈囉～我是弋果太平新光顧問。請問是想了解：①50 分鐘精細檢測 ②課程介紹 ③學費時段？回 1/2/3 即可。',
     '私訊DM','分流選單','分流',0,'',now,'']
  ];
  sh.getRange(2, 1, rules.length, rules[0].length).setValues(rules);
}

/* -------- 把八月 84 列疊字版排成發文佇列 --------
 *  發文策略（八月，整月衝刺）：
 *   每天 12:30 IG+FB 1x1
 *   每天 17:00 IG Reels 9x16
 *   週一三五 19:00 FB 16x9
 *  起始：2026-08-01 (六) 開始 D01 主題
 */
function seedPostingQueue_(ss) {
  const qSh = ss.getSheetByName(SHEETS.QUEUE);
  if (qSh.getLastRow() > 1) return 0; // 已有資料就跳過

  const aSh = ss.getSheetByName(ASSET_SHEET);
  if (!aSh) {
    SpreadsheetApp.getUi().alert('找不到 ' + ASSET_SHEET);
    return 0;
  }

  const lastRow = aSh.getLastRow();
  const data = aSh.getRange(2, 1, lastRow - 1, 13).getValues();

  // 過濾八月疊字版（asset_id 開頭 AUG_、結尾 _TEXT）
  const augText = data.filter(r => /^AUG_D\d+_(1x1|16x9|9x16)_v5_TEXT$/i.test(r[0]));
  if (augText.length === 0) {
    SpreadsheetApp.getUi().alert('Asset_Library 找不到 AUG_*_TEXT 列，請先完成 Step 3');
    return 0;
  }

  // 依 day + ratio 索引
  const byKey = {};
  augText.forEach(r => {
    const m = r[0].match(/^AUG_D(\d+)_(\w+)_v5_TEXT$/i);
    if (!m) return;
    const day = parseInt(m[1], 10);
    const ratio = m[2].toLowerCase();
    byKey[`${day}_${ratio}`] = r;
  });

  // 八月起始：2026-08-01 (六)
  const baseStart = new Date(2026, 7, 1); // month 0-index → 7=8月
  const rows = [];
  const now = new Date();
  const ts = Utilities.formatDate(now, 'Asia/Taipei', 'yyyy-MM-dd HH:mm:ss');

  for (let day = 1; day <= 28; day++) {
    const d = new Date(baseStart);
    d.setDate(baseStart.getDate() + day - 1);
    const dayOfWeek = d.getDay(); // 0=Sun
    const dStr = Utilities.formatDate(d, 'Asia/Taipei', 'yyyy-MM-dd');

    // 12:30 IG+FB 1x1 主貼文
    const r1x1 = byKey[`${day}_1x1`];
    if (r1x1) rows.push(makeQueueRow_(`AUG_D${pad(day)}_FEED`, dStr, '12:30', 'IG+FB', '1x1', r1x1, ts));

    // 17:00 IG Reels 9x16
    const r9x16 = byKey[`${day}_9x16`];
    if (r9x16) rows.push(makeQueueRow_(`AUG_D${pad(day)}_REELS`, dStr, '17:00', 'IG Reels+Stories', '9x16', r9x16, ts));

    // 週一(1)三(3)五(5) 19:00 FB 16x9
    if ([1, 3, 5].indexOf(dayOfWeek) >= 0) {
      const r16x9 = byKey[`${day}_16x9`];
      if (r16x9) rows.push(makeQueueRow_(`AUG_D${pad(day)}_FBPOST`, dStr, '19:00', 'FB Post', '16x9', r16x9, ts));
    }
  }

  qSh.getRange(2, 1, rows.length, rows[0].length).setValues(rows);
  // 套加篩選器
  qSh.setFrozenColumns(3);
  return rows.length;
}

function makeQueueRow_(queueId, date, time, platform, ratio, assetRow, ts) {
  // assetRow: [asset_id, 建立日期, 類型, 檔名, Drive_URL, 縮圖_URL, 標籤, 適用主題, 拍攝產生日期, 來源, 使用次數, 授權狀態, 備註]
  const assetId = assetRow[0];
  const driveUrl = assetRow[4];
  const thumbUrl = assetRow[5];
  const topic = assetRow[7];
  const headline = topic;
  const body = '今天我們和孩子一起做：' + topic + '。\n\n科學為主，英文為媒。Sarah 老師 1 對 1 精細檢測 50 分鐘，每週只開 6 位。\n秋季班早鳥 85 折，剩 X 位。';
  const hashtags = '#太平新光 #弋果美語 #科學英語 #偵探營 #' + topic.replace(/八月D\d+\s*/, '');
  const cta = 'https://liff.line.me/REPLACE_LIFF_ID';
  return [
    queueId, date, time, platform, ratio, assetId, driveUrl, thumbUrl,
    topic, headline, body, hashtags, cta,
    '待審', '待審', '草稿',  // 圖片審核 / 文案審核 / 排程狀態
    '', '', '', '',          // 發文時間 / post_id / post_url / 錯誤
    ts, ''
  ];
}

function pad(n) { return n < 10 ? '0' + n : '' + n; }

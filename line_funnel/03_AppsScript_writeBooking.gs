/**
 * Apps Script bridge 新增 action：writeBooking
 *
 * 把這段 function 加到現有 v3.2 bridge 的最下方（與 testFullWriteResult 同層）
 * 並在 doPost(e) 的 action router 加一行：
 *   if (action === 'writeBooking') return writeBooking(ss, body);
 *
 * 第一次跑會自動建 Bookings 分頁（含 9 欄表頭）
 *
 * Bookings 分頁欄位（A–I）：
 * A=booking_id (BK_yyyymmdd_HHMMSS)
 * B=submitted_at (ISO)
 * C=child_name
 * D=grade
 * E=school
 * F=phone
 * G=contact_time
 * H=line_user_id
 * I=line_display_name
 * J=status (default: new)
 * K=source
 */

function writeBooking(ss, body) {
  let sheet = ss.getSheetByName('Bookings');
  if (!sheet) {
    sheet = ss.insertSheet('Bookings');
    sheet.appendRow([
      'booking_id', 'submitted_at', 'child_name', 'grade', 'school',
      'phone', 'contact_time', 'line_user_id', 'line_display_name',
      'status', 'source'
    ]);
    sheet.setFrozenRows(1);
    sheet.getRange('A1:K1').setFontWeight('bold').setBackground('#FFEDD5');
  }

  const now = new Date();
  const ts = Utilities.formatDate(now, 'Asia/Taipei', 'yyyyMMdd_HHmmss');
  const bookingId = 'BK_' + ts;

  sheet.appendRow([
    bookingId,
    body.submitted_at || now.toISOString(),
    body.child_name || '',
    body.grade || '',
    body.school || '',
    body.phone || '',
    body.contact_time || '',
    body.line_user_id || '',
    body.line_display_name || '',
    'new',                          // 員工後續手動更新：new → contacted → scheduled → completed
    body.source || 'liff_form'
  ]);

  // 通知員工（可選，要設 LINE Notify token 或推到員工群）
  // notifyStaff(bookingId, body);

  return jsonOut({ ok: true, booking_id: bookingId });
}

/**
 * 推播到員工 LINE 群（可選）
 * 1. 申請 LINE Notify token：https://notify-bot.line.me/my/
 * 2. 把 token 填到 Apps Script Properties Service：
 *    File → Project properties → Script properties → 加 LINE_NOTIFY_TOKEN
 */
function notifyStaff(bookingId, body) {
  const token = PropertiesService.getScriptProperties().getProperty('LINE_NOTIFY_TOKEN');
  if (!token) return;

  const message = [
    '',
    '🔔 新預約檢測',
    'ID: ' + bookingId,
    '孩子: ' + body.child_name + '（' + body.grade + '）',
    '學校: ' + body.school,
    '電話: ' + body.phone,
    '時段: ' + body.contact_time,
    'LINE: ' + (body.line_display_name || '未授權'),
  ].join('\n');

  UrlFetchApp.fetch('https://notify-api.line.me/api/notify', {
    method: 'post',
    headers: { 'Authorization': 'Bearer ' + token },
    payload: { message: message },
    muteHttpExceptions: true
  });
}

/**
 * 測試函式（在 Apps Script 編輯器選此函式 → 執行）
 */
function testWriteBooking() {
  const ss = SpreadsheetApp.openById('12QybsQBVBsDsB5kWPL4-mVJziH9ohm_eVeHh38d7wT8');
  const mockBody = {
    child_name: '王小明（測試）',
    grade: '小四',
    school: '力行國小',
    phone: '0912345678',
    contact_time: '平日晚上',
    line_user_id: 'TEST_LINE_UID',
    line_display_name: '測試家長',
    submitted_at: new Date().toISOString(),
    source: 'manual_test'
  };
  Logger.log(writeBooking(ss, mockBody).getContent());
}

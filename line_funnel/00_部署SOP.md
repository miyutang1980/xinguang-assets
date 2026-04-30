# LINE 引流三件套部署 SOP

> 完成順序：A → B → C → D → E。約 30–45 分鐘。

---

## A. 部署 Apps Script writeBooking 端點

**目的**：讓 LIFF 預約表能把資料寫進 Google Sheet。

1. 開現有 Apps Script project：「太平新光-社群自動化中樞」
   `1zTxl-OPWfdpBwVwfUkJl39rP68xfvYs1XUqzDQJc9uahjjXqNnpQQX_m`

2. 新增檔案 `writeBooking.gs`，貼上 `03_AppsScript_writeBooking.gs` 內容。

3. **修改現有 v3.2 bridge 的 `doPost(e)` action router**，加一行：
   ```js
   if (action === 'writeBooking') return writeBooking(ss, body);
   ```

4. 執行 `testWriteBooking()` 測試 → 確認 Bookings 分頁建立成功 + 寫入測試列。

5. **部署 → 新增部署作業 → 類型：Web App**
   - 執行身分：我（你的帳號）
   - 存取權限：所有人
   - 點「部署」→ 複製出來的 `https://script.google.com/.../exec` URL

6. 把這個 URL 對照 `02_LIFF_預約表.html` 第 143 行的 `SUBMIT_URL`，
   - 如果一樣 → 不用改
   - 如果不同 → 改成新 URL

---

## B. 部署 LIFF 預約表（GitHub Pages 託管）

**目的**：讓家長透過 LINE 內建瀏覽器填表。

1. 在 GitHub 私人 repo `xinguang-assets` 建一個 public 子 repo `xinguang-liff`：
   ```bash
   gh repo create xinguang-liff --public --description "LIFF 預約表"
   ```

2. 把 `02_LIFF_預約表.html` 改名為 `index.html` push 到該 repo。

3. **GitHub Settings → Pages → Source: main / root → Save**
   → 記下 URL：`https://miyutang1980.github.io/xinguang-liff/`

---

## C. 在 LINE Developers Console 建 LIFF App

**目的**：把 GitHub Pages URL 包成 LINE LIFF。

1. 登入 https://developers.line.biz/console/
2. 選你的 LINE 官方帳號 Channel（@143qbory）
3. 左側選 LIFF → Add 新 LIFF App
4. 填寫：
   - LIFF app name: `太平新光預約表`
   - Size: `Tall`
   - Endpoint URL: `https://miyutang1980.github.io/xinguang-liff/`
   - Scope: 勾 `profile`、`openid`
   - Bot link feature: `On (Aggressive)`
5. **儲存後複製 LIFF ID**（格式：`1234567890-AbCdEfGh`）
6. 複製 LIFF URL：`https://liff.line.me/{LIFF_ID}`

---

## D. 把 LIFF ID 填回 HTML + 重推

1. 編輯 `xinguang-liff/index.html` 第 145 行：
   ```js
   const LIFF_ID = '1234567890-AbCdEfGh';  // 替換成 C 步驟拿到的真實 LIFF ID
   ```
2. commit + push → GitHub Pages 自動更新。

---

## E. 設定 LINE 自動回覆（依 `01_LINE_自動回覆腳本.md`）

1. 登入 https://manager.line.biz/ → 選 @143qbory
2. **主頁 → 加入好友的歡迎訊息** → 貼「訊息 1」+ 設三個 Quick Reply
3. **自動回應訊息** → 加三組關鍵字 `KW_預約檢測` / `KW_課程介紹` / `KW_學費時段`
4. **訊息 2 第二則的 LIFF URL** → 換成 C 步驟 LIFF URL（`https://liff.line.me/...`）
5. **群發訊息 → 排程 D+2 / D+4 / D+7**（用標籤分眾）

---

## F. 驗收測試（必做）

1. 用另一支手機加 @143qbory
2. 確認自動跳出歡迎訊息 + 三按鈕
3. 點「預約 50 分鐘檢測」→ 走完三段訊息
4. 點 LIFF 連結 → 表單能在 LINE 內開啟、能授權 LINE 顯示名字
5. 填表送出 → 檢查 Google Sheet `Bookings` 分頁有沒有新列
6. 過 2 天後檢查 D+2 是否有自動推播

---

## G. 文案最後審查

✅ 精細檢測 50 分鐘、Sarah 老師 1 對 1、早鳥 85 折、剩 X 位
❌ 免費試聽 / 免費抵註冊費 / 免費評測 / 省 500 元 / 同校兩人組 / 對手品牌名

---

## 常見問題

**Q：LIFF 表單在 LINE 內打不開？**
A：檢查 GitHub Pages URL 是不是 https，LIFF endpoint 必須 https。

**Q：表單送出失敗？**
A：開 Chrome DevTools → Network → 看 SUBMIT_URL 回應碼。常見：
- 403 → Apps Script 部署沒設「所有人」存取
- CORS → Apps Script 要用 ContentService.createTextOutput().setMimeType(JSON)，不要設 Header

**Q：D+2 要怎麼分眾？**
A：LINE Manager → 受眾 → 建立「加好友 2 天內未回應」標籤，群發訊息選此標籤。

**Q：預算夠不夠？**
A：LINE OA 免費版每月 200 則訊息，超過要升級輕用版（NT$800/月，4000 則）或 Pro（NT$1,800/月，25000 則）。預估每月加 30 個好友 → 約 750 則訊息 → 輕用版即可。

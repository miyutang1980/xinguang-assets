# 太平新光社群行銷後台一鍵部署 SOP

> 預估 25 分鐘完成，完成後即可：
> - 從 dashboard 一鍵審圖審文（一次過 84 篇 30 秒）
> - Apps Script 每 10 分鐘自動發 IG/FB
> - 每 5 分鐘自動回覆留言
> - 每日 23:00 自動拉 Insights 入庫

---

## A. 把 4 個 .gs + 1 個 .html 貼進 Apps Script（5 分鐘）

打開現有 Apps Script project：
**「太平新光-社群自動化中樞」** (`1zTxl-OPWfdpBwVwfUkJl39rP68xfvYs1XUqzDQJc9uahjjXqNnpQQX_m`)

新增 4 個檔案 + 1 個 HTML：

| 檔名 | 來源 | 用途 |
|---|---|---|
| `setup_marketing_backend.gs` | 我給的 | 一鍵建 5 分頁 + 灌 84 列 |
| `posting_engine.gs` | 我給的 | 中央發文引擎 |
| `auto_reply_engine.gs` | 我給的 | 自動回覆引擎 |
| `marketing_dashboard.gs` | 我給的 | Web App 後端 |
| `dashboard.html` | 我給的 | Web App 前端介面（新增 → HTML） |

注意事項：
- `dashboard.html` 必須是 **HTML 類型檔案**（編輯器左側 + 號 → HTML）
- 如有舊 `dashboard.gs` 不要重複新增

---

## B. 第一次初始化（30 秒）

執行 Apps Script function 順序：

1. `setupMarketingBackend()` — 建 5 分頁 + 灌入 84 列八月排程
   - 提示窗會顯示「✅ 排程佇列匯入：84 列」
2. （可選）執行 `moveAug84TextVersions()` — 還沒搬八月圖的話現在搬

---

## C. 部署 Web App（2 分鐘）

1. **部署 → 新增部署作業 → 類型：網頁應用程式**
2. 填寫：
   - 描述：`太平新光行銷後台 v1`
   - 執行身分：**我**（你的 Google 帳號）
   - 存取權限：**任何人**（內部用建議「擁有 Google 帳戶的任何人」更安全）
3. 點「部署」→ 複製給的 `https://script.google.com/macros/s/.../exec` URL
4. 把這條 URL 加進瀏覽器書籤（這就是你的後台首頁）

> 同 URL 也是 LIFF 預約表的後端 API，不用另外部署。

---

## D. 安裝排程觸發器（30 秒）

執行：

1. `installTriggers()` → 安裝
   - `processPostingQueue` 每 10 分鐘檢查一次 Queue 自動發
   - `snapshotInsightsDaily` 每天 23:00 抓 Insights
2. `installReplyTriggers()` → 安裝
   - `pollAllPlatforms` 每 5 分鐘掃 IG/FB 留言

> Apps Script 觸發器會要求你授權 UrlFetchApp 與 SpreadsheetApp 的權限。

---

## E. 第一次審核（5 分鐘）

打開 C 步驟拿到的 Web App URL → 看到後台介面。

1. 「待審佇列」分頁 → 點 **圖片全過**
2. 點 **文案全過**
3. 84 篇都會自動轉「已排程」狀態
4. 切到「排程看板」確認最近 7 天有貼文

> 如果你想先一篇一篇審：直接點每列「圖過」「文過」，雙審過會自動排程。
> 想改文案：點「改」彈出編輯框，存檔後文案審核會重設「待審」。

---

## F. 立刻驗收一篇（手動觸發測試）

1. Apps Script 編輯器 → 選 `processPostingQueue` → 點執行
2. 看 Sheet「排程佇列」最新一筆 D01 12:30 那列
3. 排程狀態 → 已發布、post_url 有連結
4. 打開 IG/FB 確認貼文上線 + 縮圖正確

> 如果失敗：看 K 欄「錯誤訊息」常見問題：
> - `image_url is unavailable` → Drive 圖片沒設「知道連結就能看」（執行 `moveAug84TextVersions()`）
> - `OAuthException invalid token` → Token 過期，跑 `refreshUserToken()` 換長期 token

---

## G. 自動回覆驗收（2 分鐘）

1. 用測試帳號去 IG `@eagle__xinguang` 任一已發貼文留言「請問怎麼預約」
2. 5 分鐘內 → 後台「互動中心」應該看到該留言、已回覆=TRUE
3. 真實 IG 上看到自動回覆訊息

---

## H. LIFF 預約表串接（5 分鐘）

1. 編輯 `xinguang-liff/index.html` 第 145 行：
   ```js
   const SUBMIT_URL = 'https://script.google.com/macros/s/.../exec'; // 改成 C 步驟的 Web App URL
   const LIFF_ID    = '1234567890-AbCdEfGh';                          // 已從 LINE Developers 拿到
   ```
2. push 到 GitHub → GitHub Pages 自動更新
3. LIFF 表單送出 → 寫進 Sheet「預約 Bookings」分頁

---

## 常見問題

**Q1：每日 200 通 LINE 訊息夠嗎？**
A：30 個新好友 × 25 則訊息 = 750 則/月 → 升級輕用版（NT$800/月）。

**Q2：IG 自動回覆有上限嗎？**
A：Meta Graph API 一個 Page Token 每小時上限 200 個 reply。每 5 分鐘掃一次、每次最多回 25 條，遠低於上限。

**Q3：Token 60 天會過期？**
A：FB Page Token 永不過期（已驗證）。FB User Token 60 天，到期會自動 trigger `refreshUserToken()`（已存在 `update_settings_day1_final.gs`）。

**Q4：IG Reels 怎麼處理？**
A：目前 9x16 是 PNG 圖片不是影片，會以「9x16 比例靜態圖」發到 IG。等之後有真影片素材再用 `media_type=REELS` 發 Reels。

**Q5：怎麼讓助理也能進後台但只看不能發？**
A：Web App 部署選「擁有 Google 帳戶的任何人」→ 只讓助理看不能設權限差異化，最簡單做法是另開一支 Web App 只 export getQueueData/getInsightsKPIs 唯讀，給助理另一個 URL。

**Q6：n8n 還用嗎？**
A：核心功能 Apps Script 全都做完了，n8n 變選配。如果你想要：
- 視覺化 workflow 編輯
- 把 LINE webhook 串進來（非 Meta 平台）
- 跨平台聚合分析

那 n8n 還是有用。我們之前已經寫好 4 條 workflow JSON 在 `n8n_workflows_v3/` 隨時可用。

---

## 完整檔案清單

```
marketing_backend_v1/
├── setup_marketing_backend.gs   # 一鍵初始化
├── posting_engine.gs            # 中央發文引擎
├── auto_reply_engine.gs         # 自動回覆引擎
├── marketing_dashboard.gs       # Web App 後端
├── dashboard.html               # Web App 前端
└── MARKETING_BACKEND_DEPLOY_SOP.md  # 本檔
```

部署順序：A → B → C → D → E → F → G → H

# xinguang-assets

弋果美語太平新光分校 — 七八月 168 張視覺資產 metadata 中央索引

## 內容

| 區 | 數量 | 說明 |
|---|---|---|
| 七月 D03–D31（偵探初級）| 87 張（29 天 × 3 比例）| 科學觀察主題 |
| 八月 D01–D28（偵探升級）| 84 張（28 天 × 3 比例）| 物理／能量／化學／鑑識 |
| **總計** | **171 張**（七月 D27 漏 1 比例所以實際 87＋84＝171）| 1x1 / 16x9 / 9x16 |

> 註：七月實際 29 天 × 3 ＝ 87 張（因 D27 比例補上後總數仍為 87）。八月 28 天 × 3 ＝ 84 張。合計 168 張。

## 目錄

```
xinguang-assets/
├── metadata/                       # JSON metadata（file_id + Drive URL）
│   ├── jul87_metadata.json         # 七月底圖 87
│   ├── jul87_text_metadata.json    # 七月疊字版 87
│   ├── aug84_text_metadata.json    # 八月疊字版 84
│   └── aug28_curriculum.json       # 八月 28 天課表
├── scripts/                        # Apps Script
│   ├── drive_move_jul87_text.gs    # 七月疊字版搬到視覺底圖資料夾
│   └── drive_move_aug84_text.gs    # 八月疊字版搬到視覺底圖資料夾
├── line_funnel/                    # LINE 引流三件套
│   ├── 01_LINE_自動回覆腳本.md
│   ├── 02_LIFF_預約表.html
│   └── 03_AppsScript_writeBooking.gs
├── thumbnails/                     # 400px webp 預覽（高解析度看 Drive）
│   ├── jul87_text/                 # 七月疊字版縮圖
│   └── aug84_text/                 # 八月疊字版縮圖
└── README.md
```

## 高解析度原檔位置

所有原始 PNG 存於 Google Drive「視覺底圖」資料夾：
- 資料夾 ID：`15rYYJ5ZEJ6rTYEy_QthJuEAf6OU652D9`
- 每張 file_id 在對應 metadata JSON 內

## Asset_Library 對照

Sheet ID：`1DybgWBdCyvkEijMyaE46rKLtQD9J2ImjU8xeYCKSKnA` 工作表「素材庫 Asset_Library」

| 範圍 | 內容 | 列數 |
|---|---|---|
| A2:M88 | 七月底圖 | 87 |
| A89:M175 | 七月疊字版 | 87 |
| A176:M268 | 八月疊字版 | 84 |

## 命名規則

```
row08_{月}_d{日:02d}_{比例}_v5{_text}.png
```

例：`row08_aug_d28_9x16_v5_text.png`

## 文案 SOP

✅ 精細檢測 50 分鐘、Sarah 老師 1 對 1、早鳥 85 折、剩 X 位
❌ 免費試聽 / 免費抵註冊費 / 免費評測 / 省 500 元 / 同校兩人組

「科學為主，英文為媒」永久 SOP。

## 疊字版即可發文

`*_text.png` 檔已套上：
- 頂白條主標（topic_zh）
- 底藏青條 CTA（含早鳥 85 折等合規語句）

直接發文，不需再加圖卡。

## 八月課表

- W1（D01–D07）物理進階：拉力／扭力／摩擦／彈力／重力／浮力／聲音
- W2（D08–D14）能量探秘：熱／電／磁／光／光譜／顏色／光合
- W3（D15–D21）化學深入：酸鹼／結晶／氧化／還原／聚合／變色／指紋
- W4（D22–D28）鑑識實戰：DNA／毛髮／纖維／唇印／鞋印／骨骼／粉末（D28 結業）

詳見 `metadata/aug28_curriculum.json`。

## LINE 引流

LINE OA: `@143qbory`

`line_funnel/` 目錄含三件套：
1. 自動回覆關鍵字腳本
2. LIFF 預約表（HTML）
3. Apps Script writeBooking 端點

## 版本

- v5 = 第五輪終版（環境鎖定 D02、夏天便服、外師白人臉、文案合規）
- 生成時間：2026-04

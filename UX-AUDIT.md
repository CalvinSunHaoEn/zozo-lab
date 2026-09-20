# ZOZO Lab 電商體驗稽核 — 2026-09-20

目的：Cheese Cutout Case 為第一主打，Fluid Metal 為第二主打。此版為本機預覽，未發布。

## 稽核與處理

| 區域 | 原有問題 | 本次修正 |
|---|---|---|
| Header／手機選單 | 系列與商品關係不明，主打款無直接入口 | Cheese Cutout、Fluid Metal、全部手機殼直接入口；手機選單保留三個系列 |
| Hero | Fluid Metal 排在前面；圖像背景有殘留，兩款視覺尺度不一 | Cheese Cutout 唯一主視覺，明確商品名稱、價格、產品頁按鈕和預覽狀態 |
| 第二區 | Jelly 比主打款更早出現 | 專屬 Fluid Metal 區塊，作為次要選擇 |
| 原 Objects in focus、Campaign、分類圖卡、Crystal Feature | 相同圖片反覆出現，瀏覽成本高且沒有新增決策資訊 | 合併為四款未上市設計區。首頁從 13 個商品展示位置縮減至 6 個，每款只出現一次 |
| 系列 | Accessories／Extended objects 實際也是手機殼；Cheese 被拆散 | Cheese：Cutout、Character；Sculptural：Fluid Metal、Crystal Inlay；Jelly：Cherry、Blue |
| 商品總覽／Collections | 小目錄仍需經中介分類頁；篩選含零商品的 Accessories | 直接列商品並以系列切換；依主打優先排序。篩選改為 Featured／Coming soon，顯示啟用狀態與清除按鈕 |
| 商品圖 | Fluid Metal 底部有背景雜訊，不同圖片留白造成尺度不一 | 清理 Fluid Metal 正面圖；共用標準比例的 SVG 顯示框，保持商品比例，主商品列表等高呈現 |
| 商品卡 | 未上市狀態只藏在模糊圖內 | 卡片文字明示系列、Coming soon；未上市價格改為 Price at launch，兩款主打保留 USD 29.90 |
| 商品詳情 | 不能購買的資訊藏在折疊欄位；相關推薦混入大量未上市款 | 價格旁直接交代 Design preview／不能下單；圖片標籤改成 Front／Side／Inside；相關推薦優先主打款 |
| 購買前資訊 | 使用者需自行尋找是否上市、支援機型等答案 | 首頁增加 FAQ：能否下單、機型、運送與退貨；不虛構未知規格與政策 |
| 搜尋／收藏 | 搜尋商品種類不完整；收藏可能被當成訂閱 | 支援 phone case 關鍵字；說明僅裝置內收藏、不預留商品、不寄送通知 |
| Footer／About | 導覽名稱不一致 | Footer 統一系列入口，About 保留品牌介紹與商品目錄連結 |

## 驗證

- Chromium / Edge 自動化：16 個路由 × 6 種寬度（1440、1021、749、601、390、320px）。
- 251 項檢查：無水平溢出、單一主標、商品主次與系列歸屬、無重複首頁主打圖片、狀態篩選、排序、搜尋、收藏持久化與移除、焦點返回、手機圖片滑動、商品細節、回到頁首保留網址。
- 主頁、目錄與商品頁已檢查桌面、749px 與手機截圖。
- 未觀察到 JavaScript 例外或 404 資源；語法及 Git whitespace 檢查通過。
- 此為介面與功能稽核，並非真實顧客可用性測試或轉換率改善證明；未測真實交易，現有網站沒有結帳流程。

## 開放購買前仍需提供

目前沿用原站的上市前展示狀態。正式販售前需確認：可購買連結或結帳系統、各款支援機型、材質與保護性規格、庫存、運送／退貨政策、客服聯絡方式。不應以未確認內容填補。

## 參考

- [Baymard — DTC UX: Avoid Intermediary Category Pages](https://baymard.com/research-articles/dtc-avoid-intermediary-category-pages)：小型 DTC 目錄宜減少不必要的中介分类流程。
- [Baymard — Homepage & Category Navigation](https://baymard.com/research/homepage-and-category-usability)：以明確分類和導覽協助使用者理解產品範圍。

以上優先順序與具體版面是本次依 ZOZO Lab 業務方向作出的設計判斷。

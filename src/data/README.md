# 資料檔說明

這個資料夾放網站的固定內容。修改後網站會自動更新，不需要改任何網頁程式。

## about.json
成立宗旨、簡介、歷史沿革、組織架構、會長的話等固定內容。`paragraphs` 每一項是一個段落。

## officers.json（幹部名單）
每位幹部一筆，放在中括號 `[ ]` 裡，筆與筆之間用逗號隔開：

```json
{
  "id": "term-1-president",
  "year": 2024,
  "term": 1,
  "name": "王小明",
  "title": "會長",
  "photo": "officers/term-1/wang-xiao-ming.jpg",
  "description": "一句簡短介紹，可留空。",
  "sort_order": 1,
  "status": "current"
}
```

- `id`：不重複的代號，建議「屆次-職稱」。
- `year`：年度（西元）。`term`：第幾屆（數字）。
- `title`：會長、副會長、總幹事、秘書、財務組、活動組、宣傳組，其他職稱會歸在「其他幹部」。
- `photo`：照片放在 `src/assets/images/` 底下，這裡填相對於該資料夾的路徑。沒有照片就留空 `""`，網頁會顯示姓名縮寫。
- `sort_order`：同一屆內的顯示順序，數字小的在前。
- `status`：`current`（現任）或 `past`（歷屆）。

換屆時：把上一屆所有人的 `status` 改成 `past`，再新增新一屆的資料。舊資料不要刪除。

## presidents.json（歷屆會長）
```json
{
  "id": "president-term-1",
  "term": 1,
  "year": 2024,
  "name": "王小明",
  "photo": "",
  "description": ""
}
```

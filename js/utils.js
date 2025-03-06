// DataExtractor: PDFテキストから必要な情報を抽出するユーティリティ
const DataExtractor = {
  // 請求書発行日を抽出（例：2024-12-24）
  extractInvoiceDate: function(text) {
    const match = text.match(/請求書発行日\s*([\d-]{10})/);
    return match ? match[1] : "";
  },
  // 請求書番号を抽出（例：JP4CBM5O9AJGKI）
  extractInvoiceNumber: function(text) {
    const match = text.match(/請求書番号\s*([A-Z0-9]+)/);
    return match ? match[1] : "";
  },
  // 商品名を抽出（例：パナソニック 鼻毛カッター ...）
  extractProductName: function(text) {
    const match = text.match(/【[^】]+】\s*(.+?)\s+[0-9]+/);
    return match ? match[1].trim() : "";
  },
  // 税込金額を抽出（例：2700）
  extractTotalAmount: function(text) {
    const match = text.match(/合計￥\s*([\d,]+)/);
    return match ? match[1].replace(/,/g, "") : "";
  },
  // オブジェクト配列からCSV文字列を生成
  generateCSV: function(dataArray) {
    if (!dataArray.length) return "";
    const headers = Object.keys(dataArray[0]);
    const rows = dataArray.map(row => headers.map(field => row[field]).join(","));
    return headers.join(",") + "\n" + rows.join("\n");
  }
};

// デバッグやモジュールとしての利用を容易にするためのエクスポート設定（ブラウザ環境では不要）
if (typeof module !== "undefined" && module.exports) {
  module.exports = DataExtractor;
}

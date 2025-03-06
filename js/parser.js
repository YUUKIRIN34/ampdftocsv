// PDFProcessor: PDF.jsを用いたPDFファイルのテキスト抽出
class PDFProcessor {
  static async extractTextFromPDF(file) {
    return new Promise((resolve, reject) => {
      const fileReader = new FileReader();
      
      fileReader.onload = function() {
        const typedarray = new Uint8Array(this.result);
        
        // PDF.jsを使用してPDFを読み込み
        pdfjsLib.getDocument(typedarray).promise.then(async (pdf) => {
          let textContent = "";
          
          // 全ページのテキストを抽出
          for (let pageNum = 1; pageNum <= pdf.numPages; pageNum++) {
            const page = await pdf.getPage(pageNum);
            const text = await page.getTextContent();
            const pageText = text.items.map(item => item.str).join(" ");
            textContent += pageText + "\n";
          }
          
          resolve(textContent);
        }).catch((err) => {
          reject(new Error(`PDF解析エラー: ${err.message}`));
        });
      };
      
      fileReader.onerror = function(err) {
        reject(new Error(`ファイル読み込みエラー: ${err.message}`));
      };
      
      fileReader.readAsArrayBuffer(file);
    });
  }
}

// デバッグやモジュールとしての利用を容易にするためのエクスポート設定（ブラウザ環境では不要）
if (typeof module !== "undefined" && module.exports) {
  module.exports = PDFProcessor;
}

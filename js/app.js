// メインアプリケーションロジック
document.addEventListener("DOMContentLoaded", function() {
  // UI要素の取得
  const dropzone = document.getElementById("dropzone");
  const fileInput = document.getElementById("fileInput");
  const progressDiv = document.getElementById("progress");
  const generateBtn = document.getElementById("generateBtn");
  
  // 抽出データを保持する配列
  let extractedData = [];

  // ドラッグ&ドロップ処理の設定
  dropzone.addEventListener("dragover", function(e) {
    e.preventDefault();
    dropzone.classList.add("bg-light");
  });

  dropzone.addEventListener("dragleave", function(e) {
    e.preventDefault();
    dropzone.classList.remove("bg-light");
  });

  dropzone.addEventListener("drop", function(e) {
    e.preventDefault();
    dropzone.classList.remove("bg-light");
    const files = e.dataTransfer.files;
    handleFiles(files);
  });

  // ファイル選択処理
  fileInput.addEventListener("change", function(e) {
    const files = e.target.files;
    handleFiles(files);
  });

  // ファイル処理メイン関数
  async function handleFiles(files) {
    // 初期化
    extractedData = [];
    progressDiv.innerHTML = "";
    generateBtn.disabled = true;

    // PDFファイルのみをフィルタリング
    const filesArray = Array.from(files).filter(f => f.type === "application/pdf");
    if (!filesArray.length) {
      progressDiv.innerHTML = '<div class="alert alert-warning">PDFファイルが選択されていません。</div>';
      return;
    }

    let processedCount = 0;
    for (const file of filesArray) {
      progressDiv.innerHTML += `<p>${file.name} を処理中...</p>`;
      
      try {
        // PDFテキストの抽出
        const text = await PDFProcessor.extractTextFromPDF(file);
        
        // 必要データの抽出
        const invoiceDate = DataExtractor.extractInvoiceDate(text);
        const invoiceNumber = DataExtractor.extractInvoiceNumber(text);
        const productName = DataExtractor.extractProductName(text);
        const totalAmount = DataExtractor.extractTotalAmount(text);

        // データの追加
        extractedData.push({
          "請求書発行日": invoiceDate,
          "請求書番号": invoiceNumber,
          "商品名": productName,
          "税込金額": totalAmount
        });

        processedCount++;
        progressDiv.innerHTML += `<div class="alert alert-success">${file.name} の処理が完了しました。</div>`;
      } catch (error) {
        progressDiv.innerHTML += `<div class="alert alert-danger">${file.name} の処理でエラーが発生しました: ${error.message}</div>`;
      }
    }

    // 処理結果の表示
    progressDiv.innerHTML += `<div class="alert alert-info">${processedCount} / ${filesArray.length} ファイルの処理が完了しました。</div>`;
    
    // データが抽出できた場合のみダウンロードボタンを有効化
    if (extractedData.length > 0) {
      generateBtn.disabled = false;
    }
  }

  // CSV生成・ダウンロード処理
  generateBtn.addEventListener("click", function() {
    const csvContent = DataExtractor.generateCSV(extractedData);
    const blob = new Blob(["\uFEFF" + csvContent], { type: "text/csv;charset=utf-8;" });
    const timestamp = new Date().toISOString().replace(/[:.]/g, "-").slice(0, -5);
    saveAs(blob, `amazon_invoices_${timestamp}.csv`);
  });
});

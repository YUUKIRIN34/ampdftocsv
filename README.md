# Amazon PDF領収書 CSV変換ツール

このツールは、AmazonのPDF形式の領収書から必要な情報を抽出し、CSV形式に変換するWebアプリケーションです。

## 特徴

- ブラウザで動作する軽量なWebアプリケーション
- インストール不要で即座に利用可能
- ドラッグ&ドロップでの複数ファイル処理
- すべての処理はクライアントサイドで完結（PDFはサーバーに送信されません）
- レスポンシブデザインで様々なデバイスに対応

## 使用方法

1. [アプリケーションページ](https://yourusername.github.io/amazonpdftocsv/)にアクセス
2. PDFファイルをドラッグ&ドロップ、または選択ボタンでファイルを選択
3. 処理が完了したら「CSVダウンロード」ボタンをクリック

## 抽出される情報

- 請求書発行日
- 請求書番号
- 商品名
- 税込金額

## プライバシーとセキュリティ

- すべての処理はブラウザ内で実行され、PDFファイルがサーバーにアップロードされることはありません
- HTTPSによる安全な通信
- 外部ライブラリはSRI（Subresource Integrity）ハッシュで検証

## 開発者向け情報

### 必要なツール
- Webブラウザ（Chrome, Firefox, Safari, Edge等の最新版）

### ローカルでの実行
1. このリポジトリをクローン：
```bash
git clone https://github.com/yourusername/amazonpdftocsv.git
```
2. Webサーバーを起動（例：VS CodeのLive Server等）
3. ブラウザでindex.htmlにアクセス

## 貢献

1. Forkする
2. 機能ブランチを作成 (`git checkout -b feature/amazing-feature`)
3. 変更をコミット (`git commit -m 'Add some amazing feature'`)
4. ブランチにプッシュ (`git push origin feature/amazing-feature`)
5. Pull Requestを作成

## 注意事項

- このツールはAmazonの領収書PDF形式に特化して設計されています
- レイアウトが大きく異なる場合、正しく情報を抽出できない可能性があります

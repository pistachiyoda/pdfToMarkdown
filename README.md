# pdfToMarkdown

## 使い方

実行ファイルの引数にmarkdown化したいPDFを渡します。
以下コマンドラインのようにchildmoney.pdfを渡すと、childmoney.mdが生成されます。

```bash
 bun run main.ts childmoney.pdf
```
## 必要設定

### chatgptのAPI設定が必要です。.envに以下２つを設定してください。

```txt
OPENAI_API_KEY=Your Key
MODEL=gpt-4-1106-preview
```

### パッケージのインストール

```bash
bun install
```

## 軌跡

[PDFファイルを渡したらmarkdown化したものをアウトプットしてくれるプログラムを作りたい！](https://zenn.dev/pistachiyoda/scraps/658a3844b4492b)

## コメント

正直精度はイマイチ。
いい感じにできたりできなかったり...プロンプトをもうちょっと工夫すればいい感じになるかも...。

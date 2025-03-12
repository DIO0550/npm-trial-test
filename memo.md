# ES モジュールと CommonJS の互換性について

解決策が機能して良かったです！ご質問の「ES モジュールが CommonJS のライブラリを使えないのか」という点について説明します。

## ES モジュールと CommonJS の相互運用性

1. **ES モジュールから CommonJS モジュールを使用する**:

   - ES モジュール環境（Vite など）は基本的に CommonJS モジュールをインポートできます
   - ただし、一部の制限があります（例：`require()`の動的 import ができない）
   - Node.js では、ESM から CJS モジュールをインポートする際、デフォルトエクスポートの扱いに注意が必要です

2. **CommonJS モジュールから ES モジュールを使用する**:
   - CommonJS 環境からネイティブ ES モジュールを直接 import することは難しいです
   - 通常、バンドラーやトランスパイラー（webpack, Babel など）を通す必要があります

## Vite の特殊性

Vite はデフォルトで**ES モジュール**形式を使用しますが、依存関係の**CommonJS モジュール**も処理できます:

- Vite は内部で**esbuild**を使用して依存関係を事前バンドルします
- CommonJS モジュールを ESM に変換する処理を自動的に行います
- ただし、すべてのケースで完璧に変換できるわけではありません

## なぜ問題が発生したのか

今回のケースでエラーが発生した理由:

1. TypeScript の`compilerOptions.module`が`commonjs`だったため、ESM を使う Vite と形式が合わなかった
2. Vite はモジュール形式を自動検出するため、明示的に ESM 形式を指示する必要がありました

## デュアルパッケージの作成（両方に対応）

ライブラリを**CommonJS と ESM 両方**に対応させるベストプラクティス:

```json
{
  "name": "my-library",
  "main": "./dist/cjs/index.js", // CommonJS用
  "module": "./dist/esm/index.js", // ESM用
  "exports": {
    ".": {
      "import": "./dist/esm/index.js",
      "require": "./dist/cjs/index.js"
    }
  },
  "scripts": {
    "build": "npm run build:cjs && npm run build:esm",
    "build:cjs": "tsc --module commonjs --outDir dist/cjs",
    "build:esm": "tsc --module es2015 --outDir dist/esm"
  }
}
```

## 実用的なアドバイス

1. **新しいライブラリを作る場合**:

   - ESM をベースに設計し、必要に応じて CommonJS をサポート

2. **既存の CommonJS ライブラリを使う場合**:

   - Vite は多くの場合、自動的に変換してくれますが、問題が発生した場合は以下の方法があります:
     - `vite-plugin-commonjs`などのプラグインを使用
     - `rollup-plugin-commonjs`を設定

3. **Vite や Webpack のようなバンドラーを使用する場合**:
   - バンドラー自体がモジュール変換を処理してくれるため、多くの場合は特別な対応不要

前回のアドバイスでモジュール形式を ESM に統一したことで問題が解決したのは、Vite の期待する形式とライブラリの出力形式が一致したからです。実際の開発では、ユーザーの環境に合わせて両方の形式をサポートするデュアルパッケージ戦略が最も柔軟な選択肢となります。

何か他にご質問があればお気軽にどうぞ！

## 参考

- https://zenn.dev/kagunyan25/scraps/f0ed3f1a40e045

# 技術設計メモ

`requirements.md` を実装に落とし込むための設計方針。実装時の判断のブレを減らすためのメモであり、詳細なAPI仕様はコーディング時に `node_modules/next/dist/docs/` で都度確認する(`AGENTS.md` 参照)。

## 1. 技術スタック(確定済み)

- Next.js 16 (App Router) / React 19 / TypeScript
- Tailwind CSS v4(`@theme inline` で `--font-geist-sans` などを定義済み)
- `@/*` パスエイリアスがプロジェクトルートを指す(`src` フォルダなし)
- 状態管理ライブラリは使わない(React標準のuseStateで完結する規模)
- サーバーAPI・DBなし。全処理はクライアントサイド

## 2. ディレクトリ構成(実装後の実態。多言語対応込み)

日本語(`/`)と英語(`/en`)を[複数root layout](https://nextjs.org/docs/app/api-reference/file-conventions/layout#root-layout)で実装している。共有の `app/layout.tsx` は置かず、`app/(ja)/layout.tsx` と `app/en/layout.tsx` がそれぞれ独立したroot layout(`<html>`/`<body>` を持つ)。詳細な罠は `nextjs-best-practices.md` 8章を参照。

```
app/
  (ja)/
    layout.tsx           # 日本語root layout(lang="ja")
    page.tsx              # searchParamsのseqを読み取りHomePageへ渡す
    opengraph-image.tsx    # OGP画像(lib/og-image.tsxを呼ぶだけ)
  en/
    layout.tsx            # 英語root layout(lang="en")
    page.tsx               # 同上
    opengraph-image.tsx     # 同上
  sitemap.ts               # 両ロケールのURL+hreflang alternatesを出力
  robots.ts
  globals.css

components/
  home-page.tsx            # ページ本体(Server Component)。JSON-LD+DnaTool+AboutSection+SiteFooterを組み立てる
  dna-tool.tsx              # "use client" 本体。状態管理のハブ。localeを受け取りgetDictionary()で辞書解決
  hero.tsx                   # ヘッダー帯(アイコン+タイトル+言語切替リンク)
  options-panel.tsx          # mRNAトグル・制限酵素トグル+酵素選択(サイドバー上部)
  history-panel.tsx          # 入力履歴リスト(サイドバー下部)
  result-card.tsx            # 配列1件分の結果カード(出力・制限酵素・補助情報)
  about-section.tsx           # 使い方・逆相補鎖とは・主な機能(SEO用コンテンツ)
  site-footer.tsx              # フッター
  base-pill.tsx                 # 塩基1文字を色付き表示する小コンポーネント

lib/
  dna.ts                    # complement, reverseComplement, gcContent, baseComposition
  fasta.ts                  # parseFasta(text) -> {label, raw}[]
  enzymes.ts                 # 制限酵素プリセット定義 + findSites()
  history.ts                  # useSyncExternalStoreベースのuseHistory()フック
  validate.ts                  # ATGC以外の文字検出
  site.ts                       # SITE_URL, ADSENSE_CLIENT_ID, buildMetadata(), buildJsonLd()
  fonts.ts                       # 両root layoutで共有するnext/fontインスタンス
  og-image.tsx                    # OGP画像生成の共通実装
  i18n/
    types.ts                       # Dictionary型定義
    ja.ts / en.ts                   # 翻訳データ(関数値を含む — 8.1の理由でServer→Clientへ直接渡さないこと)
    index.ts                        # getDictionary(locale)
```

Next.jsのファイル規約(`page`/`layout`/metadata系ファイル)は `app/` 直下に置き、UIロジックは `components/`、純粋関数は `lib/` に分離する。`app/page.tsx` はサーバーコンポーネントのまま保ち、インタラクティブな部分は `components/dna-tool.tsx` に `"use client"` を付けて切り出す。

## 3. 状態管理・データフロー

`dna-tool.tsx` が単一の状態源になる。

- `inputText: string` — 初期値は空文字(要件5.1)。ただし `?seq=` クエリパラメータがあれば `page.tsx` から渡された初期値を使う
- `records: ParsedRecord[]` — 「相補鎖に変換する」ボタン押下時のみ `parseFasta` + バリデーションを実行して更新する(要件5.2: 自動変換しない)
- `mrnaMode: boolean` / `enzymeMode: boolean` / `selectedEnzymes: string[]`
- `history: HistoryItem[]` — `lib/history.ts` 経由でlocalStorageと同期

変換ボタン押下時のみ `records` を再計算する。トグル類(`mrnaMode` など)の変更は既存の `records`(=直近で変換確定した入力)に対して再描画するだけで、再変換ボタンを要求しない。

## 4. コアロジック(`lib/`)の関数シグネチャ

```ts
// lib/fasta.ts
type ParsedRecord = { label: string; raw: string };
function parseFasta(text: string): ParsedRecord[];

// lib/validate.ts
function findInvalidChars(seq: string): string[]; // ATGC以外(大文字化後)

// lib/dna.ts
function complement(base: "A" | "T" | "G" | "C"): string;
function reverseComplement(seq: string): string;
function gcContent(seq: string): number; // 0-100, 小数1桁
function toMrna(reverseComplementSeq: string): string; // T -> U
function baseComposition(seq: string): Record<string, number>;

// lib/enzymes.ts
type Enzyme = { name: string; site: string };
const ENZYME_PRESETS: Enzyme[]; // EcoRI, BamHI, HindIII, XhoI, NotI
function findSites(seq: string, enzymes: Enzyme[]): Map<string, number[]>; // 名前 -> 出現位置一覧
```

mRNA変換は「入力=鋳型鎖、逆相補鎖のT→UがmRNA」という要件定義書5.3の定義に従い、`reverseComplement()` の結果に対してのみ適用する(入力配列そのものには適用しない)。

## 5. 制限酵素プリセット

| 酵素 | 認識配列 |
| --- | --- |
| EcoRI | GAATTC |
| BamHI | GGATCC |
| HindIII | AAGCTT |
| XhoI | CTCGAG |
| NotI | GCGGCCGC |

デフォルトでチェックされているのは先頭3種(EcoRI/BamHI/HindIII)。モックアップと同じ挙動。

## 6. 入力履歴(localStorage)

- キー: `dna-tool:history`
- 値: `{ text: string; date: string(ISO) }[]`、先頭が最新、最大30件
- 保存タイミング: 「相補鎖に変換する」ボタン押下時、直前の履歴と同一テキストでなければ先頭に追加
- SSR時は `localStorage` が存在しないため、`lib/history.ts` の `useHistory()`(`useSyncExternalStore` ベース)経由で読み書きする。lazy initializerはハイドレーション不一致、`useEffect`+setStateはESLintの `react-hooks/set-state-in-effect` に抵触するため不採用(理由は `nextjs-best-practices.md` 3章)

## 7. URL共有(`?seq=`)

- `app/page.tsx`(Server Component)で `searchParams.seq` を読み取り、初期入力値として `DnaTool` に渡す
- クライアント側で「相補鎖に変換する」を押した際、`window.history.replaceState(null, "", ...)` を直接呼んでURLに現在の入力を反映する(イベントハンドラ内でのみ `window.location.search` を読むので `useSearchParams` は使わない。詳細は `nextjs-best-practices.md` 4章)
- 配列が長大な場合のURL長超過は既知の制約として許容する(スコープ外)

## 8. SEO / メタデータ

Next.jsのファイル規約(`node_modules/next/dist/docs/01-app/01-getting-started/02-project-structure.md` で確認済み)に従い、以下を `app/` 直下に追加する。

- `app/layout.tsx` の `metadata` — title/description/OGPをこのプロジェクト用に差し替え(現状 `create-next-app` のデフォルトのまま)
- `app/opengraph-image.tsx` — 動的OGP画像
- `app/sitemap.ts`
- `app/robots.ts`

## 9. スタイリング方針

- 既存のTailwind v4 + `@theme inline` トークン(`--color-background` 等)をベースに、モックアップで使用したアクセントカラー・カード・トグルスイッチの見た目をTailwindユーティリティ、または `globals.css` のCSS変数追加で再現する
- ダークモード: 現状 `globals.css` に `prefers-color-scheme: dark` の分岐が既にあるため、それを踏襲する

## 10. Next.jsのバージョン固有の注意点

このプロジェクトのNext.js(16.3.1)は `AGENTS.md` が警告するとおり学習データと差異がある。実装前に必ず `docs/nextjs-best-practices.md` を確認すること(Server/Client Components分割、`use cache`を使わない理由、localStorage読み込みパターン、URL同期API、`error.tsx` のprops名など)。

## 11. 未決定・実装時に要確認

- 長大配列(数万塩基)でのパフォーマンス方針は要件定義書8章のとおりスコープ外

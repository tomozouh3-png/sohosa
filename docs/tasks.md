# 実装タスク進捗

`requirements.md`(要件)と `architecture.md`(設計)に基づく実装タスク一覧。作業を進めるたびにチェックを更新する。

凡例: `[ ]` 未着手 / `[~]` 着手中 / `[x]` 完了

## フェーズ0: セットアップ

- [x] Next.jsプロジェクト作成(create-next-app, App Router / TypeScript / Tailwind v4)
- [x] 要件定義書(`docs/requirements.md`)作成
- [x] 技術設計メモ(`docs/architecture.md`)作成
- [x] コーディング開始前に `node_modules/next/dist/docs/` で該当APIの差分を確認(`AGENTS.md` 指定の手順。結果は `docs/nextjs-best-practices.md` にまとめ済み)

## フェーズ1: コアロジック(`lib/`)

- [x] `lib/fasta.ts`: `parseFasta()` — FASTA形式検出・複数配列分割・素のDNA配列(単一)の両対応
- [x] `lib/validate.ts`: `findInvalidChars()` — ATGC以外の文字検出(大文字小文字許容)
- [x] `lib/dna.ts`: `complement()` / `reverseComplement()`
- [x] `lib/dna.ts`: `gcContent()`
- [x] `lib/dna.ts`: `baseComposition()`
- [x] `lib/dna.ts`: `toMrna()`(逆相補鎖のT→U)
- [x] `lib/enzymes.ts`: 制限酵素プリセット定義(EcoRI/BamHI/HindIII/XhoI/NotI)
- [x] `lib/enzymes.ts`: `findSites()` — 認識部位の位置検索
- [x] `lib/history.ts`: localStorage読み書き(キー・最大30件・重複排除)。`useSyncExternalStore` ベースの `useHistory()` フックとして実装(理由は`nextjs-best-practices.md`3章)
- [x] 上記関数の簡易動作確認(ブラウザでの手動確認。専用のユニットテストは未整備)

## フェーズ2: UIコンポーネント

- [x] `components/hero.tsx` — ヘッダー帯(アイコン・タイトル・二重らせん装飾)
- [x] 入力欄・フォーマット検出バッジ・エラー表示 — 当初 `sequence-input.tsx` に分離する想定だったが、状態と密結合なため `components/dna-tool.tsx` に統合
- [x] 操作ボタン群 — 「相補鎖に変換する」「サンプル配列を入力」「クリア」
- [x] `components/options-panel.tsx` — mRNA表示トグル、制限酵素ハイライトトグル+酵素チェックボックス
- [x] `components/history-panel.tsx` — 履歴リスト表示、クリックで再利用、履歴クリア
- [x] `components/result-card.tsx` — 配列ラベル・配列長/GC簡易表示
- [x] `result-card.tsx` — 逆相補鎖/mRNA結果を強調表示(入力欄より目立つスタイル)
- [x] `result-card.tsx` — コピー機能ボタン
- [x] `result-card.tsx` — 制限酵素認識部位セクション(結果直下・色分けセクションより上)
- [x] `result-card.tsx` — 塩基の色分け・構成比・塩基対ペアリング(常時表示、補助情報として結果の下)
- [x] `result-card.tsx` — 配列長・GC含量の詳細カード(ペアリングの下、ゲージ付き)
- [x] `components/dna-tool.tsx` — 全体の状態管理・上記コンポーネントの統合
- [x] 複数配列(FASTA)時に配列ごとにエラー/結果カードを独立して出し分け
- [x] 初回アクセス時に入力欄が空であることを確認(`?seq=`付きURLの場合のみ初期値+自動変換)

## フェーズ3: 非機能要件

- [x] `app/layout.tsx` の `metadata`(title/description/OGP/Twitterカード/metadataBase)をプロダクト用に差し替え
- [x] `app/opengraph-image.tsx` 追加(日本語グリフ非対応のため英語表記。詳細はファイル内コメント参照)
- [x] `app/sitemap.ts` 追加
- [x] `app/robots.ts` 追加
- [x] `?seq=` クエリパラメータでの初期値読み込み(`app/page.tsx`)+ ブラウザでの動作確認
- [x] 変換実行時にURLへ現在の配列を反映する共有用URL更新(`window.history.replaceState`)
- [x] 配列をサーバーに送信していないことの確認(Network タブで確認。初回ページロード以外のリクエストが発生しないことを確認済み)

## フェーズ4: 品質・デプロイ

- [x] `npm run lint` 通過
- [x] `npx tsc --noEmit` などで型エラーなし
- [x] `npm run build` 通過(本番ビルドでのエラー・警告なし)
- [x] ブラウザでの手動確認(サンプル配列/複数FASTA/履歴/mRNA/制限酵素ハイライト/`?seq=`共有リンクを確認。エラー入力の再現は未確認)
- [x] OGPプレビュー確認(og:image/twitter:imageの実画像を取得し表示崩れがないことを確認)
- [x] Vercelへのデプロイ設定・初回デプロイ(GitHub連携、本番URL: https://sohosa.vercel.app)
- [x] `NEXT_PUBLIC_SITE_URL` を本番ドメインに設定(`lib/site.ts` 参照。Vercel Production環境変数に設定済み)
- [x] エラー入力(ATGC以外の文字)の本番環境での実機確認

## フェーズ5: 集客・収益化(要件定義書スコープ外の追加要望)

- [x] SEO/AdSense審査/知名度向上を兼ねた説明コンテンツ追加(`components/about-section.tsx`: 使い方・逆相補鎖とは・主な機能)
- [x] フッター追加(`components/site-footer.tsx`: GitHubへのクレジットリンク)
- [x] JSON-LD構造化データ追加(`app/page.tsx`: schema.org WebApplication)
- [ ] SNS(X、Zenn/Qiita等)での発信
- [ ] GitHub Sponsors有効化(`tomozouh3-png`。銀行口座登録等が必要なため本人対応。有効化後、寄付リンクをフッターに追加する)
- [x] Google AdSense申し込み・審査対応。スクリプト方式で検証失敗 → メタタグ方式(`other["google-adsense-account"]`)に切り替えて対応

## フェーズ6: 多言語対応(日本語 / 英語)

- [x] `lib/i18n/`: Dictionary型・ja/en翻訳データ・`getDictionary()`
- [x] 全コンポーネントを`dict`(または`locale`)駆動に変更
- [x] `app/(ja)/` と `app/en/` に分割(複数root layout)、`app/layout.tsx`は廃止
- [x] ヒーローに言語切替リンクを追加
- [x] `sitemap.ts`に両ロケール+hreflang alternatesを追加
- [x] `lib/og-image.tsx`共通化 + 各ロケールディレクトリに`opengraph-image.tsx`を配置(共有root layoutが無いと親ディレクトリのファイル規約が拾われない罠を回避)
- [x] ブラウザ実機で発覚した2件の実行時エラーを修正(辞書の関数をClient Componentへpropsで渡さない/`beforeInteractive`スクリプトは`<body>`内に置く)。詳細は`nextjs-best-practices.md`8章

## フェーズ7: アクセス解析

- [x] Vercel Web Analytics導入(`@vercel/analytics/next`、両ロケールlayoutに追加。Cookie不要、配列データは収集しない)
- [x] Google Search Console登録用のverificationメタタグ追加(`verification.google`)。sitemap submitはユーザー側の作業として依頼済み

## フェーズ8: プライマー特性(Tm・GCクランプ・ヘアピン)

- [x] `lib/tm.ts`: SantaLucia (1998) nearest-neighbor法によるTm計算、GCクランプ判定、ヘアピン検出(自己相補領域スキャン)
- [x] サイドバーに3つ目のトグル追加(Na+濃度・プライマー濃度の入力欄つき)
- [x] 各結果カードに「プライマー特性」セクションを追加(入力配列に対して計算。出力の逆相補鎖ではない)
- [x] ヘアピン検出時は自己相補領域を配列上で赤くハイライト
- [x] ja/en両方の翻訳・about欄の機能一覧を更新
- [x] ブラウザ実機で3配列(通常/制限酵素確認用/意図的ヘアピン配列)を使い、Tm値・GCクランプ・ヘアピン判定が日英で一致することを確認

## デプロイ情報

- 本番URL: https://sohosa.vercel.app
- GitHubリポジトリ: https://github.com/tomozouh3-png/sohosa(public)
- Vercelプロジェクト: `tomozouh/sohosa`、GitHub連携済み。`main`へのpushで自動デプロイされる

## スコープ外(要件定義書8章と同期)

- 英語UI対応
- 制限酵素リストの拡充
- IUPAC縮重塩基コード対応
- 大規模配列向けパフォーマンス最適化(Web Worker化等)
- OGP画像への日本語グリフ埋め込み(CJKフォントサブセット化が必要、費用対効果を見て将来検討)

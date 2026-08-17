# 実装タスク進捗

`requirements.md`(要件)と `architecture.md`(設計)に基づく実装タスク一覧。作業を進めるたびにチェックを更新する。

凡例: `[ ]` 未着手 / `[~]` 着手中 / `[x]` 完了

## フェーズ0: セットアップ

- [x] Next.jsプロジェクト作成(create-next-app, App Router / TypeScript / Tailwind v4)
- [x] 要件定義書(`docs/requirements.md`)作成
- [x] 技術設計メモ(`docs/architecture.md`)作成
- [ ] コーディング開始前に `node_modules/next/dist/docs/` で該当APIの差分を確認(`AGENTS.md` 指定の手順)

## フェーズ1: コアロジック(`lib/`)

- [ ] `lib/fasta.ts`: `parseFasta()` — FASTA形式検出・複数配列分割・素のDNA配列(単一)の両対応
- [ ] `lib/validate.ts`: `findInvalidChars()` — ATGC以外の文字検出(大文字小文字許容)
- [ ] `lib/dna.ts`: `complement()` / `reverseComplement()`
- [ ] `lib/dna.ts`: `gcContent()`
- [ ] `lib/dna.ts`: `baseComposition()`
- [ ] `lib/dna.ts`: `toMrna()`(逆相補鎖のT→U)
- [ ] `lib/enzymes.ts`: 制限酵素プリセット定義(EcoRI/BamHI/HindIII/XhoI/NotI)
- [ ] `lib/enzymes.ts`: `findSites()` — 認識部位の位置検索
- [ ] `lib/history.ts`: localStorage読み書き(キー・最大30件・重複排除)
- [ ] 上記関数の簡易動作確認(手動 or テスト)

## フェーズ2: UIコンポーネント

- [ ] `components/hero.tsx` — ヘッダー帯(アイコン・タイトル・二重らせん装飾)
- [ ] `components/sequence-input.tsx` — 入力欄、フォーマット検出バッジ、エラー表示
- [ ] 操作ボタン群 — 「相補鎖に変換する」「サンプル配列を入力」「クリア」
- [ ] `components/options-panel.tsx` — mRNA表示トグル、制限酵素ハイライトトグル+酵素チェックボックス
- [ ] `components/history-panel.tsx` — 履歴リスト表示、クリックで再利用、履歴クリア
- [ ] `components/result-card.tsx` — 配列ラベル・配列長/GC簡易表示
- [ ] `result-card.tsx` — 逆相補鎖/mRNA結果を強調表示(入力欄より目立つスタイル)
- [ ] `result-card.tsx` — コピー機能ボタン
- [ ] `result-card.tsx` — 制限酵素認識部位セクション(結果直下・色分けセクションより上)
- [ ] `result-card.tsx` — 塩基の色分け・構成比・塩基対ペアリング(常時表示、補助情報として結果の下)
- [ ] `result-card.tsx` — 配列長・GC含量の詳細カード(ペアリングの下、ゲージ付き)
- [ ] `components/dna-tool.tsx` — 全体の状態管理・上記コンポーネントの統合
- [ ] 複数配列(FASTA)時に配列ごとにエラー/結果カードを独立して出し分け
- [ ] 初回アクセス時に入力欄が空であることを確認

## フェーズ3: 非機能要件

- [ ] `app/layout.tsx` の `metadata`(title/description)をプロダクト用に差し替え
- [ ] `app/opengraph-image.tsx` 追加
- [ ] `app/sitemap.ts` 追加
- [ ] `app/robots.ts` 追加
- [ ] `?seq=` クエリパラメータでの初期値読み込み(`app/page.tsx`)
- [ ] 変換実行時にURLへ現在の配列を反映する共有用URL更新
- [ ] 配列をサーバーに送信していないことの確認(Network タブ目視確認)

## フェーズ4: 品質・デプロイ

- [ ] `npm run lint` 通過
- [ ] `npx tsc --noEmit` などで型エラーなし
- [ ] ブラウザでの手動確認(サンプル配列/複数FASTA/エラー入力/履歴/mRNA/制限酵素ハイライトの一通り)
- [ ] OGPプレビュー確認(SNSシェアデバッガ等)
- [ ] Vercelへのデプロイ設定・初回デプロイ

## スコープ外(要件定義書8章と同期)

- 英語UI対応
- 制限酵素リストの拡充
- IUPAC縮重塩基コード対応
- 大規模配列向けパフォーマンス最適化(Web Worker化等)

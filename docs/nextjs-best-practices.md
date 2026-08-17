# Next.js ベストプラクティス(このプロジェクト向け)

`AGENTS.md` の指示に従い、実装を始める前に `node_modules/next/dist/docs/`(Next.js 16.3.1 同梱ドキュメント)を実際に読んで確認した内容をまとめる。学習データの知識と異なる可能性がある箇所は明示する。

参照した主なドキュメント:

- `01-app/01-getting-started/02-project-structure.md`
- `01-app/01-getting-started/05-server-and-client-components.md`
- `01-app/01-getting-started/08-caching.md`
- `01-app/01-getting-started/04-linking-and-navigating.md`
- `01-app/01-getting-started/10-error-handling.md`
- `01-app/01-getting-started/14-metadata-and-og-images.md`
- `01-app/02-guides/preventing-flash-before-hydration.md`
- `03-architecture/accessibility.md`

## 1. Server Componentsをデフォルトにし、Client Componentsは最小限に

`app/` 配下のファイルはデフォルトでServer Component。`"use client"` を付けたファイルは、そのモジュールグラフ全体(直接importするもの・直接renderするもの)がクライアントバンドルに含まれる。

このプロジェクトへの適用:

- `app/page.tsx` はServer Componentのまま(`searchParams` を読むだけ)にし、インタラクティブなロジックは `components/dna-tool.tsx` に `"use client"` を付けて切り出す(architecture.md 2章のとおり)
- ヘッダー帯(`Hero`)など状態を持たない見た目だけの部分は、`dna-tool.tsx` の外に出せるならServer Componentのままにしてバンドルサイズを抑える。ただし今回はヘッダーも常時表示の単一ページなので、無理に分割しなくてもよい

## 2. データフェッチ・キャッシュ機構(`use cache` / Cache Components)は使わない

Next.js 16では `next.config.ts` で `cacheComponents: true` を有効にすると、`"use cache"` ディレクティブや `<Suspense>` を使った新しいキャッシュ/プリレンダリングモデル(Partial Prerendering)が使えるようになる。これは学習データにない機能。

**このプロジェクトでは有効化しない。** 外部API・DBを一切呼ばずクライアント側で完結する要件(`requirements.md` 6.3)のため、キャッシュ対象のデータ取得自体が存在しない。`next.config.ts` はデフォルトのまま(`cacheComponents` を設定しない)でよい。

## 3. localStorageを読む処理: `useSyncExternalStore` を使う(2回目の訂正)

公式ガイド(`preventing-flash-before-hydration.md`)の「Syncing with React state」は `useState` のlazy initializerを紹介しているが、これはサーバーの既定値とクライアントのハイドレーション時レンダーの値が食い違いハイドレーションエラーになる(lazy initializerはハイドレーション時、`window` が存在するブラウザ上で実行されるため)。ガイドの例が成立するのは、ハイドレーション前にインラインスクリプトがDOMを実際の値へ書き換えているから。入力履歴のような動的リストではその仕組みを再現するコストが見合わない。

そこで一旦 `useEffect` + `setState` に切り替えたが、これは `eslint-plugin-react-hooks` の `react-hooks/set-state-in-effect` ルールに引っかかる(`npm run lint` で実際に検出された)。このルールは「外部システム(localStorageなど)と同期する状態は `useSyncExternalStore` を使うべき」という考え方に基づく。最終的に採用したのは `useSyncExternalStore`:

```ts
// lib/history.ts
function subscribe(onStoreChange: () => void) { /* ... */ }
function getSnapshot(): HistoryItem[] { /* localStorageから読む(クライアントのみ) */ }
function getServerSnapshot(): HistoryItem[] { return []; } // SSRは常に空配列

export function useHistory() {
  const history = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
  // ...
}
```

- `getServerSnapshot` はサーバーで常に空配列を返すため、ハイドレーション時の不一致は起きない
- `getSnapshot` はクライアントでのみ実際の値を返す。Reactは「サーバー値→クライアント値」の切り替えを正しいタイミングで扱ってくれる(lazy initializerと違い、Reactの管轄下にあるAPIのため)
- `addItem`/`clear` などの更新関数もこのモジュール内に閉じ込め、リスナーに通知することで再レンダーをトリガーする。これによりESLintの `set-state-in-effect` にも引っかからない
- 副次的な利点として、複数タブを開いていても `storage` イベントで同期させやすい構造になっている(現時点では未実装、将来追加しやすい設計)

## 4. URLクエリパラメータ(`?seq=`)の同期は `window.history.replaceState`

`linking-and-navigating.md` に載っている公式パターン(`router.replace()` ではなくネイティブHistory APIを直接呼ぶ)をベースに採用。`router.replace()`(next/navigationのuseRouter)はNext.jsのルーター/RSCフェッチを経由し今回の用途にはオーバースペックなため使わない。

ドキュメントの例は現在のクエリを `useSearchParams()` フックで購読しているが、このプロジェクトでは実装をさらに単純化し、URL更新はボタンのクリックハンドラ内でのみ行う(レンダー中は参照しない)ため、フックで購読する必要がない。イベントハンドラ内は常にブラウザ上で実行されるので `window.location.search` を直接読めばよく、`useSearchParams()` 特有の[Suspense境界の要件](https://nextjs.org/docs/messages/missing-suspense-with-csr-bailout)(静的prerender時にラップが必須になる制約)も回避できる:

```tsx
"use client";

function updateShareUrl(seq: string) {
  const params = new URLSearchParams(window.location.search);
  if (seq.trim()) params.set("seq", seq);
  else params.delete("seq");
  const query = params.toString();
  window.history.replaceState(null, "", query ? `?${query}` : window.location.pathname);
}
```

- `pushState` ではなく `replaceState` を使う(変換のたびに履歴エントリが増えるのは望ましくないため、ブラウザの「戻る」で配列がコロコロ変わらないようにする)
- `window.history.pushState`/`replaceState` の呼び出しは `usePathname`/`useSearchParams` と自動的に同期される(Next.jsのルーターに組み込み済み)

> **architecture.mdの訂正**: 「7. URL共有」の「未決定・実装時に要確認」に書いていたAPI選定はこれで確定。

## 5. Metadata・OGP・sitemap・robotsはファイル規約に従う

`app/` 直下に以下を追加する(`metadata-and-og-images.md` で確認済み、学習データとほぼ一致):

- `app/layout.tsx` の `export const metadata: Metadata = {...}` — title/description(現状`create-next-app`デフォルトのままなので差し替えが必要)
- `app/opengraph-image.tsx` — 動的生成する場合は `next/og` から `ImageResponse` をimportする(`next/server` ではない点に注意)
- `app/sitemap.ts` / `app/robots.ts`

## 6. エラーハンドリング: `error.tsx` のprops名は `retry`(旧`reset`ではない)

`error-handling.md` で確認したこのバージョンの `error.tsx` の型:

```tsx
"use client"; // エラーバウンダリはClient Component必須

export default function ErrorPage({
  error,
  retry, // 旧バージョンの `reset` から名称変更されている
}: {
  error: Error & { digest?: string };
  retry: () => void;
}) {
  return (
    <div>
      <h2>問題が発生しました</h2>
      <button onClick={() => retry()}>再試行</button>
    </div>
  );
}
```

コンポーネント単位のエラー境界が必要な場合は `next/error` の `catchError` ヘルパーも使える(今回はページ数が少なく、ルートレベルの `app/error.tsx` 一つで十分な想定)。

## 7. アクセシビリティ

- Next.jsはESLintに `eslint-plugin-jsx-a11y` を標準で含む(`npm run lint` で aria属性の誤りなどが検出される)
- クライアント遷移時のスクリーンリーダー向けアナウンスは `document.title` → `<h1>` → URLパスの順で読み上げられる。今回は単一ページだが、`<h1>` を「DNA相補鎖ツール」など内容が分かるテキストにしておくことが重要(モックアップのヒーロー見出しがこれに該当)

## 8. まとめ: このプロジェクトで意識すべきポイント

1. インタラクティブな本体は1つのClient Component(`dna-tool.tsx`)にまとめ、`app/page.tsx` はServer Componentのまま薄く保つ
2. `cacheComponents` は有効化しない(データ取得がないため不要)
3. localStorage(入力履歴)は `useSyncExternalStore` で読み書きする(lazy initializerはハイドレーション不一致、`useEffect`+setStateはESLintの`set-state-in-effect`に抵触するため不採用)
4. URL共有は `window.history.replaceState` を直接呼ぶ。`router.push`/`router.replace` は使わない
5. メタデータ・OGP・sitemap・robotsはNext.jsのファイル規約どおりに配置する
6. `error.tsx` を書く場合、propsは `retry`(`reset` ではない)

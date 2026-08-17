const STEPS = [
  "DNA配列(A, T, G, C)またはFASTA形式のテキストを入力欄に貼り付けます",
  "「相補鎖に変換する」ボタンを押します",
  "逆相補鎖(5'→3')・配列長・GC含量・mRNA表示・制限酵素認識部位などが表示されます",
];

const FEATURES = [
  "DNA配列・FASTA形式(複数配列)の入力に対応",
  "逆相補鎖(5'→3')の計算",
  "mRNA表示(T→U)への切り替え",
  "制限酵素認識部位(EcoRI, BamHI, HindIII, XhoI, NotI)のハイライト表示",
  "配列長・GC含量・塩基構成比の表示",
  "入力履歴の保存(ブラウザ内のみ。配列はサーバーに送信されません)",
];

export function AboutSection() {
  return (
    <section className="mx-auto mt-10 w-full max-w-[1240px] rounded-xl border border-zinc-200 bg-white p-8 text-sm leading-7 text-zinc-600 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-300">
      <h2 className="mb-3 text-lg font-medium text-zinc-900 dark:text-zinc-50">使い方</h2>
      <ol className="mb-8 list-decimal space-y-1 pl-5">
        {STEPS.map((step) => (
          <li key={step}>{step}</li>
        ))}
      </ol>

      <h2 className="mb-3 text-lg font-medium text-zinc-900 dark:text-zinc-50">
        逆相補鎖(リバースコンプリメント)とは
      </h2>
      <p className="mb-8">
        DNAは相補的な2本の鎖からなる二重らせん構造をとっています。一方の鎖の配列がわかれば、塩基の相補性(A-T,
        G-C)にもとづいてもう一方の鎖の配列を求めることができ、さらに鎖の向き(5&apos;→3&apos;)をそろえたものが「逆相補鎖」です。PCRのプライマー設計やクローニング、制限酵素サイトの確認など、分子生物学の実験設計で日常的に使われる基本的な変換のひとつです。このツールでは、入力したDNA配列から逆相補鎖・mRNA・制限酵素認識部位までをブラウザ上で瞬時に計算できます。
      </p>

      <h2 className="mb-3 text-lg font-medium text-zinc-900 dark:text-zinc-50">主な機能</h2>
      <ul className="list-disc space-y-1 pl-5">
        {FEATURES.map((feature) => (
          <li key={feature}>{feature}</li>
        ))}
      </ul>
    </section>
  );
}

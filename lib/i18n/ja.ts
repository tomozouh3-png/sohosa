import type { Dictionary } from "./types";

const description =
  "DNA配列やFASTA形式のデータを入力するだけで、逆相補鎖・mRNA・制限酵素認識部位・プライマーのTm値まで瞬時に計算できる無料のオンラインツール。";

export const ja: Dictionary = {
  locale: "ja",
  htmlLang: "ja",
  meta: {
    title: "DNA相補鎖ツール",
    description,
  },
  languageSwitch: {
    label: "English",
    href: "/en",
  },
  hero: {
    title: "DNA相補鎖ツール",
    subtitle: "DNA配列・FASTA形式に対応、逆相補鎖・mRNA・プライマーTmを瞬時に計算",
  },
  input: {
    label: "DNA配列(A, T, G, C) / FASTA形式",
    placeholder: ">配列名(任意)\nATGCCGTAAGCTTG",
    formatFasta: (count) => `FASTA形式(${count}配列)を検出`,
    formatSingle: "単一配列として認識",
    emptyError: "配列が入力されていません",
  },
  buttons: {
    convert: "相補鎖に変換する",
    sample: "サンプル配列を入力",
    clear: "クリア",
    copy: "コピー",
    copied: "コピー済み",
    clearHistory: "履歴をクリア",
  },
  sample: {
    labelA: "配列A (サンプル配列)",
    labelB: "配列B (制限酵素サイト確認用)",
  },
  options: {
    mrnaTitle: "mRNA表示に切り替える",
    mrnaSubtitle: "T→Uに置換して表示",
    enzymeTitle: "制限酵素部位をハイライト",
    enzymeSubtitle: "認識配列を色分け表示",
    tmTitle: "プライマー特性を表示",
    tmSubtitle: "Tm・GCクランプ・ヘアピン",
    concLabel: "プライマー濃度(nM)",
  },
  history: {
    title: "入力履歴(最大30件)",
    empty: "まだ履歴がありません",
  },
  result: {
    invalidChars: (label, chars) => `${label}: ATGC以外の文字が含まれています(${chars})`,
    statLine: (length, gcPercent) => `${length} 塩基 ・ GC ${gcPercent}%`,
    rcLabel: "逆相補鎖(5' → 3')",
    mrnaLabel: "mRNA(5' → 3')",
    enzymeSectionTitle: "制限酵素認識部位(入力配列上)",
    enzymeNone: "なし",
    auxTitle: "塩基の色分け・構成比・ペアリング",
    pairingTitle: "塩基対のペアリング(上: 入力鎖 5'→3' / 下: 相補鎖 3'→5')",
    ladderOmitted: (limit) => `配列が長いため表示を省略しています(${limit}塩基以下で表示)`,
    lengthLabel: "配列長",
    lengthValue: (length) => `${length} 塩基`,
    gcLabel: "GC含量",
    tmSectionTitle: "プライマー特性(入力配列)",
    tmValue: (celsius) => `${celsius}°C`,
    gcClampLabel: "GCクランプ",
    gcClampGood: "良好",
    gcClampGoodMsg: "3'末端に適度なG/Cクランプがあります",
    gcClampWarn: "要注意",
    gcClampWarnMsg: "3'末端のG/C構成が偏っています(結合が弱い、またはミスプライミングのリスク)",
    hairpinLabel: "ヘアピン",
    hairpinNone: "ヘアピン形成なし",
    hairpinFound: (stemLength) => `ヘアピン形成の可能性(茎${stemLength}bp)`,
    tooShortForTm: (min) => `Tm計算には${min}塩基以上を推奨します`,
  },
  about: {
    usageTitle: "使い方",
    steps: [
      "DNA配列(A, T, G, C)またはFASTA形式のテキストを入力欄に貼り付けます",
      "「相補鎖に変換する」ボタンを押します",
      "逆相補鎖(5'→3')・配列長・GC含量・mRNA表示・制限酵素認識部位・Tm値などが表示されます",
    ],
    aboutTitle: "逆相補鎖(リバースコンプリメント)とは",
    aboutBody:
      "DNAは相補的な2本の鎖からなる二重らせん構造をとっています。一方の鎖の配列がわかれば、塩基の相補性(A-T, G-C)にもとづいてもう一方の鎖の配列を求めることができ、さらに鎖の向き(5'→3')をそろえたものが「逆相補鎖」です。PCRのプライマー設計やクローニング、制限酵素サイトの確認など、分子生物学の実験設計で日常的に使われる基本的な変換のひとつです。このツールでは、入力したDNA配列から逆相補鎖・mRNA・制限酵素認識部位までをブラウザ上で瞬時に計算できます。",
    featuresTitle: "主な機能",
    features: [
      "DNA配列・FASTA形式(複数配列)の入力に対応",
      "逆相補鎖(5'→3')の計算",
      "mRNA表示(T→U)への切り替え",
      "制限酵素認識部位(EcoRI, BamHI, HindIII, XhoI, NotI)のハイライト表示",
      "プライマーのTm値・GCクランプ・ヘアピン形成の判定(nearest-neighbor法)",
      "配列長・GC含量・塩基構成比の表示",
      "入力履歴の保存(ブラウザ内のみ。配列はサーバーに送信されません)",
    ],
    citation:
      "Tm値の計算は SantaLucia J Jr. (1998) 'A unified view of polymer, dumbbell, and oligonucleotide DNA nearest-neighbor thermodynamics.' PNAS 95(4):1460-1465. のnearest-neighbor法パラメータに基づいています。",
  },
  footer: {
    text: "DNA相補鎖ツールはオープンソースで公開しています。バグ報告・要望は",
    githubLabel: "GitHub",
    privacyLabel: "プライバシーポリシー",
    privacyHref: "/privacy",
  },
  share: {
    heading: "シェア",
    xLabel: "Xでシェア",
    copyLabel: "リンクをコピー",
    copiedLabel: "コピーしました",
    tweetText:
      "DNA配列から逆相補鎖・mRNA・制限酵素認識部位を瞬時に計算できる無料ツール「DNA相補鎖ツール」",
  },
};

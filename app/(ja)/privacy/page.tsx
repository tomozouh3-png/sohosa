import type { Metadata } from "next";
import { LegalPage } from "@/components/legal-page";

export const metadata: Metadata = {
  title: "プライバシーポリシー | DNA相補鎖ツール",
  description: "DNA相補鎖ツールのプライバシーポリシー。収集する情報、広告配信、アクセス解析について説明します。",
};

export default function Page() {
  return (
    <LegalPage backHref="/" backLabel="← DNA相補鎖ツールに戻る" title="プライバシーポリシー">
      <p className="mb-6 text-xs text-zinc-400">最終更新日: 2026年8月17日</p>

      <h2 className="mb-2 text-base font-medium text-zinc-900 dark:text-zinc-50">
        配列データについて
      </h2>
      <p className="mb-6">
        DNA相補鎖ツールは、入力されたDNA配列やFASTAデータをサーバーに送信しません。逆相補鎖・mRNA・GC含量・Tm値などの計算処理は、すべてお使いのブラウザ内で完結します。
      </p>

      <h2 className="mb-2 text-base font-medium text-zinc-900 dark:text-zinc-50">入力履歴</h2>
      <p className="mb-6">
        入力履歴機能は、ブラウザのlocalStorage(端末内のみ)に保存されます。この情報が本サービスのサーバーに送信されることはなく、他の利用者と共有されることもありません。
      </p>

      <h2 className="mb-2 text-base font-medium text-zinc-900 dark:text-zinc-50">
        アクセス解析
      </h2>
      <p className="mb-6">
        本サービスでは、Vercel Web
        Analyticsを利用して匿名のページビュー統計(閲覧ページ・参照元・国・デバイス種別など)を取得しています。Cookieは使用せず、個人を特定できる情報は収集しません。
      </p>

      <h2 className="mb-2 text-base font-medium text-zinc-900 dark:text-zinc-50">広告について</h2>
      <p className="mb-6">
        本サービスでは、Google
        AdSenseを利用して広告を配信しています。Googleおよび提携する第三者配信事業者は、Cookieを使用して、利用者が本サービスや他のウェブサイトにアクセスした際の情報に基づき広告を配信することがあります。Googleの広告Cookieの使用に関する詳細、またはパーソナライズ広告を無効にする方法については、
        <a
          href="https://adssettings.google.com/"
          className="text-blue-600 hover:underline dark:text-blue-400"
        >
          Google広告設定
        </a>
        をご覧ください。
      </p>

      <h2 className="mb-2 text-base font-medium text-zinc-900 dark:text-zinc-50">
        第三者サイトへのリンク
      </h2>
      <p className="mb-6">
        本サービスにはGitHubなど第三者サイトへのリンクが含まれる場合があります。リンク先サイトのプライバシー慣行については、本ポリシーの対象外です。
      </p>

      <h2 className="mb-2 text-base font-medium text-zinc-900 dark:text-zinc-50">
        お問い合わせ
      </h2>
      <p>
        本ポリシーに関するご質問は、
        <a
          href="https://github.com/tomozouh3-png/sohosa"
          className="text-blue-600 hover:underline dark:text-blue-400"
        >
          GitHub
        </a>
        のIssueにてお願いします。
      </p>
    </LegalPage>
  );
}

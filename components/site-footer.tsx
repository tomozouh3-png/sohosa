export function SiteFooter() {
  return (
    <footer className="mx-auto w-full max-w-[1240px] px-2 py-8 text-center text-xs text-zinc-400">
      <p>
        DNA相補鎖ツールはオープンソースで公開しています。バグ報告・要望は{" "}
        <a
          href="https://github.com/tomozouh3-png/sohosa"
          className="underline hover:text-zinc-600 dark:hover:text-zinc-300"
        >
          GitHub
        </a>{" "}
        までお願いします。
      </p>
    </footer>
  );
}

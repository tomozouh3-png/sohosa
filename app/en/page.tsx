import { HomePage } from "@/components/home-page";
import { getDictionary } from "@/lib/i18n";

export default async function Page({ searchParams }: PageProps<"/en">) {
  const params = await searchParams;
  const seqParam = params.seq;
  const initialSeq = Array.isArray(seqParam) ? (seqParam[0] ?? "") : (seqParam ?? "");

  return <HomePage dict={getDictionary("en")} initialSeq={initialSeq} />;
}

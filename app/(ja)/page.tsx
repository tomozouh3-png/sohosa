import { HomePage } from "@/components/home-page";
import { getDictionary } from "@/lib/i18n";

export default async function Page({ searchParams }: PageProps<"/">) {
  const params = await searchParams;
  const seqParam = params.seq;
  const initialSeq = Array.isArray(seqParam) ? (seqParam[0] ?? "") : (seqParam ?? "");

  return <HomePage dict={getDictionary("ja")} initialSeq={initialSeq} />;
}

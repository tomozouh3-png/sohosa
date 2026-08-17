import { DnaTool } from "@/components/dna-tool";

export default async function Home({ searchParams }: PageProps<"/">) {
  const params = await searchParams;
  const seqParam = params.seq;
  const initialSeq = Array.isArray(seqParam) ? (seqParam[0] ?? "") : (seqParam ?? "");

  return (
    <div className="flex flex-1 items-start justify-center bg-zinc-50 px-6 py-12 dark:bg-zinc-950">
      <DnaTool initialSeq={initialSeq} />
    </div>
  );
}

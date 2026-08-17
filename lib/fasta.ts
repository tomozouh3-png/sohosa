export type ParsedRecord = {
  label: string;
  raw: string;
};

/**
 * Parses plain DNA text or FASTA-formatted text (one or more `>`-headed
 * records) into a flat list of records. Non-FASTA input is treated as a
 * single unlabeled record.
 */
export function parseFasta(text: string): ParsedRecord[] {
  const trimmed = text.trim();
  if (!trimmed) return [];

  if (/(^|\n)>/.test(trimmed)) {
    const blocks = trimmed
      .split(/\n(?=>)/)
      .map((block) => block.trim())
      .filter(Boolean);

    return blocks
      .map((block, index) => {
        const lines = block.split("\n");
        let label = `配列 ${index + 1}`;
        let seqLines = lines;

        if (lines[0].startsWith(">")) {
          label = lines[0].slice(1).trim() || label;
          seqLines = lines.slice(1);
        }

        return { label, raw: seqLines.join("").replace(/\s/g, "") };
      })
      .filter((record) => record.raw.length > 0);
  }

  return [{ label: "配列 1", raw: trimmed.replace(/\s/g, "") }];
}

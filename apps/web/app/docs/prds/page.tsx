import fs from "node:fs/promises";
import path from "node:path";

import { marked } from "marked";

export default async function PrdsPage() {
  const filePath = path.join(process.cwd(), "docs", "prds.md");
  const content = await fs.readFile(filePath, "utf8");
  const html = await marked.parse(content);

  return (
    <div className="mx-auto max-w-4xl px-6 py-12">
      <article className="prose prose-invert prose-headings:font-semibold">
        <div dangerouslySetInnerHTML={{ __html: html }} />
      </article>
    </div>
  );
}

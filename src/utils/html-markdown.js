import { remark } from "remark";
import remarkParse from "remark-parse/lib";
import remarkRehype from "remark-rehype/lib";
import remarkStringify from "remark-stringify/lib";
import rehypeParse from "rehype-parse/lib";
import rehypeRemark from "rehype-remark/lib";
import rehypeStringify from "rehype-stringify/lib";
import remarkGfm from "remark-gfm";

export const htmlToMarkdown = (htmlText) => {
  const file = remark()
    .use(rehypeParse, { emitParseErrors: true, duplicateAttribute: false })
    .use(rehypeRemark)
    .use(remarkStringify)
    .use(remarkGfm)
    .processSync(htmlText);
  return String(file);
}

export const markdownToHtml = (markdownText) => {
  const file = remark()
    .use(remarkParse)
    .use(remarkGfm)
    .use(remarkRehype)
    .use(rehypeStringify)
    .processSync(markdownText);
  return String(file);
}

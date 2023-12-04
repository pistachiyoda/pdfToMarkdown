import { extractTextFromPDF } from "./pdfToText";
import { convertTextToMarkdown } from "./textToMarkdown";

export async function convertPDFToMarkdown(pdfPath: string): Promise<string[]> {
  const pdfTextArray = await extractTextFromPDF(pdfPath);

  const promises = pdfTextArray.map(async (text, i) => {
    console.log(`${i + 1}ページ目の変換を開始します。`);
    await convertTextToMarkdown(text, pdfPath, i);
    console.log(`${i + 1}ページ目の変換が完了しました。`);
    return `${pdfPath.split(".")[0]}${i + 1}.md`;
  });
  const paths = await Promise.all(promises);
  return paths;
}

import { extractTextFromPDF } from "./pdfToText";
import { convertTextToMarkdown } from "./textToMarkDown";

async function convertPDFToMarkdown(fileName: string): Promise<void> {
  const pdfTextArray = await extractTextFromPDF(pdfPath);
  for (let i = 0; i < pdfTextArray.length; i++) {
    await convertTextToMarkdown(pdfTextArray[i], fileName, i);
    console.log(`${i + 1}ページ目の変換が完了しました。`);
  }
}

if (process.argv.length <= 2) {
  console.log("引数にファイル名を指定してください。ex:./file.pdf");
  process.exit(1);
}
const pdfPath = process.argv[2];
convertPDFToMarkdown(pdfPath).catch((error) => {
  console.error(error);
});

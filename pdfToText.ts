import * as fs from "fs";
import * as pdfjsLib from "pdfjs-dist";

export async function extractTextFromPDF(pdfPath: string): Promise<string[]> {
  const pdfData = new Uint8Array(fs.readFileSync(pdfPath));

  const loadingTask = pdfjsLib.getDocument({ data: pdfData });
  const pdf = await loadingTask.promise;
  const maxPages = pdf.numPages;
  let pdfTextArray: string[] = new Array(maxPages);

  for (let pageNumber = 1; pageNumber <= maxPages; pageNumber++) {
    const page = await pdf.getPage(pageNumber);
    const content = await page.getTextContent({ includeMarkedContent: false });
    const pageText = content.items
      .map((item) => ("str" in item ? item.str : ""))
      .join("\n");
    pdfTextArray[pageNumber - 1] = pageText;
  }
  return pdfTextArray;
}

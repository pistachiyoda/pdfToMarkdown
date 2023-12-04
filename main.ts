import { convertPDFToMarkdown } from "./pdfToMarkdown";
import * as fs from "fs";

if (process.argv.length <= 2) {
  console.log("引数にファイル名を指定してください。ex:./file.pdf");
  process.exit(1);
}
const pdfPath = process.argv[2];
const mdPaths = await convertPDFToMarkdown(pdfPath);

const fileName = pdfPath.replace("./", "").replace(".pdf", "");
const outputmd = `${fileName}.md`;
for (const mdPath of mdPaths) {
  const currentOutput = fs.readFileSync(mdPath);
  fs.appendFileSync(outputmd, currentOutput);
  fs.unlinkSync(mdPath);
}

import * as fs from "fs";
import OpenAI from "openai";

export async function convertTextToMarkdown(
  text: string,
  filaName: string,
  i: number
): Promise<void> {
  const model = "gpt-4-1106-preview";
  const apiKey = process.env.OPENAI_API_KEY;
  const prompt = `
    要件に基づいて情報を変換してください。
    ### 要件 ###
    - markdown形式に変換してください。
    - 日本語で出力してください。
    - 文章は改変しないでください。ただし自然な文章にするための改行の追加・削除は許可します。
    - テーブル形式で表現できる部分はテーブル形式で表現してください。テーブル化についてはテーブル化する際の要件を参照してください。

    ### テーブル化する際の要件 ###
    - 元データの文字列は決して削除せず、テーブルの構成にふくめてください。
    - テーブル表現の際、空白となる要素は作らず、適切な値を設定してください。この場合のカラムやラインの追加による改変は許可しますが。削除は許可されません。以下に例を示します。
    このようなテーブルがあった場合、
    | A | B |
    | -- |-- |
    | C  | D |
    | E  | F |
    |    | G |
    | H  | I |
    このように変換してください。
    | A | B |
    | -- |-- |
    | C  | D |
    | E  | F |
    | E  | G |
    | H  | I |
    空欄に入る適切な値は、前後の情報から推測することができる場合は推測してください。推測できない場合は、空欄にしてください。
    `;
  const data = `
    ### 情報 ###
    ${text}
    `;
  const openai = new OpenAI({ apiKey });

  const chatCompletion = await openai.chat.completions.create({
    messages: [
      { role: "user", content: prompt },
      { role: "user", content: data },
    ],
    model,
  });
  const outputFileName = filaName.replace("./", "").replace(".pdf", "");
  console.log(chatCompletion.choices[0].message);
  if (chatCompletion.choices[0].message.content !== null) {
    fs.writeFileSync(
      `${filaName}${i + 1}.md`,
      chatCompletion.choices[0].message.content
    );
  } else {
    console.error("Error: message content is null");
  }
}

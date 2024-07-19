import { Html, Head, Main, NextScript } from "next/document";
import fs from "fs";
import * as cheerio from "cheerio";
import parse from "html-react-parser";
import { useState } from "react";
//html react parcer
//cheerio
//1 прочитать wiewer html через readFileSync(,'utf8')
//2 прочитанный кладем в cheerio
//3 найти скрипты, body, link c cheerio

export default function Document() {
  const [body, setBody] = useState<string>("");
  const [head, setHead] = useState<string[]>([]);

  try {
    const file = fs.readFileSync("./public/web/viewer.html", "utf8");
    const $ = cheerio.load(file);
    const bodyStr = $("body").html();
    // const bodyStr = $.html($("body"));
    const headElements = $("link, script");

    bodyStr && setBody(bodyStr);

    const headHtmlArray: string[] = [];
    headElements.each((index, element) => {
      const linkHtml = $.html(element);
      headHtmlArray.push(linkHtml);
    });

    setHead(headHtmlArray);
    console.log(body);
    // почему-то body выглялит вот так:
    // <body tabindex="1">

    // <meta charset="utf-8">
    // <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1">
    // <meta name="google" content="notranslate">
    // <title>PDF.js viewer</title>
    // <link rel="resource" type="application/l10n" href="locale/locale.json">
    // <script src="../build/pdf.mjs" type="module"></script>

    // <link rel="stylesheet" href="viewer.css">

    // <script src="viewer.mjs" type="module"></script>
  } catch (error) {
    console.error("error");
  }

  return (
    <Html>
      <Head>
        {head && head.map((item) => parse(item))}
      </Head>
      {/* <body> */}
        {body &&
          parse(body.replace('selected="selected"', 'defaultValue="selected"'))}

        {/* тут перредать через parcer ссылки и скрипты */}
        {/* {body && parse(body)} */}
        {/* тут вместо body распарсить body из viewer.html */}
        {/* .replace('selected="selected"', 'defaultValue="selected"') */}
        <Main />
        <NextScript />
      {/* </body> */}
    </Html>
  );
}

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
    const headElements = $("link, script");
    // const scriptElements = $("script");

    bodyStr && setBody(bodyStr);

    const headHtmlArray: string[] = [];
    headElements.each((index, element) => {
      const linkHtml = $.html(element);
      headHtmlArray.push(linkHtml);
    });

    setHead(headHtmlArray);
    // console.log($("link").html());

    // console.log(scryptsStr);
  } catch (error) {
    console.error("error");
  }

  return (
    <Html>
      <Head>
        {/* {scriptObj && parse(scriptObj)} */}
        {head && head.map((item) => parse(item))}
      </Head>
      <body>
        {body &&
          parse(body.replace('selected="selected"', 'defaultValue="selected"'))}

        {/* тут перредать через parcer ссылки и скрипты */}
        {/* {body && parse(body)} */}
        {/* тут вместо body распарсить body из viewer.html */}
        {/* .replace('selected="selected"', 'defaultValue="selected"') */}
        <Main />
        <NextScript />
      </body>
    </Html>
    // cheerio скрипты, body, link
  );
}

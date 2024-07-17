import type { NextApiRequest, NextApiResponse } from "next";
import fs from "fs";
import * as pdfjs from "pdfjs-dist";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const fileId = req.query.fileId as string;
  //req.query.fileId as string
  const filePath = `./public/pdf/links.pdf`;

  if (!fs.existsSync(filePath)) {
    res.status(404).send({ message: "File not found" });
    return;
  }

  const file = fs.readFileSync(filePath);
  const uint8Array = new Uint8Array(file);

  console.log(1);
  const pdf = await pdfjs.getDocument({ data: uint8Array }).promise;

  const numPages = pdf.numPages;
  const links: string[] = [];
  let body = "";
  const scripts: string[] = [];

  for (let pageNum = 1; pageNum <= numPages; pageNum++) {
    const page = await pdf.getPage(pageNum);
    const textContent = await page.getTextContent();
    console.log(page);

    // Собираем текст
    textContent.items.forEach((item: any) => {
      if ("str" in item) {
        body += item.str + " ";
      }
    });

    const annotations = await page.getAnnotations();
    annotations.forEach((annotation) => {
      if (annotation.url) {
        links.push(annotation.url);
      }

      // console.log(2);
      // console.log(annotation);
      if (annotation.subtype === "Widget" && annotation.actions) {
        const actions = annotation.actions;
        if (actions.A && actions.A.S === "JavaScript") {
          scripts.push(actions.A.JS);
        }
      }
    });
  }

  res.status(200).json({ body, links, scripts });
}

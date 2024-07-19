import type { NextApiRequest, NextApiResponse } from "next";
import fs from "fs";
import * as pdfjs from "pdfjs-dist";

type LinkType = {
  str: string;
  url: string | null;
};

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
  
  // const uint8Array = new Uint8Array(file);
  // console.log(uint8Array);

  // const pdf = await pdfjs.getDocument({ data: uint8Array }).promise;

  // const links: LinkType[] = [];
  // let body = "";
  // const scripts: string[] = [];
  // const page1 = await pdf.getPage(1);
  // for (let pageNum = 1; pageNum <= pdf.numPages; pageNum++) {
  //   const page = await pdf.getPage(pageNum);
  //   const textContent = await page.getTextContent();

  //   textContent.items.forEach((item: any) => {
  //     // console.log(typeof(item));
  //     // console.log(page);

  //     if ("str" in item) {
  //       body += item.str + " ";
  //     }
  //   });

  //   const annotations = await page.getAnnotations();
  //   annotations.forEach((annotation) => {
  //     // console.log(annotation.dest);

  //     //get urls
  //     if (annotation.url) {
  //       const link = { str: annotation.contentsObj.str, url: annotation.url };
  //       links.push(link);
  //     }

  //     //get scripts
  //     if (annotation.subtype === "Link" || annotation.subtype === "Widget") {
  //       const actions = annotation.actions;
  //       // console.log(actions);

  //       // if (actions.A && actions.A.S === "JavaScript") {
  //       //   scripts.push(actions.A.JS);
  //       // }
  // }
  // });
  // const viewport = page.getViewport({ scale: 1.5 });
  // const viewerContainer = useRef<HTMLDivElement>(null);
  // const container = viewerContainer.current;
  // const canvas = document.createElement("canvas");
  // const canvasContext = canvas.getContext("2d");
  // if (canvasContext) {
  //   canvas.height = viewport.height;
  //   canvas.width = viewport.width;

  //   page
  //     .render({
  //       canvasContext: canvasContext as CanvasRenderingContext2D,
  //       viewport,
  //     })
  //     .promise.then(() => {
  //       if (container) container.appendChild(canvas);
  //     });
  // }
  // }

  res.status(200).setHeader("Content-Type", "application/pdf").send(file);
  // res.status(200).json({ body, links, scripts });
}

import { NextApiRequest, NextApiResponse } from "next";
import * as pdfjs from "pdfjs-dist";

type LinkType = {
  str: string;
  url: string | null;
};

const getFile = async (filePath: string) => {
  try {
    const res = await fetch(filePath);
    if (!res.ok) {
      throw new Error("File not found");
    }
    return await res.arrayBuffer();
  } catch (error) {
    throw error;
  }
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const fileId = req.query.fileId as string;
  const filePath = `http://rubin.kodeks.ru:888/file/${fileId}`;

  const fileArrayBuffer = await getFile(filePath);
  const fileBuffer = Buffer.from(fileArrayBuffer);

  res.status(200).setHeader("Content-Type", "application/pdf").send(fileBuffer);
}
//http://localhost:3000/api/viewer/9cbc09d763a3a48ac28fbf8ef09e1e42

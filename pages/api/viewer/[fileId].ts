import { NextApiRequest, NextApiResponse } from "next";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const { fileId } = req.query;

  res.redirect(
    `/web/viewer_new?${new URLSearchParams({
      file: `/api/file/${fileId}`,
    })}`
  );
}

//http://localhost:3000/api/viewer/9cbc09d763a3a48ac28fbf8ef09e1e42

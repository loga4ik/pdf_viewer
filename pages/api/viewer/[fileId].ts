import { NextApiRequest, NextApiResponse } from "next";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const { fileId } = req.query;

  res.redirect(
    `/web/viewer_new?${new URLSearchParams({
      file: `/api/file/${fileId}`,
    })}`
  );
}

//http://localhost:3000/api/viewer/9a23bb45c9b33b211fc3c7a4237a1482

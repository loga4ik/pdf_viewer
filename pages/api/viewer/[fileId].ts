import { NextApiRequest, NextApiResponse } from "next";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const { fileId } = req.query;

  res.redirect(
    `/web/viewer_new?${new URLSearchParams({
      file: `/api/file/${fileId}`,
    })}`
  );
  // console.log(fileId);
}
//http://localhost:3000/api/viewer/9a23bb45c9b33b211fc3c7a4237a1482

// pages/redirect.tsx
// import { useEffect } from 'react';
// import { useRouter } from 'next/router';

// const Redirect: React.FC = () => {
//   const router = useRouter();

//   useEffect(() => {
//     const queryParams = { param1: 'value1', param2: 'value2' };
//     router.push({
//       pathname: '/targetPage',
//       query: queryParams,
//     });
//   }, [router]);

//   return null;
// };

// export default Redirect;

import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
type Query = {
  body: any;
  query: string[];
  scripts: string[];
};
export default function handler() {
  // const [query, setQuery] = useState<Query>();
  // const [pageCanvas, setPageCanvas] = useState<HTMLCanvasElement>();
  // const searchParams = useSearchParams();
  // const filePath = searchParams.get("file");
  // useEffect(() => {
  //   const controller = new AbortController();
  //   (async () => {
  //     try {
  //       if (!filePath) return;
  //       const res = await fetch(filePath, {
  //         signal: controller.signal,
  //       });
  //       if (!res.ok) {
  //         throw new Error(`${res.statusText}`);
  //       }
  //       const data = await res.json();
  //       if (data !== query) {
  //         setQuery(data);
  //       }
  //       // console.log(123);
  //       console.log(res);
  //     } catch (error) {
  //       controller.abort();
  //     }
  //     return controller.abort();
  //   })();
  // }, [filePath]);

  // useEffect(() => {
  //   if (!query) {
  //     return;
  //   }
  //   (async () => {
  //     console.log(query);

  //     // const pdf = await pdfjs.getDocument(query.body).promise;
  //     // const page = await pdf.getPage(pageNum);
  //   })();
  //   // console.log(pdf);

  //   const canvasArr = [];
  //   const canvas = document.createElement("canvas");
  //   const canvasContext = canvas.getContext("2d");
  //   setPageCanvas(canvas);
  //   console.log(canvas);
  // }, [query]);
  console.log(123);
}

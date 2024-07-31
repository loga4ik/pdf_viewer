import { useEffect, useState } from "react";
import Link from "../../components/Link";
import * as pdfjs from "pdfjs-dist";
import { useSearchParams } from "next/navigation";
import getPdfAnnotations, { PdfLink } from "@/src/getPdfAnnotations";

const extractFileId = (url: string | null) => {
  if (!url) return null;
  const parts = url.split("/");
  return parts[parts.length - 1];
};

export default function Handler() {
  const [isLinkDoc, setIsLinkDoc] = useState(false);
  const [linkArr, setLinkArr] = useState<PdfLink[]>([]);
  const searchParams = useSearchParams();
  const fileName = extractFileId(searchParams.get("file"));

  useEffect(() => {
    const viewerContainer = document.querySelector("#viewerContainer");
    if (fileName) {
      const observer = new MutationObserver(() => {
        //MutationObserver следит за обновлениями в dom
        const section = document.querySelectorAll(
          "section[data-annotation-id]"
        );
        if (section.length) {
          setIsLinkDoc(true);
          observer.disconnect(); // больше не следит
        }
      });

      viewerContainer &&
        observer.observe(viewerContainer, {
          //настраиваем за какими элементами следим
          childList: true,
          // список дочерних элементов
          subtree: true,
          // все элементы, вложенные в дочерние (вся ветка)
        });

      // и тут больше не следит
      return () => observer.disconnect();
    }
  }, [fileName]);

  useEffect(() => {
    if (isLinkDoc && fileName) {
      (async () => {
        // тут мы собираем правильный url для pdf.js
        pdfjs.GlobalWorkerOptions.workerSrc = new URL(
          "pdfjs-dist/build/pdf.worker.min.js",
          import.meta.url // ссылка на текущий файл
        ).toString();
        const links = await getPdfAnnotations(fileName);
        if (links.length) {
          setLinkArr(links);
        }
      })();
    }
  }, [isLinkDoc, fileName]);

  return isLinkDoc ? <Link links={linkArr} /> : null;
}

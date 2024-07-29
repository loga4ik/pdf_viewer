import { useEffect, useState } from "react";
import Link from "../../components/Link";
import * as pdfjs from "pdfjs-dist";
import { useSearchParams } from "next/navigation";
import getPdfAnnotations, { PdfLink } from "@/src/getPdfAnnotations";
//получить файлID через route
//dataAnotationId (проверить наличие)
//если есть ссылки(dataAnotationId) то идем дальше
//вернем ссылку нового компанента ссылки (создать новый компанент)

//pdfjs-dist достаем все ссылки (почитать буфер и стрим)

//положить ссылки в useState
const extractFileId = (url: string | null) => {
  if (!url) return null;
  const parts = url.split("/");
  return parts[parts.length - 1];
};

export default function handler() {
  // const fileId = req.query.file as string;
  const [isLinkDoc, setIsLinkDoc] = useState(false);
  const [linkArr, setLinkArr] = useState<PdfLink[]>();
  const searchParams = useSearchParams();
  const fileName = extractFileId(searchParams.get("file"));
  // const file = searchParams.get("file");
  // console.log(searchParams.get("file"));

  useEffect(() => {
    //переписать setTimeout обязательно
    setTimeout(() => {
      const section = document.querySelectorAll("section");
      console.log(section);

      section.length && setIsLinkDoc(true);
      // console.log(section.length);
    }, 4000);
    //используем useEffect так как нам необходимо дождаться отрисовки страници
  }, [fileName]);
  useEffect(() => {
    if (isLinkDoc && fileName) {
      (async () => {
        pdfjs.GlobalWorkerOptions.workerSrc = new URL(
          "pdfjs-dist/build/pdf.worker.min.js",
          import.meta.url
        ).toString();
        const links = await getPdfAnnotations(fileName);
        links.length && setLinkArr(links);
        // console.log(links);

        // if (links.length) {
        //   console.log(links);
        //   setLinkArr(links);
        //   console.log(linkArr);
        // }
      })();
    }
  }, [isLinkDoc]);
  // console.log(isLinkDoc, fileName);
  return isLinkDoc && <Link links={linkArr} />;
}
//в ts ошибка  Link' refers to a value, but is being used as a type here. Did you mean 'typeof Link'?
//поэтому меняем на tsx

import * as pdfjs from "pdfjs-dist";
export interface PdfLink {
  id: string;
  link: string;
}


// pdfjs.GlobalWorkerOptions.workerSrc = new URL(
//   '/node_modules/pdfjs-dist/build/pdf.worker.min.mjs',
//   import.meta.url,
// ).toString();
// Укажите путь к воркеру PDF.js как обычному JavaScript файлу
// pdfjs.GlobalWorkerOptions.workerSrc =
//   "/node_modules/pdfjs-dist/build/pdf.worker.js";

const getFileBuffer = async (filePath: string): Promise<Buffer> => {
  const res = await fetch(filePath);
  if (!res.ok) {
    throw new Error("File not found");
  }
  const fileArrayBuffer = await res.arrayBuffer();
  return Buffer.from(fileArrayBuffer);
};

export default async function getPdfAnnotations(fileName: string) {
  const filePath = `http://rubin.kodeks.ru:888/file/${fileName}`;

  try {
    const fileBuffer = await getFileBuffer(filePath);
    const pdfDocument = await pdfjs.getDocument({ data: fileBuffer }).promise;

    const numPages = pdfDocument.numPages;
    const links: PdfLink[] = [];

    // Перебор всех страниц
    for (let i = 1; i <= numPages; i++) {
      const page = await pdfDocument.getPage(i);
      const annotations = await page.getAnnotations();

      // Перебор всех аннотаций страницы
      annotations.forEach((annotation) => {
        if (annotation.subtype === "Link") {
          const link = { id: annotation.id, link: annotation.unsafeUrl };
          // console.log(annotation.id, annotation.unsafeUrl);
          links.push(link);
        }
      });
    }
    return links;
  } catch (error) {
    console.error(error);
    throw new Error("Failed to fetch or process PDF file");
  }
}

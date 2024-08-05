import getLinkTitle from "@/src/getLinkTitle";
import getPdfAnnotations, { PdfLink } from "@/src/getPdfAnnotations";
import useLinkHover from "@/src/Hooks/useLinkHover";
import React, { useEffect, useState } from "react";
import LinkPreview from "./LinkPrewiew/LinkPreview";
type Props = {
  fileId: string;
  // links: PdfLink[] | undefined;
};
const Link: React.FC<Props> = ({ fileId }) => {

  const asyncGetPdfAnnotations = async () => {
    const links = await getPdfAnnotations(fileId);
    setLinkArr(links);
  };

  const { startHover, endHover, url } = useLinkHover();
  const [annotationElement, setAnnotationElement] = useState<HTMLElement>();
  const [linkArr, setLinkArr] = useState<PdfLink[]>([]);
  const [docDetails, setDocDetails] = useState<string>();
  const viewerContainer = document.querySelector("#viewerContainer");

  const asyncGetLinkTitle = async (url: string) => {
    setDocDetails(await getLinkTitle(url));
  };
  const annotationEventLeave = () => {
    endHover();
    setAnnotationElement(undefined);
    setDocDetails(undefined);
  };

  const mouseenter = (e: Event): void => {
    const target = e.target as HTMLElement;
    if (
      target.hasAttribute("data-annotation-id") &&
      target.getAttribute("class") === "linkAnnotation"
    ) {
      setAnnotationElement(target);
      const dataAnnotationId = target.getAttribute("data-annotation-id");

      linkArr.forEach((element) => {
        if (element.id === dataAnnotationId) {
          startHover(element.link);
        }
      });
      target.addEventListener("mouseleave", annotationEventLeave);
    }
  };

  // + add/remove event listerner передавать не весь прослушиватель события, а только функцию
  // + положить в useState значение ссылки
  // + тут вызывать getPdfAnnotations
  // + mouseEnter положить html элемент (section) на который наведена мышка в state (annotationElement)
  // + mouseLeav - очистить стэйты

  useEffect(() => {
    viewerContainer?.addEventListener("mouseenter", mouseenter, true);
    return () => {
      if (viewerContainer && mouseenter) {
        viewerContainer.removeEventListener("mouseenter", mouseenter);
      }
      if (annotationElement && annotationEventLeave) {
        annotationElement.removeEventListener(
          "mouseenter",
          annotationEventLeave
        );
      }
    };
  }, [viewerContainer, annotationEventLeave]);

  useEffect(() => {
    asyncGetPdfAnnotations();
  }, [fileId]);

  useEffect(() => {
    if (url) {
      asyncGetLinkTitle(url);
    }
  }, [url]);

  useEffect(() => {
  }, [ docDetails]);

  // вызов getLinkTitle если есть ссылка на док в state
  // getLinkTitle вернет строку, кладем ее в state
  // создать LinkPreview() передать описание ссылки, html-элемент (по умолчанию внизу)
  return (
    // <div></div>

    annotationElement &&
    docDetails && (
      <LinkPreview
        annotationElement={annotationElement}
        docDetails={docDetails}
      />
    )
  );
};

export default Link;

//viewerContainer обработчик событий
//отписаться от слушателей
import { PdfLink } from "@/src/getPdfAnnotations";
import useChangeColor from "@/src/Hooks/useChangeColor";
import React, { useEffect, useState } from "react";
type Props = {
  links: PdfLink[] | undefined;
};
const Link: React.FC<Props> = ({ links }) => {
  const { startHover, endHover, isHovered } = useChangeColor();
  const [annotationEventLeave, setAnnotationEventLeave] = useState();
  const [annotationElement, setAnnotationElement] = useState<HTMLElement>();
  const viewerContainer = document.querySelector("#viewerContainer");
  useEffect(() => {
    const listener = viewerContainer?.addEventListener(
      "mouseenter",
      (e) => {
        const target = e.target as HTMLElement;
        if (target.hasAttribute("data-annotation-id")) {
          // console.log(
          //   "data-annotation-id = ",
          //   target.getAttribute("data-annotation-id")
          // );
          setAnnotationElement(target);
          startHover();
          setAnnotationEventLeave(() => {
            target.addEventListener("mouseleave", () => {
              endHover();
            });
          });
        }
      },
      true
    );
    return () => {
      if (viewerContainer && listener) {
        viewerContainer.removeEventListener("mouseenter", listener);
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
    console.log(isHovered);
  }, [isHovered]);
  return <div>Link</div>;
};

export default Link;
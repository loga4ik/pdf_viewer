//viewerContainer обработчик событий
//отписаться от слушателей
import { PdfLink } from "@/src/getPdfAnnotations";
import React, { useEffect } from "react";
type Props = {
  links: PdfLink[] | undefined;
};
const Link: React.FC<Props> = ({ links }) => {
  console.log(links);
  const viewerContainer = document.querySelector("#viewerContainer");
  useEffect(() => {
    console.log(viewerContainer);

    const listener = viewerContainer?.addEventListener(
      "mouseenter",
      (e) => {
        const target = e.target as HTMLElement;
        if (target.hasAttribute("data-annotation-id")) {
          console.log(
            "data-annotation-id = ",
            target.getAttribute("data-annotation-id")
          );
          console.log(target);
        }
      },
      true
    );
    return () => {
      if (viewerContainer && listener) {
        viewerContainer.removeEventListener("mouseenter", listener);
      }
    };
  }, [viewerContainer]);

  return <div>Link</div>;
};

export default Link;

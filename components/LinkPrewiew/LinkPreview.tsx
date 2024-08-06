import React, { useEffect } from "react";
import styles from "./LinkPrewiew.module.css";
import ReactDOM from "react-dom";
type Props = {
  annotationElement: HTMLElement;
  docDetails: string;
};

const LinkPreview: React.FC<Props> = ({ annotationElement, docDetails }) => {
  useEffect(() => {
    annotationElement.classList.add(styles.detailsWrapper);
    return () => {
      annotationElement.classList.remove(styles.detailsWrapper);
    };
  }, [annotationElement, docDetails]);

  return ReactDOM.createPortal(
    <div
      className={`${styles.divDetails} ${
        annotationElement.getBoundingClientRect().top > 60
          ? styles.top
          : styles.bottom
      }`}
    >
      {docDetails}
    </div>,
    annotationElement
  );
};

export default LinkPreview;

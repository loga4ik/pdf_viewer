import React, { useEffect } from "react";
import styles from "./LinkPrewiew.module.css";
type Props = {
  annotationElement: HTMLElement;
  docDetails: string;
};

const LinkPreview: React.FC<Props> = ({ annotationElement, docDetails }) => {
  useEffect(() => {
    // Создаем новый элемент div и задаем его содержимое
    const divDetails = document.createElement("div");
    divDetails.innerHTML = docDetails;
    divDetails.classList.add(styles.divDetails, styles.top);
    annotationElement.classList.add(styles.detailsWrapper);

    if (annotationElement.getBoundingClientRect().top > 60) {
      divDetails.classList.add(styles.top);
    } else {
      divDetails.classList.add(styles.bottom);
    }

    // Проверяем, что annotationElement существует, и добавляем divDetails в него
    if (annotationElement) {
      annotationElement.appendChild(divDetails);
    }

    // Убираем divDetails при размонтировании компонента
    return () => {
      if (annotationElement) {
        annotationElement.removeChild(divDetails);
      }
    };
  }, [annotationElement, docDetails]);

  return <div>LinkPreview</div>;
};

export default LinkPreview;

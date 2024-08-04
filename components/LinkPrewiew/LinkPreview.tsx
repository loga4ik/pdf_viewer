import React, { useEffect } from "react";
import styles from "./LinkPrewiew.module.css";
type Props = {
  annotationElement: HTMLElement;
  docDetails: string;
};

const LinkPreview: React.FC<Props> = ({ annotationElement, docDetails }) => {
    console.log(123);
    
  useEffect(() => {
    // Создаем новый элемент div и задаем его содержимое
    const divDetails = document.createElement("div");
    divDetails.innerHTML = docDetails;
    divDetails.classList.add(styles.divDetails, styles.top);
    annotationElement.classList.add(styles.detailsWrapper);
    console.log(annotationElement.getBoundingClientRect().top);
    
    if (annotationElement.getBoundingClientRect().top > 75) {
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
      console.log(123);
      
      // if (annotationElement) {
      //   annotationElement.removeChild(divDetails);
      // }
    };
  }, [annotationElement, docDetails]);

  return <div>LinkPreview</div>;
};

export default LinkPreview;
// position: static;
// padding: 0;
// margin: 0;
// margin-top: -10px;

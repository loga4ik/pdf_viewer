import { useState, useEffect } from "react";

function useLinkHover() {
  const [isHovered, setIsHovered] = useState<string | null>(null);

  let timeout: ReturnType<typeof setTimeout>;

  const startHover = (dataAnnotationId: string) => {
    timeout = setTimeout(() => {
    setIsHovered(dataAnnotationId);
    }, 500);
  };

  const endHover = () => {
    clearTimeout(timeout);
    setIsHovered(null);
  };

  // мы используем кастомный хук, для clearTimeout(timeout)
  // при переходе на другую страничку

  useEffect(() => {
    return clearTimeout(timeout);
  }, []);

  return {
    startHover,
    endHover,
    isHovered,
  };
}

export default useLinkHover;

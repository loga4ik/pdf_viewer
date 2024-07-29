import { useState, useEffect } from "react";

function useChangeColor() {
  const [isHovered, setIsHovered] = useState(false);

  let timeout: ReturnType<typeof setTimeout>;

  const startHover = () => {
    timeout = setTimeout(() => {
      setIsHovered(true);
    }, 300);
  };

  const endHover = () => {
    clearTimeout(timeout);
    setIsHovered(false);
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

export default useChangeColor;

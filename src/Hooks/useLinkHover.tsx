import { useState, useEffect } from "react";

function useLinkHover() {
  const [url, seturl] = useState<string | null>(null);

  let timeout: ReturnType<typeof setTimeout>;

  const startHover = (dataAnnotationId: string) => {
    timeout = setTimeout(() => {
    seturl(dataAnnotationId);
    }, 500);
  };

  const endHover = () => {
    clearTimeout(timeout);
    seturl(null);
  };

  // мы используем кастомный хук, для clearTimeout(timeout)
  // при переходе на другую страничку

  useEffect(() => {
    return clearTimeout(timeout);
  }, []);

  return {
    startHover,
    endHover,
    url,
  };
}

export default useLinkHover;

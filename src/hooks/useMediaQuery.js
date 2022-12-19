import { useEffect, useState } from "react";

/**
 * Hook for handling media query
 */

const useMediaQuery = (query) => {
  const [isMatched, setIsMatched] = useState(true);

  useEffect(() => {
    const media = window.matchMedia(query);

    const listener = () => {
      if (isMatched !== media.matches) setIsMatched(media.matches);
    };

    listener();
    window.addEventListener("resize", listener);

    return () => window.removeEventListener("resize", listener);
  }, [query, isMatched]);

  return isMatched;
};

export default useMediaQuery;

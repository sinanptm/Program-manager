import { useState, useEffect, useRef, useCallback } from "react";

export const useThrottledResize = (delay = 300) => {
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const lastCall = useRef(Date.now());

  const handleResize = useCallback(() => {
    const now = Date.now();
    if (now - lastCall.current >= delay) {
      lastCall.current = now;
      setWindowWidth(window.innerWidth);
    }
  }, [delay]);

  useEffect(() => {
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [handleResize]);

  return windowWidth;
};


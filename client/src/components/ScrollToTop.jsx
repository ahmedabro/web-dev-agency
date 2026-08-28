import { useEffect } from "react";
import { useLocation } from "react-router";

export default function ScrollToTop({ lenisRef }) {
  const { pathname } = useLocation();

  useEffect(() => {
    // Tell Lenis to go to the top immediately
    if (lenisRef.current) {
      lenisRef.current.scrollTo(0, {
        immediate: true,
      });
    } else {
      // Fallback if Lenis isn't ready yet
      window.scrollTo(0, 0);
    }
  }, [pathname, lenisRef]);

  return null;
}
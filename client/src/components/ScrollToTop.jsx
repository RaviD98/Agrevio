import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    // This forces scroll to top whenever pathname changes
window.scrollTo(0, 0);
  }, [pathname]);

  return null;
};

export default ScrollToTop;

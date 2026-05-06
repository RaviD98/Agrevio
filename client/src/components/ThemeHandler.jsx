import { useEffect, useState } from "react";

const ThemeHandler = () => {
  const [darkMode, setDarkMode] = useState(
    () => localStorage.getItem("theme") === "light"
  );

  useEffect(() => {
    const root = document.documentElement;
    if (darkMode) {
      root.classList.add("light");
      localStorage.setItem("theme", "light");
    } else {
      root.classList.remove("light");
      localStorage.setItem("theme", "dark");
    }
  }, [darkMode]);

  return null;
};

export default ThemeHandler;

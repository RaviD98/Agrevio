// src/components/ThemeHandler.jsx
import { useEffect, useState } from "react";

const ThemeHandler = () => {
  const [darkMode, setDarkMode] = useState(
    () => localStorage.getItem("theme") === "dark"
  );

  useEffect(() => {
    const root = document.documentElement;
    if (darkMode) {
      root.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      root.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [darkMode]);

  // You can expose setDarkMode via context if you want toggle button elsewhere
  return null;
};

export default ThemeHandler;

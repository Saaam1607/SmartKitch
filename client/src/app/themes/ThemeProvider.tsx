"use client";

import React, { createContext, useState, useContext, useEffect } from "react";

import { themes } from "./themes";

const ThemeContext = createContext({
  themeName: "light", setThemeName: (_: string) => {}
});

export const ThemeProvider: React.FC = ({ children }) => {
  const [themeName, setThemeName] = useState("light");

  // cache
  useEffect(() => {
    const cachedTheme = localStorage.getItem("themeName");
    if (cachedTheme && cachedTheme in themes) {
      setThemeName(cachedTheme);
      
    }
  }, []);

  useEffect(() => {
    const root = document.documentElement;
    const vars = themes[themeName];
    Object.entries(vars).forEach(([key, value]) => {
      root.style.setProperty(key, value);
    });

    //cache
    localStorage.setItem("themeName", themeName);

  }, [themeName]);

  return (
    <ThemeContext.Provider value={{ themeName, setThemeName }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);

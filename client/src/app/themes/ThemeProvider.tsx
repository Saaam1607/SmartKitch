"use client";

import React, { createContext, useState, useContext, useEffect } from "react";

import { themes } from "./themes";

type ThemeName = keyof typeof themes;

type ThemeContextType = {
  themeName: ThemeName;
  setThemeName: React.Dispatch<React.SetStateAction<ThemeName>>;
};

const ThemeContext = createContext<ThemeContextType>({
  themeName: "light",
  setThemeName: () => {},
});

export const ThemeProvider: React.FC<React.PropsWithChildren> = ({ children }) => {
  const [themeName, setThemeName] = useState<ThemeName>("light");

  // cache
  useEffect(() => {
    const cachedTheme = localStorage.getItem("themeName") as ThemeName;
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

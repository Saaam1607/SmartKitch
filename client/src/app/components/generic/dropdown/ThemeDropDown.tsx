"use client";

import Dropdown from "./Dropdown";

import { useTheme } from "../../../themes/ThemeProvider";
import { themes } from "../../../themes/themes";

type ThemeName = keyof typeof themes;

interface ThemeDropDownProps {
  iconComponent: React.ReactNode,
}

export default function ThemeDropDown({ iconComponent } : ThemeDropDownProps) {

  const { themeName, setThemeName } = useTheme();

  const dataList: ThemeName[] = [
    "light",
    "dark",
    "solarized",
    "pastel",
    "twilight"
  ];

  function handleClick(item: ThemeName) {
    setThemeName(item);
  }

  return (
    <div style={{ position: 'relative'}} >
      <Dropdown
        iconComponent={iconComponent}
        dataList={dataList}
        onItemClick={handleClick}
      />
    </div>
  );
}

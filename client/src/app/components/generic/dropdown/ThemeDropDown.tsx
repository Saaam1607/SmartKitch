"use client";

import Dropdown from "./Dropdown";

import { useTheme } from "../../../themes/ThemeProvider";

interface ThemeDropDownProps {
  iconComponent: React.ReactNode,
}

export default function ThemeDropDown({ iconComponent } : ThemeDropDownProps) {

  const { themeName, setThemeName } = useTheme();

  const dataList: string[] = [
    "light",
    "dark",
    "solarized",
    "pastel",
    "twilight"
  ];

  function handleClick(item: string) {
    if (dataList.includes(item)) {
      setThemeName(item);
    }
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

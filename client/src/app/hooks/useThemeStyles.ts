import { useTheme } from "../themes/ThemeProvider";
import { themes } from "../themes/themes";

export function useThemeStyles() {
  const { themeName } = useTheme();
  const currentTheme = themes[themeName];

  return {
    bgColor: currentTheme["--bg-color"],
    textColor: currentTheme["--text-color"],
    toolbarBg: currentTheme["--toolbar-bg"],
  };
}

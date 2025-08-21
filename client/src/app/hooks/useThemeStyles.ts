import { useTheme } from "../themes/ThemeProvider";
import { themes } from "../themes/themes";

export function useThemeStyles() {
  const { themeName } = useTheme();
  const currentTheme = themes[themeName];

  return {
    bgColor: currentTheme["--bg-color"],
    textColor: currentTheme["--text-color"],
    toolbarBg: currentTheme["--toolbar-bg"],
    editColor: currentTheme["--edit-color"],
    deleteColor: currentTheme["--delete-color"],
    saveColor: currentTheme["--save-color"],
    undoColor: currentTheme["--undo-color"],
    mainCardBg: currentTheme["--main-card-bg"],
    mainCardEditingBg: currentTheme["--main-card-editing-bg"],
    cardsContainerBg: currentTheme["--cards-container-bg"],
    filtersContainerBg: currentTheme["--filters-container-bg"],
  };
}

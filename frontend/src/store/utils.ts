export const applyThemeClasses = (darkMode: boolean) => {
  if (darkMode) {
    document.body.className = "dark text-foreground bg-background";
  } else {
    document.body.className = "light text-foreground bg-background";
  }
};

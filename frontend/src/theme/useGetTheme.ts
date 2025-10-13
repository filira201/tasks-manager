import { useContext } from "react";
import { ThemeContext } from "./context";

export const useGetTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useGetTheme must be used within a Provider");
  }
  return context;
};

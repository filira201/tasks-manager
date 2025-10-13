import {
  useCallback,
  useEffect,
  useMemo,
  useState,
  type FC,
  type ReactNode,
} from "react";
import { ThemeContext } from "./context";

interface ThemeConextProviderProps {
  children: ReactNode;
}

function useLocalStorage<T>(
  key: string,
  initialValue: T
): [T, React.Dispatch<React.SetStateAction<T>>] {
  const getStoredValue = (): T => {
    const storedValue = localStorage.getItem(key);
    return storedValue ? JSON.parse(storedValue) : initialValue;
  };

  const [value, setValue] = useState<T>(getStoredValue);

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value));
  }, [value, key]);

  return [value, setValue];
}

export const ThemeConextProvider: FC<ThemeConextProviderProps> = ({
  children,
}) => {
  const [darkMode, setDarkMode] = useLocalStorage<boolean>("darkMode", false);

  const toggleTheme = useCallback(() => {
    setDarkMode((mode) => !mode);
  }, [setDarkMode]);

  const contextValue = useMemo(
    () => ({ toggleTheme, darkMode }),
    [darkMode, toggleTheme]
  );

  useEffect(() => {
    if (darkMode) {
      document.documentElement.setAttribute("data-theme", "dark");
      document.body.className = "dark text-foreground bg-background";
    } else {
      document.documentElement.removeAttribute("data-theme");
      document.body.className = "light text-foreground bg-background";
    }
  }, [darkMode]);

  return (
    <ThemeContext.Provider value={contextValue}>
      {children}
    </ThemeContext.Provider>
  );
};

import { Switch } from "@heroui/react";
import { FaRegMoon } from "react-icons/fa";
import { LuSunMedium } from "react-icons/lu";

import { toggleTheme } from "../model/themeSlice";

import { useAppDispatch, useAppSelector } from "@/shared/lib/hooks";

export const ThemeSwitch = () => {
  const darkMode = useAppSelector((state) => state.theme.darkMode);
  const dispatch = useAppDispatch();

  const handleToggleMode = () => {
    dispatch(toggleTheme());
  };

  return (
    <Switch
      isSelected={!darkMode}
      onValueChange={handleToggleMode}
      endContent={<LuSunMedium />}
      startContent={<FaRegMoon />}
      size="lg"
    />
  );
};

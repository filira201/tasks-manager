import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  NavbarMenu,
  NavbarMenuItem,
  NavbarMenuToggle,
  Switch,
} from "@heroui/react";
import classNames from "classnames";
import { useCallback, useState } from "react";
import { FaRegMoon } from "react-icons/fa";
import { LuSunMedium } from "react-icons/lu";
import { Link, NavLink } from "react-router";

import { toggleTheme } from "@/features/theme";
import { useAppDispatch, useAppSelector } from "@/shared/lib/hooks";

const BRAND_LINK_PROPS = {
  to: "/",
  "aria-label": "Перейти на главнаю страницу",
  className: "font-bold text-large transition-colors hover:text-foreground-500",
} as const;

export const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const darkMode = useAppSelector((state) => state.theme.darkMode);
  const dispatch = useAppDispatch();

  const handleMenuClose = useCallback(() => {
    setIsMenuOpen(false);
  }, []);

  const handleToggleMode = useCallback(() => {
    dispatch(toggleTheme());
  }, [dispatch]);

  return (
    <Navbar disableAnimation isBordered isBlurred={false} isMenuOpen={isMenuOpen} onMenuOpenChange={setIsMenuOpen}>
      <NavbarContent className="sm:hidden" justify="start">
        <NavbarMenuToggle className="cursor-pointer" aria-label={isMenuOpen ? "Закрыть меню" : "Открыть меню"} />
        <NavbarBrand>
          <Link {...BRAND_LINK_PROPS} onClick={handleMenuClose}>
            TM
          </Link>
        </NavbarBrand>
      </NavbarContent>

      <NavbarContent className="hidden sm:flex" justify="start">
        <NavbarBrand>
          <Link {...BRAND_LINK_PROPS}>TM</Link>
        </NavbarBrand>
      </NavbarContent>

      <NavbarContent justify="end">
        <NavbarItem className="hidden sm:block">
          <NavLink
            to="/task/new"
            className={({ isActive }) =>
              classNames("font-medium text-lg transition-colors hover:text-blue-600", {
                "text-blue-500": isActive,
              })
            }
          >
            Создать задачу
          </NavLink>
        </NavbarItem>
        <NavbarItem>
          <Switch
            isSelected={!darkMode}
            onValueChange={handleToggleMode}
            endContent={<LuSunMedium />}
            startContent={<FaRegMoon />}
            size="lg"
          />
        </NavbarItem>
      </NavbarContent>

      <NavbarMenu className="flex">
        <NavbarMenuItem>
          <NavLink
            to="/task/new"
            onClick={handleMenuClose}
            className={({ isActive }) =>
              classNames("font-medium text-lg transition-colors hover:text-blue-600", {
                "text-blue-500": isActive,
              })
            }
          >
            Создать задачу
          </NavLink>
        </NavbarMenuItem>
      </NavbarMenu>
    </Navbar>
  );
};

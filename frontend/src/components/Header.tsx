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
import { useState } from "react";
import { FaRegMoon } from "react-icons/fa";
import { LuSunMedium } from "react-icons/lu";
import { Link, NavLink } from "react-router";

import { toggleTheme, useAppDispatch, useAppSelector } from "@/store";

export const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const darkMode = useAppSelector((state) => state.theme.darkMode);
  const dispatch = useAppDispatch();

  const handleMenuClose = () => {
    setIsMenuOpen(false);
  };

  const handleToggleMode = () => {
    dispatch(toggleTheme());
  };

  return (
    <Navbar disableAnimation isBordered isBlurred={false} isMenuOpen={isMenuOpen} onMenuOpenChange={setIsMenuOpen}>
      <NavbarContent className="sm:hidden" justify="start">
        <NavbarMenuToggle className="cursor-pointer" aria-label={isMenuOpen ? "Закрыть меню" : "Открыть меню"} />
        <NavbarBrand>
          <Link
            onClick={handleMenuClose}
            aria-label="Перейти на главнаю страницу"
            to="/"
            className="font-bold text-large transition-colors hover:text-foreground-500"
          >
            TM
          </Link>
        </NavbarBrand>
      </NavbarContent>

      <NavbarContent className="hidden sm:flex" justify="start">
        <NavbarBrand>
          <Link
            aria-label="Перейти на главнаю страницу"
            to="/"
            className="font-bold text-large transition-colors hover:text-foreground-500"
          >
            TM
          </Link>
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

      <NavbarMenu className="flex items-center">
        <NavbarMenuItem>
          <NavLink
            to="/task/new"
            onClick={() => setIsMenuOpen(false)}
            className={({ isActive }) =>
              classNames("font-medium text-large transition-colors hover:text-blue-500", {
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

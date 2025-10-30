import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  NavbarMenu,
  NavbarMenuItem,
  NavbarMenuToggle,
} from "@heroui/react";
import { useCallback, useState } from "react";

import { BrandLink } from "./BrandLink";
import { NavLinksList } from "./NavLinkList";

import { ThemeSwitch } from "@/features/theme";

export const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleMenuClose = useCallback(() => {
    setIsMenuOpen(false);
  }, []);

  return (
    <Navbar disableAnimation isBordered isBlurred={false} isMenuOpen={isMenuOpen} onMenuOpenChange={setIsMenuOpen}>
      <NavbarContent className="sm:hidden" justify="start">
        <NavbarMenuToggle className="cursor-pointer" aria-label={isMenuOpen ? "Закрыть меню" : "Открыть меню"} />
        <NavbarBrand>
          <BrandLink brandText="TM" onClick={handleMenuClose} />
        </NavbarBrand>
      </NavbarContent>

      <NavbarContent className="hidden sm:flex" justify="start">
        <NavbarBrand>
          <BrandLink brandText="TM" />
        </NavbarBrand>
      </NavbarContent>

      <NavbarContent justify="end">
        <NavbarItem className="hidden sm:block">
          <NavLinksList />
        </NavbarItem>
        <NavbarItem>
          <ThemeSwitch />
        </NavbarItem>
      </NavbarContent>

      <NavbarMenu className="flex">
        <NavbarMenuItem>
          <NavLinksList onClick={handleMenuClose} />
        </NavbarMenuItem>
      </NavbarMenu>
    </Navbar>
  );
};

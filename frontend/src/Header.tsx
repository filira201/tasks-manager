import {
  Button,
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  NavbarMenu,
  NavbarMenuItem,
  NavbarMenuToggle,
  Switch,
} from "@heroui/react";
import { useGetTheme } from "./theme/useGetTheme";
import { useState } from "react";

export const Header = () => {
  const { darkMode, toggleTheme } = useGetTheme();
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);

  return (
    <Navbar
      isBordered
      isBlurred={false}
      isMenuOpen={isMenuOpen}
      onMenuOpenChange={setIsMenuOpen}
    >
      <NavbarContent className="lg:hidden" justify="start">
        <NavbarMenuToggle
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
        />
        <NavbarBrand>
          <p className="font-bold text-inherit">Social Network</p>
        </NavbarBrand>
      </NavbarContent>

      <NavbarBrand className="hidden lg:flex">
        <p className="font-bold text-inherit">Social Network</p>
      </NavbarBrand>
      <NavbarContent justify="end">
        <NavbarItem>
          <Switch
            isSelected={!darkMode}
            onValueChange={toggleTheme}
            size="lg"
          />
        </NavbarItem>

        <NavbarItem className="hidden lg:flex">
          <Button color="default" variant="flat" className="gap-2">
            <span>Выйти</span>
          </Button>
        </NavbarItem>
      </NavbarContent>

      <NavbarMenu className="flex items-center">
        <NavbarMenuItem>
          <Button color="default" variant="flat" className="gap-2">
            <span>Выйти</span>
          </Button>
        </NavbarMenuItem>
      </NavbarMenu>
    </Navbar>
  );
};

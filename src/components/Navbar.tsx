"use client";

import React from "react";

import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  Link,
  Button,
  NavbarMenu,
  NavbarMenuItem,
  NavbarMenuToggle,
} from "@nextui-org/react";
import { AcmeLogo } from "./utils/Acme";
import { usePathname } from "next/navigation";
import logo from "@/images/mylogo.png";
import Image from "next/image";

export default function App() {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  const menuItems = ["Home", "Projects"];
  const pathName = usePathname();

  return (
    <Navbar onMenuOpenChange={setIsMenuOpen} className="pt-4">
      <NavbarContent>
        <NavbarMenuToggle
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          className="sm:hidden"
        />
        <NavbarBrand>
          <Image alt="logo" height={90} width={90} src={logo} />
        </NavbarBrand>
      </NavbarContent>

      <NavbarContent className="hidden sm:flex gap-8" justify="center">
        {pathName === "/" ? (
          <>
            {" "}
            <NavbarItem isActive>
              <Link href="/" aria-current="page">
                Home
              </Link>
            </NavbarItem>
            <NavbarItem>
              <Link href="/projects" color="foreground">
                Projects
              </Link>
            </NavbarItem>
          </>
        ) : (
          <>
            <NavbarItem>
              <Link href="/" color="foreground">
                Home
              </Link>
            </NavbarItem>
            <NavbarItem isActive>
              <Link href="/projects" aria-current="page">
                Projects
              </Link>
            </NavbarItem>
          </>
        )}
      </NavbarContent>
      <NavbarContent justify="end">
        <NavbarItem className="text-white">
          <Button
            as={Link}
            id="contact-link"
            className="mr-4 bg-primaryColor text-[#fff] px-4 py-2 rounded-[23px] hover:text-primaryColor hover:bg-[#fff] duration-300 border border-solid hover:border-primaryColor"
            href="https://www.upwork.com/freelancers/~01ba206336c9c09675"
            variant="flat"
          >
            Contact Me
          </Button>
        </NavbarItem>
      </NavbarContent>
      <NavbarMenu>
        {menuItems.map((item, index) => (
          <NavbarMenuItem key={`${item}-${index}`}>
            <Link
              color={
                index === 2
                  ? "primary"
                  : index === menuItems.length - 1
                  ? "danger"
                  : "foreground"
              }
              className="w-full"
              href={item === "Home" ? "/" : "/projects"}
              size="lg"
            >
              {item}
            </Link>
          </NavbarMenuItem>
        ))}
      </NavbarMenu>
    </Navbar>
  );
}

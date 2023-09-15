"use client";

import { Button, Navbar } from "flowbite-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import logo from "@/images/mylogo.png";
import Image from "next/image";

export default function NavbarMenu() {
  const pathName = usePathname();

  return (
    <Navbar rounded id="nav">
      <Navbar.Brand href="/">
        <Image alt="logo" height={90} width={90} src={logo} />
      </Navbar.Brand>
      <div className="flex md:order-2">
        <Link
          href="https://www.upwork.com/freelancers/~01ba206336c9c09675"
          className="mr-4 bg-primaryColor text-white px-4 py-2 rounded-[23px] hover:text-primaryColor hover:bg-white duration-300 border border-solid hover:border-primaryColor"
        >
          Contact Me
        </Link>
        <Navbar.Toggle />
      </div>
      <Navbar.Collapse>
        <Navbar.Link
          href="/"
          className={`${
            pathName === "/" && "text-primaryColor"
          } font-bold text-[17px]`}
        >
          Home
        </Navbar.Link>
        <Navbar.Link
          href="/projects"
          className={`${
            pathName === "/projects" && "text-primaryColor"
          } font-bold text-[17px]`}
        >
          Projects
        </Navbar.Link>
      </Navbar.Collapse>
    </Navbar>
  );
}

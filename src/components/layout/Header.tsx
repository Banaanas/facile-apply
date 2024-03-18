"use client";

import { Route } from "next";
import Link from "next/link";
import { usePathname } from "next/navigation";

import { appRoutes } from "@/data/app-routes";

const Header = () => {
  const navItems = Object.values(appRoutes);

  return (
    <header>
      <nav>
        <ul className="flex gap-x-2">
          {navItems.map((navItem) => {
            return <NavItem {...navItem} key={navItem.href as string} />;
          })}
        </ul>
      </nav>
    </header>
  );
};

export default Header;

interface NavItemProps<T extends string> {
  name: string;
  href: Route<T> | URL;
}

const NavItem = <T extends string>({ name, href }: NavItemProps<T>) => {
  if (href === usePathname()) return null;

  return (
    <li>
      <Link href={href} className="underline">
        {name}
      </Link>
    </li>
  );
};

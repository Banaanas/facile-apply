"use client";

import { Route } from "next";
import Link from "next/link";
import { usePathname } from "next/navigation";

import { appRoutes } from "@/data/app-routes";
import { globalMaxWidth } from "@app/styles/common-styles";
import { MaxWidthWrapper } from "@components/MaxWidthWrapper";

const Header = () => {
  const pathname = usePathname();

  const navItems = Object.values(appRoutes);
  const pageTitle = getPageTitle(pathname);

  return (
    <header>
      <MaxWidthWrapper
        maxWidth={globalMaxWidth}
        className="flex w-full justify-center items-center flex-col gap-y-2 py-4 px-8 lg:px-2"
      >
        <nav>
          <ul className="flex gap-x-2">
            {navItems.map((navItem) => {
              return <NavItem {...navItem} key={navItem.href as string} />;
            })}
          </ul>
        </nav>
        <h1 className="text-xl md:text-4xl font-bold text-blue-400 text-center">
          {pageTitle}
        </h1>
      </MaxWidthWrapper>
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

const getPageTitle = (pathname: string) => {
  if (pathname.includes("/indeed/jobs")) return "Indeed Job Results";
  if (pathname.includes("/linkedin/jobs")) return "Linkedin Job Results";
  if (pathname.includes("/linkedin/posts")) return "Linkedin Posts Results";
};

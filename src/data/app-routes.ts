import { Route } from "next";

export const appRoutes: AppRoutes = {
  indeed: {
    name: "Indeed",
    href: "/indeed",
  },

  linkedin: {
    name: "Linkedin",
    href: "/linkedin",
  },
};

interface AppRoutes {
  [key: string]: AppRoute;
}

interface AppRoute<T extends string = string> {
  name: string;
  href: Route<T> | URL;
}

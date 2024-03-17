export const appRoutes: AppRoutes = {
  indeed: {
    name: "Indeed",
    href: "/indeed",
  },

  linkedin: {
    name: "LinkedIn",
    href: "/linkedin",
  },
};

interface AppRoutes {
  [key: string]: AppRoute;
}

interface AppRoute {
  name: string;
  href: string;
}

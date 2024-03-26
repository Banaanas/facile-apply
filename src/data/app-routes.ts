import { Route } from "next";

export const appRoutes: AppRoutes = {
  indeed: {
    name: "Indeed",
    href: "/indeed",
  },

  linkedinJobs: {
    name: "Linkedin Jobs",
    href: "/linkedin/jobs",
  },

  linkedinPosts: {
    name: "Linkedin Posts",
    href: "/linkedin/posts",
  },

  statistics: {
    name: "Statistics",
    href: "/statistics",
  },
};

interface AppRoutes {
  [key: string]: AppRoute;
}

interface AppRoute<T extends string = string> {
  name: string;
  href: Route<T> | URL;
}

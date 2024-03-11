import { CountryUrls } from "@/scripts/scripts.types";

export const canadaUrls: CountryUrls["CA"] = {
  domain: "ca.indeed.com",
  searches: {
    "next-js": {
      query: "next.js",
      dateFilter: 3,
      remoteFilter: true,
    },
    react: {
      query: "react",
      dateFilter: 3,
      remoteFilter: true,
    },
    "ui-developer": {
      query: "UI developer",
      dateFilter: 14,
      remoteFilter: true,
    },
    "ux-developer": {
      query: "UX developer",
      dateFilter: 1,
      remoteFilter: true,
    },
    "css-in-js": {
      query: "css-in-js",
      dateFilter: 14,
      remoteFilter: true,
    },
  },
};

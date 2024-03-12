import { CountryUrls } from "@/scripts/fetch-jobs/fetch-jobs.types";

export const canadaUrls: CountryUrls["CA"] = {
  domain: "ca.indeed.com",
  searches: {
    "front-end": {
      query: "front end",
      dateFilter: 1,
      remoteFilter: true,
    },
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

    "web-developer": {
      query: "Web developer",
      dateFilter: 1,
      remoteFilter: true,
    },
  },
};

import { CountryUrls } from "@/scripts/indeed/fetch-jobs/fetch-jobs.types";

export const usUrls: CountryUrls["US"] = {
  domain: "www.indeed.com",
  searches: {
    "next-js": {
      query: "next.js",
      dateFilter: 1,
      remoteFilter: true,
    },
    react: {
      query: "react",
      dateFilter: 1,
      remoteFilter: true,
    },
    "ui-developer": {
      query: "Ui Developer",
      dateFilter: 1,
      remoteFilter: true,
    },
    "ux-developer": {
      query: "UX Developer",
      dateFilter: 1,
      remoteFilter: true,
    },
  },
};

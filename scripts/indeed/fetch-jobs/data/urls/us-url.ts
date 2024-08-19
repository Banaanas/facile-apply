import { CountryUrls } from "@/scripts/indeed/fetch-jobs/fetch-jobs.types";

export const usUrls: CountryUrls["US"] = {
  domain: "www.indeed.com",
  searches: {
    "next-js": {
      query: "next.js",
      remoteFilter: true,
    },
/*     react: {
      query: "react",
      remoteFilter: true,
    }, */
    "ui-developer": {
      query: "Ui Developer",
      remoteFilter: true,
    },
    "ux-developer": {
      query: "UX Developer",
      remoteFilter: true,
    },
  },
};

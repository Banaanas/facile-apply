import { CountryUrls } from "@/scripts/indeed/fetch-jobs/fetch-jobs.types";

export const switzerlandUrls: CountryUrls["CH"] = {
  domain: "ch.indeed.com",
  searches: {
    "next-js": {
      query: "next.js",
      remoteFilter: true,
    },
    react: {
      query: "react",
      remoteFilter: true,
    },
    "integrateur-web": {
      query: "integrateur web",
      remoteFilter: true,
    },
  },
};

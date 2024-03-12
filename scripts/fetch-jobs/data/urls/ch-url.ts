import { CountryUrls } from "@/scripts/fetch-jobs/fetch-jobs.types";

export const switzerlandUrls: CountryUrls["CH"] = {
  domain: "ch.indeed.com",
  searches: {
    "next-js": {
      query: "next.js",
      dateFilter: 10,
      remoteFilter: true,
    },
    react: {
      query: "react",
      dateFilter: 7,
      remoteFilter: true,
    },
    "integrateur-web": {
      query: "integrateur web",
      dateFilter: 1,
      remoteFilter: true,
    },
  },
};

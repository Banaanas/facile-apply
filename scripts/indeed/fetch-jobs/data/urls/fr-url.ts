import { CountryUrls } from "@/scripts/indeed/fetch-jobs/fetch-jobs.types";

export const franceUrls: CountryUrls["FR"] = {
  domain: "fr.indeed.com",
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
    "developpeur-ui": {
      query: "développeur ui",
      remoteFilter: false,
    },
    "developpeur-ux": {
      query: "développeur ux",
      remoteFilter: true,
    },
  },
};

import { CountryUrls } from "@/scripts/indeed/fetch-jobs/fetch-jobs.types";

export const franceUrls: CountryUrls["FR"] = {
  domain: "fr.indeed.com",
  searches: {
    "next-js": {
      query: "next.js",
      remoteFilter: false,
    },
    "next-js-2": {
      query: "next.js",
      remoteFilter: false,
      location: "Rhône-Alpes",
    },
    react: {
      query: "react",
      remoteFilter: true,
    },
    "react-2": {
      query: "react",
      remoteFilter: false,
      location: "Rhône-Alpes",
    },
    "integrateur-web": {
      query: "integrateur web",
      remoteFilter: true,
    },
    "developpeur-ui": {
      query: "développeur ui",
      remoteFilter: false,
    },
    "developpeur-ui-2": {
      query: "développeur ui",
      remoteFilter: false,
      location: "Rhône-Alpes",
    },
    "developpeur-ux": {
      query: "développeur ux",
      remoteFilter: true,
    },
  },
};

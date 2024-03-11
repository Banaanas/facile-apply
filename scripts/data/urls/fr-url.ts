import { CountryUrls } from "@/scripts/scripts.types";

export const franceUrls: CountryUrls["FR"] = {
  domain: "fr.indeed.com",
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
      dateFilter: 5,
      remoteFilter: true,
    },
    "developpeur-ui": {
      query: "développeur ui",
      dateFilter: 10,
      remoteFilter: false,
    },
    "developpeur-ux": {
      query: "développeur ux",
      dateFilter: 3,
      remoteFilter: true,
    },
    "css-in-js": {
      query: "css-in-js",
      dateFilter: 10,
      remoteFilter: false,
    },
  },
};

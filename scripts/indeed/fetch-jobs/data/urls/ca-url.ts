import { CountryUrls } from "@/scripts/indeed/fetch-jobs/fetch-jobs.types";

export const canadaUrls: CountryUrls["CA"] = {
  domain: "ca.indeed.com",
  searches: {
    "front-end": {
      query: "front end",
      remoteFilter: true,
    },
    "next-js": {
      query: "next.js",
      remoteFilter: true,
    },
    react: {
      query: "react",
      remoteFilter: true,
    },
    "ui-developer": {
      query: "UI developer",
      remoteFilter: true,
    },
    "ux-developer": {
      query: "UX developer",
      remoteFilter: true,
    },
    "web-developer": {
      query: "Web developer",
      remoteFilter: true,
    },
  },
};

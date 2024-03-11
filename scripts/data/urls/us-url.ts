import { CountryUrls } from "@/scripts/scripts.types";

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
    "css-in-js": {
      query: "css-in-js",
      dateFilter: 14, // Assuming 14 days filter as mentioned in the provided URL
      remoteFilter: false,
    },
  },
};

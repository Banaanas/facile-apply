import { CountryUrls } from "@/scripts/fetch-jobs/fetch-jobs.types";

export const canadaUrls: CountryUrls["CA"] = {
  domain: "ca.indeed.com",
  searches: {
    react: {
      query: "react",
      remoteFilter: true,
    },
  },
};

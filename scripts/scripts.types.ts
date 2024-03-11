import { IndeedJob } from "@prisma/client";

// Indeed Job
export type ScrapedIndeedJob = Omit<IndeedJob, "id" | "link"> & {
  thirdPartyApplyUrl: string;
};

export type TransformedScrapedIndeedJob = Omit<IndeedJob, "id">;

// URL Builder
interface Search {
  query: string;
  dateFilter: number;
  remoteFilter: boolean;
}

export type Country = "CA" | "CH" | "FR" | "US";
type USSearchKeys =
  | "next-js"
  | "react"
  | "ui-developer"
  | "ux-developer"
  | "css-in-js";
type CASearchKeys =
  | "next-js"
  | "react"
  | "ui-developer"
  | "front-end"
  | "web-developer";
type CHSearchKeys = "next-js" | "react" | "integrateur-web";
type FRSearchKeys =
  | "next-js"
  | "react"
  | "developpeur-ui"
  | "developpeur-ux"
  | "css-in-js";

export type CountryUrls = {
  US: {
    domain: string;
    searches: {
      [key in USSearchKeys]: Search;
    };
  };
  CA: {
    domain: string;
    searches: {
      [key in CASearchKeys]: Search;
    };
  };
  CH: {
    domain: string;
    searches: {
      [key in CHSearchKeys]: Search;
    };
  };
  FR: {
    domain: string;
    searches: {
      [key in FRSearchKeys]: Search;
    };
  };
};

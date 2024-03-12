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

type CASearchKeys =
  | "front-end"
  | "next-js"
  | "ui-developer"
  | "ux-developer"
  | "react"
  | "web-developer";
type CHSearchKeys = "integrateur-web" | "react" | "next-js";

type FRSearchKeys =
  | "developpeur-ui"
  | "integrateur-web"
  | "next-js"
  | "react"
  | "developpeur-ux";

type USSearchKeys = "next-js" | "react" | "ui-developer" | "ux-developer";

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

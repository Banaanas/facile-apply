import { IndeedJob } from "@prisma/client";

// Indeed Job
export type ScrapedIndeedJob = Omit<IndeedJob, "id" | "link"> & {
  thirdPartyApplyUrl: string;
};

export type TransformedScrapedIndeedJob = Omit<IndeedJob, "id">;

// URL Builder
export interface Search {
  query: string;
  location?: string;
  remoteFilter: boolean;
}

export type Country = "CH" | "FR";

type CASearchKeys =
  | "front-end"
  | "next-js"
  | "ui-developer"
  | "ux-developer"
  | "react"
  | "web-developer";

type CHSearchKeys = "integrateur-web" | "react" | "next-js";

type FRSearchKeys =
  | "next-js"
  | "next-js-2"
  | "react"
  | "react-2"
  | "integrateur-web"
  | "developpeur-ui"
  | "developpeur-ui-2"
  | "developpeur-ux";

type USSearchKeys = "next-js" | "ui-developer" | "ux-developer";

type GenericSearchKeys = "react" | "next-js";

export type CountryUrls = {
  US: {
    domain: string;
    searches: {
      [key in USSearchKeys]: Search;
    };
  };
  /*   CA: {
    domain: string;
    searches: {
      [key in CASearchKeys]: Search;
    };
  }; */
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
} & OtherCountryUrls<"DK" | "FI" | "NL" | "NO" | "SE">;

// Define a generic type for other countries (e.g., European countries)
export type OtherCountryUrls<C extends string> = {
  [key in C]: {
    domain: string;
    searches: {
      [key in GenericSearchKeys]: Search;
    };
  };
};

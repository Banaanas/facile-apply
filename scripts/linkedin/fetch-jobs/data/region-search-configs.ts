import { WorkplaceType } from "@/scripts/linkedin/fetch-jobs/data/linkedin-search-enums";

export const SEARCH_CONFIGURATIONS: SearchConfigurations = {
  France: {
    geoId: "105015875",
    keywords: ["next.js", "react", "Intégrateur Web"],
    applyWithLinkedin: false,
  },
  Europe: {
    geoId: "91000000",
    keywords: ["next.js", "react", "Intégrateur Web"],
  },
  Suisse: {
    geoId: "106693272",
    keywords: ["next.js", "react"],
  },
  USA: {
    geoId: "103644278",
    keywords: ["next.js", "react"],
  },
  Canada: {
    geoId: "101174742",
    keywords: ["next.js", "react"],
  },
  /*   World: {
    geoId: "92000000",
    keywords: ["React Developer", "UI developer", "UX developer"],
  }, */
};

interface SearchRegionConfiguration {
  geoId: string;
  keywords: Array<string>;
  applyWithLinkedin?: boolean;
  earlyApplicant?: boolean;
  workplaceType?: WorkplaceType;
}

export interface SearchConfigurations {
  [key: string]: SearchRegionConfiguration;
}

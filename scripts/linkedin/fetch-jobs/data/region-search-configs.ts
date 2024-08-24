import { WorkplaceType } from "@/scripts/linkedin/fetch-jobs/data/linkedin-search-enums";

export const SEARCH_CONFIGURATIONS: SearchConfigurations = {
  France: {
    geoId: "105015875",
    keywords: ["next.js", "react", "developpeur UI", "intégrateur Web"],
    workplaceType: WorkplaceType.Remote,
    applyWithLinkedin: false,
    lessThan10Candidatures: false,
  },
  "Rhone-Alpes": {
    geoId: "101018157",
    keywords: ["next.js", "react", "developpeur UI", "intégrateur Web"],
    applyWithLinkedin: false,
    lessThan10Candidatures: true,
  },
  Europe: {
    geoId: "91000000",
    keywords: ["next.js", "react", "intégrateur Web"],
    workplaceType: WorkplaceType.Remote,
    applyWithLinkedin: false,
    lessThan10Candidatures: true,
  },
  Suisse: {
    geoId: "106693272",
    keywords: ["next.js", "react"],
    workplaceType: WorkplaceType.Remote,
    applyWithLinkedin: false,
    lessThan10Candidatures: false,
  },
  USA: {
    geoId: "103644278",
    keywords: ["next.js"],
    workplaceType: WorkplaceType.Remote,
    applyWithLinkedin: false,
    lessThan10Candidatures: true,
  },
  Canada: {
    geoId: "101174742",
    keywords: ["next.js"],
    workplaceType: WorkplaceType.Remote,
    applyWithLinkedin: false,
    lessThan10Candidatures: true,
  },
  /*   World: {
    geoId: "92000000",
    keywords: ["React Developer", "UI developer", "UX developer"],
  }, */
};

interface SearchRegionConfiguration {
  geoId: string;
  keywords: Array<string>;
  applyWithLinkedin: boolean;
  workplaceType?: WorkplaceType;
  lessThan10Candidatures: boolean;
}

export interface SearchConfigurations {
  [key: string]: SearchRegionConfiguration;
}

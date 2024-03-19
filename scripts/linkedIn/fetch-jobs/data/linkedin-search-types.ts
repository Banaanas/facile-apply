interface SearchRegionConfiguration {
  geoId: string;
  keywords: Array<string>;
}

export interface SearchConfigurations {
  [key: string]: SearchRegionConfiguration;
}

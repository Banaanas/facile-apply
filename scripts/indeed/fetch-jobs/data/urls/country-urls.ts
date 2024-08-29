import { switzerlandUrls } from "@/scripts/indeed/fetch-jobs/data/urls/ch-url";
import { franceUrls } from "@/scripts/indeed/fetch-jobs/data/urls/fr-url";
import { usUrls } from "@/scripts/indeed/fetch-jobs/data/urls/us-url";
import { CountryUrls } from "@/scripts/indeed/fetch-jobs/fetch-jobs.types";
import {
  denmarkUrls,
  finlandUrls,
  netherlandsUrls,
  norwayUrls,
  swedenUrls,
} from "@/scripts/indeed/fetch-jobs/data/urls/other-countries-url";

export const countryUrls: CountryUrls = {
  // CA: canadaUrls,
  CH: switzerlandUrls,
  FR: franceUrls,
  US: usUrls,

  DK: denmarkUrls,
  FI: finlandUrls,
  NL: netherlandsUrls,
  NO: norwayUrls,
  SE: swedenUrls,
};

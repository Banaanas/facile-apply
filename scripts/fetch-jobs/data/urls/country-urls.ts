import { canadaUrls } from "@/scripts/fetch-jobs/data/urls/ca-url";
import { switzerlandUrls } from "@/scripts/fetch-jobs/data/urls/ch-url";
import { franceUrls } from "@/scripts/fetch-jobs/data/urls/fr-url";
import { usUrls } from "@/scripts/fetch-jobs/data/urls/us-url";
import { CountryUrls } from "@/scripts/fetch-jobs/fetch-jobs.types";

export const countryUrls: CountryUrls = {
  CA: canadaUrls,
  CH: switzerlandUrls,
  FR: franceUrls,
  US: usUrls,
};

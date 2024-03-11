import { canadaUrls } from "@/scripts/data/urls/ca-url";
import { switzerlandUrls } from "@/scripts/data/urls/ch-url";
import { franceUrls } from "@/scripts/data/urls/fr-url";
import { usUrls } from "@/scripts/data/urls/us-url";
import { CountryUrls } from "@/scripts/scripts.types";

export const countryUrls: CountryUrls = {
  CA: canadaUrls,
  CH: switzerlandUrls,
  FR: franceUrls,
  US: usUrls,
};

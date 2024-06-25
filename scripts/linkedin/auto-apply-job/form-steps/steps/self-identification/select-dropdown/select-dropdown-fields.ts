import { Page } from "playwright";

import { selectOptionFromDropdown } from "@/scripts/linkedin/auto-apply-job/form-steps/steps/self-identification/select-dropdown/select-dropdown-option";

export const handleGenderField = async (
  page: Page,
  formControlIdentifier: string,
) => {
  if (!formControlIdentifier.toLowerCase().includes("gender")) return;

  console.log("Handling Gender Field");
  await selectOptionFromDropdown(page, "Gender", "Male");
};

export const handleRaceField = async (
  page: Page,
  formControlIdentifier: string,
) => {
  if (!formControlIdentifier.toLowerCase().includes("race")) return;

  console.log("Handling Race Field");
  await selectOptionFromDropdown(page, "Race/Ethnicity", "Two or More Races");
};

export const handleVeteranStatusField = async (
  page: Page,
  formControlIdentifier: string,
) => {
  if (!formControlIdentifier.toLowerCase().includes("veteran")) return;

  console.log("Handling Veteran Status Field");
  await selectOptionFromDropdown(
    page,
    "Veteran Status",
    "I am not a protected veteran",
  );
};

export const handleDisabilityStatusField = async (
  page: Page,
  formControlIdentifier: string,
) => {
  if (!formControlIdentifier.toLowerCase().includes("disability")) return;

  console.log("Handling Disability Status Field");
  await selectOptionFromDropdown(
    page,
    "Disability Status",
    "No, I do not have a disability and have not had one in the past",
  );
};

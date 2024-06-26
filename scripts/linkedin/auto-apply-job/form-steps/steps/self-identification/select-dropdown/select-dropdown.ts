import { Page } from "playwright";

import {
  handleDisabilityStatusField,
  handleGenderField,
  handleRaceField,
  handleVeteranStatusField,
} from "@/scripts/linkedin/auto-apply-job/form-steps/steps/self-identification/select-dropdown/select-dropdown-fields";

export const handleSelectDropdown = async (
  page: Page,
  formControlIdentifier: string,
) => {
  await handleGenderField(page, formControlIdentifier);
  await handleRaceField(page, formControlIdentifier);
  await handleVeteranStatusField(page, formControlIdentifier);
  await handleDisabilityStatusField(page, formControlIdentifier);
};

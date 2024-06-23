import { Page } from "playwright";

import { clickSubmitFormStep } from "@/scripts/linkedin/auto-apply-job/form-steps/utils/click-next-send-button";
import { uncheckFollowCompany } from "@/scripts/linkedin/auto-apply-job/form-steps/utils/uncheck-follow-company";

export const handleCheckApplicationStep = async (page: Page) => {
  console.log("Handling Check Application Step");

  await uncheckFollowCompany(page);
  await clickSubmitFormStep(page);
};

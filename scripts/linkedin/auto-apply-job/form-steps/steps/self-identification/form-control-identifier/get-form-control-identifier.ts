// Helper function to get the label text or group title
import { ElementHandle } from "playwright";

import { getClosestGroupTitle } from "@/scripts/linkedin/auto-apply-job/form-steps/steps/self-identification/form-control-identifier/get-group-title";

export const getFormControlIdentifier = async (
  formControlContainer: ElementHandle,
): Promise<string> => {
  let labelText = await formControlContainer
    .$eval("label span", (node) => (node as HTMLElement).innerText)
    .catch(() => null);

  if (!labelText) {
    labelText = await formControlContainer
      .$eval("legend span", (node) => (node as HTMLElement).innerText)
      .catch(() => null);
  }

  if (!labelText) {
    labelText = await getClosestGroupTitle(formControlContainer);
  }

  return (labelText || "Unknown").trim();
};

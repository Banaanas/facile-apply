import colors from "colors";
import { ElementHandle, Page } from "playwright";

import { handleInputField } from "@/scripts/linkedin/auto-apply-job/form-steps/steps/self-identification/input";
import { handleRadioButtonFieldset } from "@/scripts/linkedin/auto-apply-job/form-steps/steps/self-identification/radio-buttons";
import { handleSelectFieldset } from "@/scripts/linkedin/auto-apply-job/form-steps/steps/self-identification/select-dropdown";
import { clickSubmitFormStep } from "@/scripts/linkedin/auto-apply-job/form-steps/utils/click-next-send-button";

export const handleSelfIdentificationStep = async (page: Page) => {
  console.log("Handling Self Identification Step");

  // Iterate over each form section and handle the inputs dynamically
  const formElementContainers = await page.$$(
    ".jobs-easy-apply-form-section__grouping",
  );

  for (const container of formElementContainers) {
    const radioButtonFieldset = await container.$("fieldset");
    const selectDropdown = await container.$("select");
    const inputField = await container.$("input");

    // Get the closest group title for the current section
    const groupTitle = await getClosestGroupTitle(container);
    console.log("Found group title:", groupTitle);

    if (radioButtonFieldset) {
      await handleRadioButtonFieldset(page, container, radioButtonFieldset);
    }

    // Check if the section contains a select dropdown
    if (selectDropdown) {
      const labelText = await container.$eval(
        "label span",
        (node) => (node as HTMLElement).innerText,
      );
      await handleSelectFieldset(page, labelText);
    }

    // Check if the section contains an input field
    if (inputField) {
      await handleInputField(container, groupTitle);
    }
  }

  await clickSubmitFormStep(page);
};

const getClosestGroupTitle = async (
  container: ElementHandle,
): Promise<string> => {
  console.log(colors.cyan("Starting search for group title..."));

  // Start with the previous sibling of the container
  let siblingNode = await container.evaluateHandle(
    (node) => node.previousElementSibling,
  );

  while (siblingNode) {
    // Check if the sibling is another form element container
    const isFormElementContainer = await siblingNode.evaluate((node) => {
      return node.classList.contains("jobs-easy-apply-form-section__grouping");
    });

    if (isFormElementContainer) {
      console.log(
        colors.cyan("Encountered another form element, stopping search."),
      );
      break;
    }

    // Check if the sibling is the group title
    const isGroupTitle = await siblingNode.evaluate(
      (node) =>
        node.tagName.toLowerCase() === "span" &&
        node.classList.contains("jobs-easy-apply-form-section__group-title"),
    );

    if (isGroupTitle) {
      const titleText = await siblingNode.evaluate(
        (node) => node.textContent || "",
      );
      return titleText;
    }

    // Move to the previous sibling
    siblingNode = await siblingNode.evaluateHandle(
      (node) => node.previousElementSibling,
    );
  }
  const noTitleFoundMessage = "No group title found";
  console.log(colors.cyan(noTitleFoundMessage));
  return noTitleFoundMessage;
};

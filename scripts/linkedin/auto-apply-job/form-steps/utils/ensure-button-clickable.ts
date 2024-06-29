import { Page } from "playwright";

// Without these lines, the following button's click doesn't seem to work
export const ensureNextButtonIsClickable = async (
  page: Page,
  labelType: "buttonText" | "ariaLabelText",
  labelText: string = "Suivant",
) => {
  let nextButton;

  // Check the type of label and find the button accordingly
  if (labelType === "buttonText") {
    nextButton = await page.$(`text='${labelText}'`);
  } else if (labelType === "ariaLabelText") {
    nextButton = await page.$(`[aria-label='${labelText}']`);
  }

  if (nextButton) {
    await nextButton.scrollIntoViewIfNeeded();
  } else {
    console.error(`Next button with text '${labelText}' not found`);
  }
};

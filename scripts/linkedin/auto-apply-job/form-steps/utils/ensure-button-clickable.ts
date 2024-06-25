import { Page } from "playwright";

export const ensureNextButtonIsClickable = async (
  page: Page,
  buttonText: string = "Suivant",
) => {
  // Without these lines, the following button's click doesn't seem to work
  const nextButton = await page.$(`text='${buttonText}'`);
  if (nextButton) {
    await nextButton.scrollIntoViewIfNeeded();
  } else {
    console.error(`Next button with text '${buttonText}' not found`);
  }
};

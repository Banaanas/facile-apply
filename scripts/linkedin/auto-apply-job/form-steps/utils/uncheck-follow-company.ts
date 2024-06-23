import { createCursor } from "ghost-cursor-playwright";
import { Page } from "playwright";

// Uncheck the Follow Company button if it is already checked
export const uncheckFollowCompany = async (page: Page) => {
  // Selector for the checkbox and its label
  const checkboxSelector = "#follow-company-checkbox";
  const labelSelector = "label[for='follow-company-checkbox']";

  const cursor = await createCursor(page);

  // Check if the checkbox is checked
  const isChecked = await page.isChecked(checkboxSelector);

  if (isChecked) {
    // Move cursor to the label with human-like behavior
    await cursor.actions.move(labelSelector, {
      waitBeforeMove: [100, 150],
      waitForSelector: 3000,
    });

    // Click the label to uncheck the checkbox
    await page.click(labelSelector);
    console.log("Unchecked the 'Follow Company' checkbox");
  } else {
    console.log("'Follow Company' checkbox is already unchecked");
  }
};

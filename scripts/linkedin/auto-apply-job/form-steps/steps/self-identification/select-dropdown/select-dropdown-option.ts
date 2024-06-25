// Utility function to select an option from a dropdown
import { Page } from "playwright";

export const selectOptionFromDropdown = async (
  page: Page,
  labelSubstring: string,
  optionText: string,
) => {
  console.log(
    `Selecting Option from Dropdown for label containing: "${labelSubstring}"`,
  );


  console.log("LALALALALALALLALALALAL");

  // Try to find the label element containing the substring
  const labelElements = await page.$$("label, legend");
  let selectId: string | null = null;

  for (const labelElement of labelElements) {
    const labelText = await labelElement.innerText();
    if (labelText.toLowerCase().includes(labelSubstring.toLowerCase())) {
      selectId = await labelElement.getAttribute("for");
      break;
    }
  }

  if (selectId) {
    const selectSelector = `#${selectId}`;
    await page.selectOption(selectSelector, { label: optionText });
    console.log(`Option "${optionText}" selected in the dropdown.`);
  } else {
    console.warn(
      `Label element not found containing "${labelSubstring}". Trying a different approach.`,
    );

    // Fallback: Search for the select element directly if no matching label is found
    const selectElements = await page.$$("select");
    for (const selectElement of selectElements) {
      const options = await selectElement.$$("option");
      for (const option of options) {
        const optionValue = await option.getAttribute("value");
        if (
          optionValue &&
          optionValue.toLowerCase().includes(optionText.toLowerCase())
        ) {
          console.log(
            `Found matching option "${optionText}" in a select element.`,
          );
          await selectElement.selectOption({ label: optionText });
          return;
        }
      }
    }

    console.error(
      `No matching option found for "${optionText}" in any select element.`,
    );
  }
};

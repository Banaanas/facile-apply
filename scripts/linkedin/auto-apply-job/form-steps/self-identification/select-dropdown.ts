import { ElementHandle, Page } from "playwright";

const selectOptionFromDropdown = async (
  page: Page,
  labelText: string,
  optionText: string,
) => {
  const labelSelector = `label:has-text("${labelText}")`;
  const labelElement = await page.$(labelSelector);
  if (labelElement) {
    const selectId = await labelElement.getAttribute("for");
    if (selectId) {
      const selectSelector = `#${selectId}`;
      await page.selectOption(selectSelector, { label: optionText });
    } else {
      console.error(`Select ID not found for label ${labelText}`);
    }
  } else {
    console.error(`Label element not found for ${labelText}`);
  }
};

const handleGenderField = async (page: Page, labelText: string) => {
  if (!labelText.includes("Gender - Gender, Race and Ethnicity")) return;
  await selectOptionFromDropdown(
    page,
    "Gender - Gender, Race and Ethnicity",
    "Male",
  );
};

const handleRaceField = async (page: Page, labelText: string) => {
  if (!labelText.includes("Race/Ethnicity - Gender, Race and Ethnicity"))
    return;
  await selectOptionFromDropdown(
    page,
    "Race/Ethnicity - Gender, Race and Ethnicity",
    "Two or More Races",
  );
};

export const handleSelectFieldset = async (
  page: Page,
  section: ElementHandle,
  labelText: string,
) => {
  await handleGenderField(page, labelText);
  await handleRaceField(page, labelText);
};

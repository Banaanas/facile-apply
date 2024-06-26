import { ElementHandle } from "playwright";

export const checkIfDateField = async (
  inputField: ElementHandle,
): Promise<boolean> => {
  const inputPlaceholder = await inputField.getAttribute("placeholder");
  return inputPlaceholder ? inputPlaceholder.includes("jj/mm/aaaa") : false;
};

// Helper function to check if today's date is being asked
export const isAskingForTodaysDate = (groupTitle: string): boolean => {
  return groupTitle.includes("Today's date");
};

// Helper function to fill today's date
export const fillTodaysDate = async (inputField: ElementHandle): Promise<void> => {
  const currentDate = new Date().toLocaleDateString("fr-FR");
  await inputField.fill(currentDate);
};

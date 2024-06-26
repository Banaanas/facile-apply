import { ElementHandle } from "playwright";

export const isDateField = async (
  inputField: ElementHandle,
): Promise<boolean> => {
  const inputPlaceholder = await inputField.getAttribute("placeholder");
  return inputPlaceholder ? inputPlaceholder.includes("jj/mm/aaaa") : false;
};

// Helper function to check if today's date is being asked
export const isAskingForTodaysDate = (groupTitle: string): boolean => {
  return groupTitle.includes("Today's date");
};

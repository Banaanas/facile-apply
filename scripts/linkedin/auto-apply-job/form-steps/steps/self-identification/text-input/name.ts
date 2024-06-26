import { ElementHandle } from "playwright";
import { cyrilPersonalInfo } from "@/scripts/indeed/auto-apply-job/data/gpt/profile/personal-info";

// Helper function to identify if the input field is for "Your Name"
export const isNameField = async (label: ElementHandle): Promise<boolean> => {
  const labelText = await label.innerText();
  return labelText.includes("Your Name");
};

// Helper function to fill "Your Name"
export const fillNameField = async (
  inputField: ElementHandle,
): Promise<void> => {
  await inputField.fill(
    `${cyrilPersonalInfo.name} ${cyrilPersonalInfo.firstName}`,
  );
};

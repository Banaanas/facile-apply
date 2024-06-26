import console from "node:console";

import colors from "colors";
import { ElementHandle } from "playwright";

import { cyrilSkills } from "@/scripts/indeed/auto-apply-job/data/gpt/profile/skills";
import { getLabelForElement } from "@/scripts/linkedin/auto-apply-job/form-steps/steps/additional-questions/get-element-label";

export const handleTextInput = async (
  formControlContainer: ElementHandle,
): Promise<void> => {
  const inputField = await formControlContainer.$("input");

  if (inputField) {
    const labelText = await getLabelForElement(
      formControlContainer,
      inputField,
    );

    if (!labelText) {
      console.log(colors.yellow("Label text not found. Skipping input field."));
      return;
    }

    // Identify if the label includes specific keywords related to work experience
    if (isYearsOfExperienceQuestion(labelText)) {
      const lowerCaseLabel = labelText.toLowerCase();

      // Check if the label includes any of our skills or technologies
      for (const skill of cyrilSkills) {
        if (lowerCaseLabel.includes(skill)) {
          await inputField.fill("3");
          return;
        }
      }
    }

    // If not a predefined keyword, use the ChatGPT function
    const chatGPTResponse = await dummyChatGPTFunction(labelText);
    await inputField.type(chatGPTResponse);
  }
};

const checkIfAlreadyAnswered = async (
  inputField: ElementHandle,
): Promise<boolean> => {
  const value = await inputField.evaluate(
    (el) => (el as HTMLInputElement).value,
  );
  return value.trim().length > 0;
};

const isYearsOfExperienceQuestion = (labelText: string): boolean => {
  const keywords = [
    "years of work experience",
    "experience years",
    "years experience",
    "years",
    "expérience",
    "année",
  ];
  const lowerCaseLabel = labelText.toLowerCase();
  return keywords.some((keyword) => lowerCaseLabel.includes(keyword));
};

// Dummy ChatGPT function to handle other questions
const dummyChatGPTFunction = async (labelText: string): Promise<string> => {
  console.log(`Calling ChatGPT for label: ${labelText}`);
  // Simulate the response from ChatGPT
  return "Dummy ChatGPT Response";
};

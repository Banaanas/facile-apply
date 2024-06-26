import console from "node:console";

import colors from "colors";
import { ElementHandle } from "playwright";

import { getLabelForElement } from "@/scripts/linkedin/auto-apply-job/form-steps/steps/additional-questions/get-element-label";

export const handleTextInput = async (
  formControlContainer: ElementHandle,
  predefinedAnswers: { [key: string]: string },
  chatGPTFunction: (labelText: string) => Promise<string>,
): Promise<void> => {
  const inputField = await formControlContainer.$("input");

  if (inputField) {
    const labelText = await getLabelForElement(
      formControlContainer,
      inputField,
    );
    console.log("LABEL TEXT", labelText);

    // Check if the input field already has an answer
    const alreadyAnswered = await checkIfAlreadyAnswered(inputField);
    if (alreadyAnswered) {
      console.log(colors.green("Input already filled. It will be skipped."));
      return;
    }

    // Identify if the label includes specific keywords
    const lowerCaseLabel = labelText.toLowerCase();
    for (const keyword in predefinedAnswers) {
      if (lowerCaseLabel.includes(keyword)) {
        await inputField.type(predefinedAnswers[keyword]);
        return;
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

// Dummy ChatGPT function to handle other questions
const dummyChatGPTFunction = async (labelText: string): Promise<string> => {
  console.log(`Calling ChatGPT for label: ${labelText}`);
  // Simulate the response from ChatGPT
  return "Dummy ChatGPT Response";
};

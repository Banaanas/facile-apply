import { ElementHandle, Page } from "playwright";

import { generateAnswer } from "@/scripts/indeed/auto-apply-job/url-handlers.ts/pages/question-utilities";
import { getLabelForElement } from "@/scripts/linkedin/auto-apply-job/form-steps/steps/additional-questions/get-element-label";
import {
  handleYearsOfExperienceQuestion,
  isYearsOfExperienceQuestion,
} from "@/scripts/linkedin/auto-apply-job/form-steps/steps/additional-questions/questions/years-experience-question";

export const handleTextInput = async (
  page: Page,
  formControlContainer: ElementHandle<SVGElement | HTMLElement>,
): Promise<void> => {
  const inputField = await formControlContainer.$("input");
  if (!inputField) return;

  const labelText = await getLabelForElement(formControlContainer, inputField);
  if (!labelText) {
    console.log("Label text not found. Skipping input field.".yellow);
    return;
  }

  // Identify if the label includes specific keywords related to work experience
  if (isYearsOfExperienceQuestion(labelText)) {
    await handleYearsOfExperienceQuestion(page, inputField, labelText);
    return;
  }

  // If not a predefined keyword, use the ChatGPT function
  await generateGPTAnswer(formControlContainer, labelText);
};

// Dummy ChatGPT function to handle other questions
const generateGPTAnswer = async (
  formControlContainer: ElementHandle<SVGElement | HTMLElement>,
  labelText: string,
) => {
  const textInput = await formControlContainer.$("input[type='text']");
  const prompt = `Here is the question: "${labelText}". Please provide a clear, short, and concise answer, no more than 1 line. If the question is related to a number, answer with just the number. If it requires a text answer, keep it to a few words at most.`;

  const answer = await generateAnswer(prompt);
  await textInput?.fill(answer);
};

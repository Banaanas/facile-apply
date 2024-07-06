import chalk from "chalk";
import { ElementHandle } from "playwright";

import { generateAnswer } from "@/scripts/indeed/auto-apply-job/url-handlers.ts/pages/question-utilities";

export const handleTextAreaInput = async (
  formControlContainer: ElementHandle<SVGElement | HTMLElement>,
) => {
  const textArea = await formControlContainer.$("textarea");
  const labelText = await getTextAreaLabel(formControlContainer);
  if (!labelText) {
    console.log(chalk.yellow("Label text not found. Skipping input field."));
    return;
  }

  const prompt = `Here is the question: "${labelText}". Please provide a clear, short, and concise answer, no more than 5 lines.`;
  const answer = await generateAnswer(prompt);
  await textArea?.fill(answer);
};

export const getTextAreaLabel = async (
  formControlContainer: ElementHandle<SVGElement | HTMLElement>,
) => {
  // Select the textarea within the formControlContainer
  const textArea = await formControlContainer.$("textarea");

  // Check if textarea is found
  if (!textArea) {
    throw new Error("Textarea not found in the provided formControlContainer");
  }

  // Get the ID of the textarea
  const textAreaId = await textArea.getAttribute("id");

  // Check if the textarea has an ID
  if (!textAreaId) {
    throw new Error("Textarea does not have an ID attribute");
  }

  // Use the ID to find the associated label
  const label = await formControlContainer.$(`label[for='${textAreaId}']`);

  // Check if label is found
  if (!label) {
    throw new Error("Label not found for the textarea");
  }

  // Get the text content of the label
  const labelText = await label.textContent();

  return labelText;
};

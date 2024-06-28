import { ElementHandle } from "playwright";

import { gptInstructions } from "@/scripts/indeed/auto-apply-job/data/gpt/gpt-instructions";
import {
  initialGPTContext,
  openai,
} from "@/scripts/indeed/auto-apply-job/url-handlers.ts/pages/openai-setup";

export const generateAnswer = async (question: string): Promise<string> => {
  const instructionContext = gptInstructions.join(" ");

  const response = await openai.chat.completions.create({
    model: "gpt-4",
    messages: [
      {
        role: "system",
        content: `${instructionContext} ${initialGPTContext}`,
      },
      {
        role: "user",
        content: question,
      },
    ],
  });

  const { content } = response.choices[0].message;

  return content ? content.trim() : "";
};

export const radioInputQuestionPrompt = async (
  formControlContainer: ElementHandle<SVGElement | HTMLElement>,
) => {
  const questionText = await formControlContainer.$eval(
    "legend",
    (el) => el.textContent?.trim() ?? "",
  );
  const optionsText = await formControlContainer.$$eval("label", (labels) =>
    labels.map((label) => label.textContent?.trim() ?? ""),
  );

  const prompt = `Question: ${questionText}.Based on the options, which should be selected? Provide the exact option text, case-sensitive, with no additional words or punctuation. The answer must be one of the options provided. Chose one of those following options: ${optionsText.join(", ")}. `;

  return prompt;
};

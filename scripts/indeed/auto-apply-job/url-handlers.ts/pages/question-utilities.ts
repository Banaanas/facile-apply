import { ElementHandle } from "playwright";

import { gptInstructions } from "@/scripts/indeed/auto-apply-job/data/gpt/gpt-instructions";
import {
  initialGPTContext,
  openai,
} from "@/scripts/indeed/auto-apply-job/url-handlers.ts/pages/openai-setup";

export const generateAnswer = async (question: string): Promise<string> => {
  const instructionContext = gptInstructions.join(" ");

  const response = await openai.chat.completions.create({
    model: "gpt-3.5-turbo",
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

  console.log(content);
  return content ? content.trim() : "";
};

export const formulatePrompt = async (
  container: ElementHandle<SVGElement | HTMLElement>,
) => {
  const questionText = await container.$eval(
    "legend",
    (el) => el.textContent?.trim() ?? "",
  );
  const optionsText = await container.$$eval("label", (labels) =>
    labels.map((label) => label.textContent?.trim() ?? ""),
  );

  const prompt = `Question: ${questionText} Options: ${optionsText.join(", ")}. Based on the options, which should be selected?`;

  return prompt;
};

export const generateDecision = async (prompt: string) => {
  // Call GPT-3 with the prompt
  const gptResponse = await generateAnswer(prompt); // Implement this function to query GPT-3

  return gptResponse.trim();
};

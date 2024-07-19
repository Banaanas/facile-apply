import chalk from "chalk";

import { gptInstructions } from "@/scripts/indeed/auto-apply-job/data/gpt/gpt-instructions";
import { cyrilPersonalInfo } from "@/scripts/indeed/auto-apply-job/data/gpt/profile/personal-info";
import {
  initialGPTContext,
  openai,
} from "@/scripts/indeed/auto-apply-job/url-handlers.ts/pages/openai-setup";
import { gptModel } from "@/scripts/config";

const getMailInstructions = (): string => {
  return `You are assisting in responding to LinkedIn posts. Based on the content provided, detect its language, and generate a response structured as a JSON object with 'subject' and 'content' fields. Response should be in the same language as the post. The 'subject' should be a concise title for the email. The 'content' should be an HTML-formatted snippet with the following structure: begin with a paragraph discussing the sender's interest and qualifications. Follow this with a separate paragraph specifically stating to review the attached CV and visit the sender's portfolio at ${cyrilPersonalInfo.websites.portfolio}. Ensure that the salutation (e.g., 'Best regards') is formatted in bold on a new line, followed by the sender's first name (Cyril) in bold on another new line. Place only one line break between the last content paragraph and the salutation. Do not include any personal contact details like email or location in the content. Use HTML tags such as <p>, <strong>, and <br> appropriately to format and structure the content.`;
};

export const generateEmailResponse = async (
  postSummary: string,
): Promise<{ emailSubject: string; emailContent: string; emailTo: string }> => {
  const emailTo = extractEmailAddress(postSummary);

  // Abort the process if no email address is extracted
  if (!emailTo) {
    console.log(chalk.red("No email address found in the post summary."));
    throw new Error("No email address found. Aborting email dispatch process.");
  }

  const mailInstructions = getMailInstructions();
  const instructionContext = gptInstructions.join(" ");

  const response = await openai.chat.completions.create({
    model: gptModel,
    messages: [
      {
        role: "system",
        content: `${mailInstructions} ${instructionContext} ${initialGPTContext}`,
      },
      {
        role: "user",
        content: postSummary,
      },
    ],
  });

  // Check if `message.content` is `null` before parsing
  if (!response.choices[0].message.content) {
    throw new Error("Received null content from OpenAI");
  }

  // Extract the JSON-like output assuming the model adheres to the instruction
  const output: EmailOutput = JSON.parse(response.choices[0].message.content);

  const emailSubject = output.subject;
  const emailContent = `
        <html>
            <body>
                <p>${output.content}</p>
            </body>
        </html>
    `;

  return { emailSubject, emailContent, emailTo };
};

const extractEmailAddress = (text: string): string | null => {
  const emailRegex = /[\w.-]+@[\w.-]+\.\w+/;
  const match = text.match(emailRegex);
  return match ? match[0] : null;
};

interface EmailOutput {
  subject: string;
  content: string;
}

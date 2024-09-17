import chalk from "chalk";

import { gptInstructions } from "@/scripts/indeed/auto-apply-job/data/gpt/gpt-instructions";
import { cyrilPersonalInfo } from "@/scripts/indeed/auto-apply-job/data/gpt/profile/personal-info";
import {
  initialGPTContext,
  openai,
} from "@/scripts/indeed/auto-apply-job/url-handlers.ts/pages/openai-setup";
import { extractEmailAddress } from "@lib/utils";
import { profileSummary } from "@/scripts/indeed/auto-apply-job/data/gpt/profile/profile";

const getMailInstructions = (): string => {
  return `You are assisting in responding to LinkedIn posts. Based on the content provided, detect its language and generate a response structured as a JSON object with 'subject' and 'content' fields. The response should be in the same language as the post.

The email response should:
1. Begin with a polite greeting (e.g., 'Hi').
2. Follow with a concise 'subject' for the email that serves as a title.
3. In the 'content', include an HTML-formatted snippet with the following structure:
   - Start with a paragraph discussing the sender's genuine interest and relevant qualifications based on their actual professional background. **Do not invent experiences or skills**.
   - Use the following brief overview of the sender's professional background to guide the response: ${profileSummary}.
   - Follow this with a separate paragraph specifically stating to review the attached CV and to visit the sender's portfolio at ${cyrilPersonalInfo.websites.portfolio}.
   - Mention that the sender is located in France but works very efficiently remotely, so location is not an issue.
4. Ensure that the salutation (e.g., 'Best regards') is formatted in bold on a new line, followed by the sender's first name (Cyril) in bold on another new line. Place only one line break between the last content paragraph and the salutation.

Format the 'content' using appropriate HTML tags like <p>, <strong>, and <br> to structure it properly. Avoid including any personal contact details such as email or location in the content.`;
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
    model: "gpt-4o",
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

  // Ensure response content is present
  if (!response.choices[0].message.content) {
    throw new Error("Received null content from OpenAI");
  }

  // Clean the response to remove code block markers and other non-JSON text
  const cleanedContent = response.choices[0].message.content
    .replace(/```json/g, "") // Remove start of code block
    .replace(/```/g, ""); // Remove end of code block

  let output: EmailOutput;

  try {
    output = JSON.parse(cleanedContent); // Parse the cleaned JSON content
  } catch (error) {
    console.error("Failed to parse JSON:", error);
    throw new Error("Invalid JSON format received from OpenAI");
  }

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

interface EmailOutput {
  subject: string;
  content: string;
}

import chalk from "chalk";
import nodemailer from "nodemailer";

import { gmailConfig } from "@/scripts/config";
import { getPdfResume } from "@/scripts/linkedin/auto-answer-post/get-pdf-resume";
import { missingVarMessage } from "@/scripts/utils/console/console-messages";

export const sendEmail = async (
  toEmail: string,
  subject: string,
  htmlContent: string,
): Promise<void> => {
  const transporter = createTransporter();

  // Read resume file as a buffer
  const resumeBuffer: Buffer = await getPdfResume();

  // Define mail options
  const mailOptions: EmailOptions = {
    from: `"Cyril Développeur" <${process.env.GMAIL_USER}>`,
    to: toEmail,
    subject,
    html: htmlContent,
    attachments: [
      {
        filename: "Resume_Cyril.pdf",
        content: resumeBuffer,
      },
    ],
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    console.log(chalk.green("Email sent successfully:"), info);
  } catch (error) {
    console.error(chalk.red("Error sending email:"), error);
  }
};

const createTransporter = () => {
  const { user: gmailUser, facileApplyPassword: gmailFacileApplyPassword } =
    gmailConfig;

  if (!gmailUser || !gmailFacileApplyPassword) {
    throw new Error(missingVarMessage);
  }

  return nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: gmailUser,
      pass: gmailFacileApplyPassword,
    },
  });
};

interface EmailOptions {
  from: string;
  to: string;
  subject: string;
  html: string;
  attachments: Array<{
    filename: string;
    content: Buffer;
  }>;
}

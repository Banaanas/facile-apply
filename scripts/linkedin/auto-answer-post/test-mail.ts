import colors from "colors";
import { Resend } from "resend";
import nodemailer from "nodemailer";
import { gmailConfig } from "@/scripts/config";

const {
  clientId,
  clientSecret,
  refreshToken,
  redirectUri,
  user,
  gmailFacileApplyPassword,
} = gmailConfig;

const apiKey = "re_BSFoVQyu_9ESkXgA4ajbRJkmHfjXSDyyt";
const appGmailPassword = "vfjw wnrj wozq ciwj";
const resend = new Resend(apiKey);
a;

const sendEmails = async () => {
  // Create reusable transporter object using SMTP transport
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "cyrilodev@gmail.com",
      pass: appGmailPassword,
    },
  });

  // Setup email data
  const mailOptions = {
    from: '"Your Name" <your-gmail-email@gmail.com>', // sender address
    to: "diaphane69@gmail.com", // list of receivers
    subject: "Hello World", // Subject line
    text: "Hello world?", // plain text body
    html: "<strong>It works!</strong>", // html body
  };

  // Send mail with defined transport object
  try {
    const info = await transporter.sendMail(mailOptions);
    console.log(colors.green("Email sent successfully:"), info);
  } catch (error) {
    console.error(colors.red("Error sending email:"), error);
  }
};

const main = async () => {
  console.log(colors.cyan("Starting email dispatch..."));
  await sendEmails();
  console.log(colors.rainbow("All emails have been sent!"));
};

main().catch((error) => {
  console.error(
    colors.red("An error occurred during the email dispatch process:"),
    error,
  );
});

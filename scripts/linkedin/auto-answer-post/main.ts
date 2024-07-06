import chalk from "chalk";

import { updateLinkedinPostStatus } from "@/actions";
import { generateEmailResponse } from "@/scripts/linkedin/auto-answer-post/generate-mail";
import {
  fetchNotReviewedPosts,
  filterPostsWithEmails,
} from "@/scripts/linkedin/auto-answer-post/get-posts";
import { sendEmail } from "@/scripts/linkedin/auto-answer-post/send-mail";
import { checkDatabaseConnection } from "@/scripts/utils/check-ip-vp/check-running-database";

const main = async () => {
  console.log(chalk.cyan("Starting email dispatch..."));

  await checkDatabaseConnection();

  const posts = await fetchNotReviewedPosts();
  const postsWithEmails = filterPostsWithEmails(posts);

  for (const post of postsWithEmails) {
    const { emailSubject, emailContent, emailTo } = await generateEmailResponse(
      post.summary,
    );

    await sendEmail(emailTo, emailSubject, emailContent);
    await updateLinkedinPostStatus(post.id, "Applied");
  }

  console.log(chalk.bgMagentaBright.whiteBright("All emails have been sent!"));
};

main().catch((error) => {
  console.error(
    chalk.red("An error occurred during the email dispatch process:"),
    error,
  );
});

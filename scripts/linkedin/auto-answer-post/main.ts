import colors from "colors";

import { generateEmailResponse } from "@/scripts/linkedin/auto-answer-post/generate-mail";
import {
  fetchNotReviewedPosts,
  filterPostsWithEmails,
} from "@/scripts/linkedin/auto-answer-post/get-posts";
import { sendEmail } from "@/scripts/linkedin/auto-answer-post/send-mail";
import { updateLinkedinPostStatus } from "@/actions";

const main = async () => {
  console.log(colors.cyan("Starting email dispatch..."));

  const posts = await fetchNotReviewedPosts();
  const postsWithEmails = filterPostsWithEmails(posts);

  for (const post of postsWithEmails) {
    const { emailSubject, emailContent, emailTo } = await generateEmailResponse(
      post.summary,
    );

    await sendEmail(emailTo, emailSubject, emailContent);
    await updateLinkedinPostStatus(post.id, "Applied");
  }

  console.log(colors.rainbow("All emails have been sent!"));
};

main().catch((error) => {
  console.error(
    colors.red("An error occurred during the email dispatch process:"),
    error,
  );
});

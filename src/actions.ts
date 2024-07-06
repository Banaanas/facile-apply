"use server";

import { IndeedJob, LinkedinJob, LinkedinPost } from "@prisma/client";
import { prisma } from "@prisma/db.server";
import chalk from "chalk";
import { revalidatePath } from "next/cache";

import { appRoutes } from "@/data/app-routes";
import { IS_BROWSER_HEADLESS } from "@/scripts/indeed/auto-apply-job/data/params";
import { runIndeedPlaywrightSession } from "@/scripts/indeed/auto-apply-job/launch-browser/playwright-connection";
import { generateEmailResponse } from "@/scripts/linkedin/auto-answer-post/generate-mail";
import { sendEmail } from "@/scripts/linkedin/auto-answer-post/send-mail";
import { runLinkedinPlaywrightSession } from "@/scripts/linkedin/auto-apply-job/launch-browser/playwright-connection";

export const updateIndeedJobStatus = async (
  indeedJobId: IndeedJob["id"],
  newStatus: IndeedJob["status"],
) => {
  await prisma.indeedJob.update({
    where: { id: Number(indeedJobId) },
    data: { status: newStatus },
  });

  revalidatePath(appRoutes.indeed.href);
};

export const updateLinkedinJobStatus = async (
  linkedinJobId: LinkedinJob["id"],
  newStatus: LinkedinJob["status"],
) => {
  await prisma.linkedinJob.update({
    where: { id: linkedinJobId },
    data: { status: newStatus },
  });

  revalidatePath(appRoutes.linkedinJobs.href);
};

export const updateLinkedinPostStatus = async (
  linkedinPostId: LinkedinPost["id"],
  newStatus: LinkedinPost["status"],
) => {
  await prisma.linkedinPost.update({
    where: { id: linkedinPostId },
    data: { status: newStatus },
  });

  revalidatePath(appRoutes.linkedinPosts.href);
};

export const autoApplyIndeedJob = async (
  indeedJobLink: IndeedJob["link"],
  indeedJobId: IndeedJob["id"],
) => {
  try {
    await runIndeedPlaywrightSession(
      IS_BROWSER_HEADLESS,
      indeedJobLink,
      indeedJobId,
    );
  } catch (error) {
    console.error("An error occurred:", error);
  }
};

export const autoApplyLinkedinJob = async (
  linkedinJobLink: LinkedinJob["link"],
  linkedinJobId: LinkedinJob["id"],
) => {
  try {
    await runLinkedinPlaywrightSession(
      IS_BROWSER_HEADLESS,
      linkedinJobLink,
      linkedinJobId,
    );
  } catch (error) {
    console.error("An error occurred:", error);
  }
};

export const autoApplyLinkedinPost = async (linkedinPost: LinkedinPost) => {
  console.log(chalk.cyan("Starting email dispatch..."));

  try {
    const { emailSubject, emailContent, emailTo } = await generateEmailResponse(
      linkedinPost.summary,
    );

    console.log(chalk.cyan("Starting email sending..."));
    await sendEmail(emailTo, emailSubject, emailContent);
    await updateLinkedinPostStatus(linkedinPost.id, "Applied");

    console.log(
      chalk.bgMagentaBright.whiteBright(
        `Email has been sent to ${emailTo}. Post has been updated as Applied.`,
      ),
    );
  } catch (error) {
    console.error("An error occurred:", error);
  }

  revalidatePath(appRoutes.linkedinPosts.href);
};

"use server";

import { IndeedJob, LinkedinJob, LinkedinPost } from "@prisma/client";
import { prisma } from "@prisma/db.server";
import { revalidatePath } from "next/cache";

import { appRoutes } from "@/data/app-routes";
import { IS_BROWSER_HEADLESS } from "@/scripts/indeed/auto-apply-job/data/params";
import { runPlaywrightSession } from "@/scripts/indeed/auto-apply-job/launch-browser/playwright-connection";

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
    await runPlaywrightSession(IS_BROWSER_HEADLESS, indeedJobLink, indeedJobId);
  } catch (error) {
    console.error("An error occurred:", error);
  }
};

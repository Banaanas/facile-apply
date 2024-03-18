"use server";

import { IndeedJob, LinkedinJob } from "@prisma/client";
import { prisma } from "@prisma/db.server";
import { revalidatePath } from "next/cache";

import { appRoutes } from "@/data/app-routes";

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

  revalidatePath(appRoutes.linkedin.href);
};

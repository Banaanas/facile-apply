"use server";

import { IndeedJob, LinkedInJob } from "@prisma/client";
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

export const updateLinkedInJobStatus = async (
  linkedInJobId: LinkedInJob["id"],
  newStatus: LinkedInJob["status"],
) => {
  await prisma.linkedInJob.update({
    where: { id: linkedInJobId },
    data: { status: newStatus },
  });

  revalidatePath(appRoutes.linkedin.href);
};

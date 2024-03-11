"use server";

import { IndeedJob } from "@prisma/client";
import { prisma } from "@prisma/db.server";
import { revalidatePath } from "next/cache";

export async function updateJobStatus(
  indeedJobId: IndeedJob["id"],
  newStatus: IndeedJob["status"],
) {
  await prisma.indeedJob.update({
    where: { id: Number(indeedJobId) },
    data: { status: newStatus },
  });

  revalidatePath("/indeed");
}

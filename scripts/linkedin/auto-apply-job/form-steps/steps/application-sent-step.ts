import { LinkedinJob } from "@prisma/client";

import { updateLinkedinJobStatus } from "@/actions";

export const handleApplicationSent = async (
  linkedinJobId: LinkedinJob["id"],
) => {
  console.log("Handling Application Sending Step");

  await updateLinkedinJobStatus(linkedinJobId, "Applied");

  console.log(
    "Process has ben achieved and Job as been updated as Applied.".green,
  );
};

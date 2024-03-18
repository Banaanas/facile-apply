import { LinkedinJob } from "@prisma/client";

export type TransformedScrapedLinkedinJob = Omit<LinkedinJob, "id">;

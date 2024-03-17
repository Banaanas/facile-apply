import { LinkedInJob } from "@prisma/client";

export type TransformedScrapedLinkedInJob = Omit<LinkedInJob, "id">;

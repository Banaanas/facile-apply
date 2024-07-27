"use client";

import { autoApplyIndeedJob, autoApplyLinkedinJob } from "@/actions";
import { IndeedJob, LinkedinJob } from "@prisma/client";
import { Button } from "@components/ui/button";

const ApplyAllJobsButton = ({ allJobs, platform }: ApplyAllJobsButtonProps) => {
  const applyAllJobs = async () => {
    for (const job of allJobs) {
      try {
        if (platform === "linkedin") {
          await autoApplyLinkedinJob(job.link, job.id);
        } else if (platform === "indeed") {
          await autoApplyIndeedJob(job.link, job.id);
        }
        console.log(`Successfully applied to job ${job.id}`);
        // Optionally, update the job status to "Reviewed" here
      } catch (error) {
        console.error(`Error applying to job ${job.id}:`, error);
      }
    }
    console.log("All jobs have been processed");
  };

  return (
    <Button
      variant="outline"
      className="font-bold text-2xl"
      onClick={applyAllJobs}
    >
      Apply all Jobs
    </Button>
  );
};

export default ApplyAllJobsButton;

interface ApplyAllJobsButtonProps {
  allJobs: Array<IndeedJob | LinkedinJob>;
  platform: "linkedin" | "indeed";
}

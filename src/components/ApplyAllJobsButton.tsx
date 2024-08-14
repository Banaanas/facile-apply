"use client";

import { autoApplyIndeedJob, autoApplyLinkedinJob } from "@/actions";
import { IndeedJob, LinkedinJob } from "@prisma/client";
import { Button } from "@components/ui/button";

const ApplyAllJobsButton = ({ allJobs, platform }: ApplyAllJobsButtonProps) => {
  const applyLinkedinJob = async (job: LinkedinJob) => {
    if (!job.easyApply) return;

    await autoApplyLinkedinJob(job.link, job.id);
  };

  const applyIndeedJob = async (job: IndeedJob) => {
    if (!job.indeedApplyEnabled) return;

    await autoApplyIndeedJob(job.link, job.id);
  };

  const applyAllJobs = async () => {
    for (const job of allJobs) {
      try {
        if (platform === "linkedin" && isLinkedinJob(job)) {
          await applyLinkedinJob(job);
        } else if (platform === "indeed" && isIndeedJob(job)) {
          await applyIndeedJob(job);
        }
        console.log(`Successfully applied to job ${job.id}`);
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

const isIndeedJob = (job: IndeedJob | LinkedinJob): job is IndeedJob => {
  return (job as IndeedJob).indeedApplyEnabled !== undefined;
};

const isLinkedinJob = (job: IndeedJob | LinkedinJob): job is LinkedinJob => {
  return (job as LinkedinJob).easyApply !== undefined;
};

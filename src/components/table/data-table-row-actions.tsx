"use client";

import { statuses } from "@components/table/data/data";
import {
  indeedJobSchema,
  linkedinJobSchema,
  linkedinPostSchema,
} from "@components/table/data/zod-schema";
import { JobPlatform } from "@components/table/data-table/data-table";
import { Button } from "@components/ui/button";
import { $Enums, PostStatus } from "@prisma/client";
import { Row } from "@tanstack/react-table";
import { Edit } from "lucide-react";
import { useState } from "react";

import {
  updateIndeedJobStatus,
  updateLinkedinJobStatus,
  updateLinkedinPostStatus,
} from "@/actions";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import JobStatus = $Enums.JobStatus;

interface DataTableRowActionsProps<TData> {
  row: Row<TData>;
  jobPlatform: JobPlatform;
}

const DataTableRowActions = <TData,>({
  row,
  jobPlatform,
}: DataTableRowActionsProps<TData>) => {
  // Determine the type of the row and parse it accordingly
  let jobOrPost;
  let status;
  if (jobPlatform === "indeed") {
    jobOrPost = indeedJobSchema.parse(row.original);
    status = jobOrPost.status;
  } else if (jobPlatform === "linkedinJob") {
    jobOrPost = linkedinJobSchema.parse(row.original);
    status = jobOrPost.status;
  } else if (jobPlatform === "linkedinPost") {
    jobOrPost = linkedinPostSchema.parse(row.original);
    status = jobOrPost.status; // Assuming PostStatus is compatible or handled accordingly
  } else {
    throw new Error(`Unsupported job platform: ${jobPlatform}`);
  }

  const [currentStatus, setCurrentStatus] = useState<JobStatus | PostStatus>(
    status,
  );

  const handleOnValueChange = async (newStatus: JobStatus | PostStatus) => {
    switch (jobPlatform) {
      case "indeed":
        await updateIndeedJobStatus(jobOrPost.id, newStatus as JobStatus);
        break;
      case "linkedinJob":
        await updateLinkedinJobStatus(jobOrPost.id, newStatus as JobStatus);
        break;
      case "linkedinPost":
        await updateLinkedinPostStatus(jobOrPost.id, newStatus as PostStatus);
        break;
      default:
        // Handle unsupported job platform or throw an error
        break;
    }
    setCurrentStatus(newStatus);
  };

  // To prevent TS error, we had to convert the type to string
  const handleStringValueChange = async (value: string) => {
    // Assuming JobStatus and PostStatus are string enums
    const newStatus = value as JobStatus | PostStatus;
    await handleOnValueChange(newStatus);
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          className="flex justify-center items-center size-8 p-0 data-[state=open]:bg-muted"
        >
          <Edit className="size-4" />
          <span className="sr-only">Open menu</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-[160px]">
        <DropdownMenuRadioGroup
          value={status}
          onValueChange={handleStringValueChange}
        >
          {statuses.map(({ value, label }) => {
            return (
              <DropdownMenuRadioItem key={value} value={value}>
                {label}
              </DropdownMenuRadioItem>
            );
          })}
        </DropdownMenuRadioGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default DataTableRowActions;

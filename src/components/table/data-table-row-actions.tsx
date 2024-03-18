"use client";

import { statuses } from "@components/table/data/data";
import {
  indeedJobSchema,
  linkedinJobSchema,
} from "@components/table/data/zod-schema";
import { JobPlatform } from "@components/table/data-table/data-table-indeed";
import { Button } from "@components/ui/button";
import { $Enums } from "@prisma/client";
import { Row } from "@tanstack/react-table";
import { Edit } from "lucide-react";
import { useState } from "react";

import { updateIndeedJobStatus, updateLinkedinJobStatus } from "@/actions";
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
  const isIndeedType = jobPlatform === "indeed";
  const job = isIndeedType
    ? indeedJobSchema.parse(row.original)
    : linkedinJobSchema.parse(row.original);

  const [status, setStatus] = useState<JobStatus>(job.status);

  const handleOnValueChange = async (newStatus: JobStatus) => {
    if (jobPlatform === "indeed") {
      await updateIndeedJobStatus(job.id, newStatus as JobStatus);
    }

    if (jobPlatform === "linkedin") {
      await updateLinkedinJobStatus(job.id, newStatus as JobStatus);
    }

    setStatus(newStatus);
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          className="flex size-8 p-0 data-[state=open]:bg-muted"
        >
          <Edit className="size-4" />
          <span className="sr-only">Open menu</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-[160px]">
        <DropdownMenuRadioGroup
          value={status}
          onValueChange={handleOnValueChange}
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

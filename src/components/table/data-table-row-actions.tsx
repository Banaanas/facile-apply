"use client";

import { statuses } from "@components/table/data/data";
import { indeedJobSchema } from "@components/table/data/schema";
import { Button } from "@components/ui/button";
import { IndeedJob } from "@prisma/client";
import { Row } from "@tanstack/react-table";
import { Edit } from "lucide-react";
import { useState } from "react";

import { updateJobStatus } from "@/actions";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface DataTableRowActionsProps<TData> {
  row: Row<TData>;
}

const DataTableRowActions = <TData,>({
  row,
}: DataTableRowActionsProps<TData>) => {
  const indeedJob = indeedJobSchema.parse(row.original);
  const [status, setStatus] = useState<IndeedJob["status"]>(indeedJob.status);

  const handleOnValueChange = async (newStatus: IndeedJob["status"]) => {
    console.log(newStatus);
    console.log(indeedJob.id);

    await updateJobStatus(indeedJob.id, newStatus);
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

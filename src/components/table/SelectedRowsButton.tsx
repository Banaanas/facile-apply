import { statuses } from "@components/table/data/data";
import { JobPlatform } from "@components/table/data-table/data-table";
import { Button } from "@components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from "@components/ui/dropdown-menu";
import { JobStatus } from "@prisma/client";
import { Row } from "@tanstack/react-table";
import { Edit } from "lucide-react";

import { updateIndeedJobStatus, updateLinkedinJobStatus } from "@/actions";

const SelectedRowsButton = <TData,>({
  jobPlatform,
  selectedRows,
}: {
  jobPlatform: JobPlatform;
  selectedRows: Row<TData>[];
}) => {
  const handleEditRows = async (newStatus: JobStatus) => {


    console.log(jobPlatform);
    // Use map to create an array of promises for each update operation
    const updatePromises = selectedRows.map(async (row) => {
      const job = row.original; // Assuming row.original contains the job data

      // Conditional logic based on the jobPlatform
      if (jobPlatform === "indeed") {
        return updateIndeedJobStatus(job.id, newStatus);
      }
      if (jobPlatform === "linkedin") {
        return updateLinkedinJobStatus(job.id, newStatus);
      }
    });

    // Use Promise.all to wait for all update operations to complete
    try {
      await Promise.all(updatePromises);
      console.log(`Updated status to ${newStatus} for selected rows.`);
      // Optionally, refresh the data or UI here
    } catch (error) {
      console.error("Error updating job statuses:", error);
      // Handle any errors that occurred during the update
    }
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          className="flex size-8 p-0 data-[state=open]:bg-muted"
        >
          <Edit className="size-4" />
          <span>Log selected rows</span>
          <span className="sr-only">Open menu</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-[160px]">
        <DropdownMenuRadioGroup value={status} onValueChange={handleEditRows}>
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

export default SelectedRowsButton;

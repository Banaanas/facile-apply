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
import {
  IndeedJob,
  JobStatus,
  LinkedinJob,
  LinkedinPost,
} from "@prisma/client";
import { Row } from "@tanstack/react-table";
import { Edit } from "lucide-react";

import {
  updateIndeedJobStatus,
  updateLinkedinJobStatus,
  updateLinkedinPostStatus,
} from "@/actions";

const SelectedRowsButton = <
  TData extends IndeedJob | LinkedinJob | LinkedinPost,
>({
  jobPlatform,
  selectedRows,
  resetRowSelection,
}: {
  jobPlatform: JobPlatform;
  selectedRows: Row<TData>[];
  resetRowSelection: (defaultState?: boolean) => void;
}) => {
  const handleEditRows = async (newStatusString: string) => {
    const newStatus = newStatusString as JobStatus; // Cast string to JobStatus

    // Use map to create an array of promises for each update operation
    const updatePromises = selectedRows.map(async (row) => {
      const job = row.original; // Assuming row.original contains the job data

      // Conditional logic based on the jobPlatform
      if (jobPlatform === "indeed") {
        return updateIndeedJobStatus(job.id, newStatus);
      }
      if (jobPlatform === "linkedinJob") {
        return updateLinkedinJobStatus(job.id, newStatus);
      }
      if (jobPlatform === "linkedinPost") {
        return updateLinkedinPostStatus(job.id, newStatus);
      }

      // Throw an error if none of the platforms match
      throw new Error(`Unsupported job platform: ${jobPlatform}`);
    });

    // Use Promise.all to wait for all update operations to complete
    try {
      await Promise.all(updatePromises);
      console.log(`Updated status to ${newStatus} for selected rows.`);

      // Clear selection if the new status is "Ignored"
      if (newStatus === "Ignored") {
        resetRowSelection();
      }

      // Optionally, refresh the data or UI here
    } catch (error) {
      console.error("Error updating job statuses:", error);
      // Handle any errors that occurred during the update
    }
  };

  const isButtonDisable = selectedRows.length === 0;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="default"
          className="flex items-center justify-center gap-x-2 w-fit bg-white text-black"
          disabled={isButtonDisable}
        >
          <Edit className="size-4" />
          <span>Log selected rows</span>
          <span className="sr-only">Open menu</span>
        </Button>
      </DropdownMenuTrigger>
      <div className="bg-red w-fit text-sm text-muted-foreground">
        {selectedRows.length} row(s) selected.
      </div>
      <DropdownMenuContent align="end" className="w-[160px]">
        <DropdownMenuRadioGroup onValueChange={handleEditRows}>
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

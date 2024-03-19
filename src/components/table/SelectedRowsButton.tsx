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

  const isButtonDisable = selectedRows.length === 0;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="default"
          className="flex items-center justify-center gap-x-2"
          disabled={isButtonDisable}
        >
          <Edit className="size-4" />
          <span>Log selected rows</span>
          <span className="sr-only">Open menu</span>
        </Button>
      </DropdownMenuTrigger>
      <div className="flex-1 text-sm text-muted-foreground">
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

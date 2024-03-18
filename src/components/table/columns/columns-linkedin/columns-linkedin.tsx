"use client";

import DataTableRowActions from "@components/table/data-table-row-actions";
import SortingButton from "@components/table/SortingButton";
import { getReadableStatus } from "@components/table/table.helpers";
import { IndeedJob, LinkedinJob } from "@prisma/client";
import { ColumnDef } from "@tanstack/react-table";

import { Checkbox } from "@/components/ui/checkbox";

export const columnsLinkedin: ColumnDef<LinkedinJob>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },

  {
    header: "Title",
    accessorKey: "title",
    cell: ({ row }) => {
      const linkedinJob = row.original;

      return (
        <a
          href={linkedinJob.link}
          className="hover:underline"
          target="_blank"
          rel="noopener noreferrer"
        >
          {linkedinJob.title}
        </a>
      );
    },
  },
  {
    header: "Company",
    accessorKey: "company",
  },
  {
    header: ({ column }) => {
      return <SortingButton column={column}>Date</SortingButton>;
    },
    accessorKey: "createDate",
    cell: ({ row }) => {
      const date: Date = row.getValue("createDate");
      const options: Intl.DateTimeFormatOptions = {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
      };
      return (
        <div className="flex items-center justify-center text-right font-medium">
          {date.toLocaleString("fr-FR", options)}
        </div>
      );
    },
  },
  {
    // Necessary to Data Table Faced Filter
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id));
    },
    accessorKey: "easyApply",
    header: ({ column }) => {
      return <SortingButton column={column}>Easy Apply</SortingButton>;
    },
  },

  {
    // Necessary to Data Table Faced Filter
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id));
    },
    accessorKey: "location",
    header: ({ column }) => {
      return <SortingButton column={column}>Location</SortingButton>;
    },
  },

  {
    // Necessary to Data Table Faced Filter
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id));
    },
    accessorKey: "status",
    header: ({ column }) => {
      return <SortingButton column={column}>Status</SortingButton>;
    },

    cell: ({ row }) => {
      const status: IndeedJob["status"] = row.getValue("status");

      return (
        <div className="flex items-center justify-center text-right font-medium">
          {getReadableStatus(status)}
        </div>
      );
    },
  },

  {
    id: "actions",
    cell: ({ row }) => <DataTableRowActions row={row} jobPlatform="linkedin" />,
  },
];

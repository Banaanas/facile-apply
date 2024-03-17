"use client";

import DataTableRowActions from "@components/table/data-table-row-actions";
import SortingButton from "@components/table/SortingButton";
import {
  flagComponents,
  getReadableStatus,
} from "@components/table/table.helpers";
import { CountryCode, IndeedJob } from "@prisma/client";
import { ColumnDef } from "@tanstack/react-table";

import { Checkbox } from "@/components/ui/checkbox";

export const columnsIndeed: ColumnDef<IndeedJob>[] = [
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
      const indeedJob = row.original;

      return (
        <a
          href={indeedJob.link}
          className="hover:underline"
          target="_blank"
          rel="noopener noreferrer"
        >
          {indeedJob.title}
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
    accessorKey: "indeedApplyEnabled",
    header: ({ column }) => {
      return <SortingButton column={column}>Indeed Apply</SortingButton>;
    },
  },
  {
    // Necessary to Data Table Faced Filter
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id));
    },
    accessorKey: "country",
    header: ({ column }) => {
      return <SortingButton column={column}>Country</SortingButton>;
    },
    cell: ({ row }) => {
      const countryCode: CountryCode = row.getValue("country");

      return (
        <div className="flex items-center justify-center text-right font-medium">
          {flagComponents[countryCode]}
        </div>
      );
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
    cell: ({ row }) => <DataTableRowActions row={row} jobPlatform="indeed" />,
  },
];

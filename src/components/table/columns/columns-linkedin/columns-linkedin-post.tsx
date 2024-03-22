"use client";

import DataTableRowActions from "@components/table/data-table-row-actions";
import SortingButton from "@components/table/SortingButton";
import { getReadableStatus } from "@components/table/table.helpers";
import { LinkedinPost } from "@prisma/client";
import { ColumnDef } from "@tanstack/react-table";

import { Checkbox } from "@/components/ui/checkbox";

export const columnsLinkedinPost: ColumnDef<LinkedinPost>[] = [
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
    header: "Author",
    accessorKey: "authorName",
    cell: ({ row }) => {
      const linkedinPost = row.original;

      return (
        <a
          href={linkedinPost.authorProfileUrl ?? undefined}
          className="hover:underline"
          target="_blank"
          rel="noopener noreferrer"
        >
          {linkedinPost.authorName}
        </a>
      );
    },
  },

  {
    header: "Country",
    accessorKey: "authorCountry",
    header: ({ column }) => {
      return <SortingButton column={column}>Location</SortingButton>;
    },
  },

  {
    header: ({ column }) => {
      return <SortingButton column={column}>Date</SortingButton>;
    },
    accessorKey: "postDate",
    cell: ({ row }) => {
      const date: Date = row.getValue("postDate");
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
    header: "Summary",
    accessorKey: "summary",
    cell: ({ row }) => {
      const linkedinPost = row.original;

      return (
        <a
          href={linkedinPost.postUrl}
          className="hover:underline"
          target="_blank"
          rel="noopener noreferrer"
        >
          {linkedinPost.summary}
        </a>
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
      const status: LinkedinPost["status"] = row.getValue("status");

      return (
        <div className="flex items-center justify-center text-right font-medium">
          {getReadableStatus(status)}
        </div>
      );
    },
  },

  {
    id: "actions",
    cell: ({ row }) => (
      <DataTableRowActions row={row} jobPlatform="linkedinPost" />
    ),
  },
];

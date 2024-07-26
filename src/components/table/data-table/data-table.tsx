"use client";

import {
  countries,
  indeedApplyEnableOptions,
  linkedinEasyApplyOptions,
  statuses,
} from "@components/table/data/data";
import { DataTableFacetedFilter } from "@components/table/data-table-faced-filter";
import DataTablePagination from "@components/table/DataTablePagination";
import SelectedRowsButton from "@components/table/SelectedRowsButton";
import { Button } from "@components/ui/button";
import {
  ColumnDef,
  ColumnFiltersState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  SortingState,
  useReactTable,
  VisibilityState,
} from "@tanstack/react-table";
import { XIcon as CrossIcon } from "lucide-react";
import { useState } from "react";

import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { IndeedJob, LinkedinJob, LinkedinPost } from "@prisma/client";

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  jobPlatform: JobPlatform;
}

const indeedFilters = [
  { columnId: "status", title: "Status", options: statuses },
  { columnId: "country", title: "Country", options: countries },
  {
    columnId: "indeedApplyEnabled",
    title: "Indeed Apply",
    options: indeedApplyEnableOptions,
  },
];

const linkedinJobFilters = [
  { columnId: "status", title: "Status", options: statuses },
  {
    columnId: "easyApply",
    title: "Easy Apply",
    options: linkedinEasyApplyOptions,
  },
];

const linkedinPostFilters = [
  { columnId: "status", title: "Status", options: statuses },
];

const jobPlatformFilters = {
  indeed: indeedFilters,
  linkedinJob: linkedinJobFilters,
  linkedinPost: linkedinPostFilters,
};

export const DataTable = <
  TData extends IndeedJob | LinkedinJob | LinkedinPost,
  TValue,
>({
  columns,
  data,
  jobPlatform,
}: DataTableProps<TData, TValue>) => {
  const dateField = getDateField(jobPlatform);

  const [sorting, setSorting] = useState<SortingState>([
    {
      id: dateField, // Use the dynamically determined date field
      desc: true,
    },
  ]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    onColumnFiltersChange: setColumnFilters,
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,

    state: {
      columnFilters,
      columnVisibility,
      sorting,
    },
  });

  const resetRowSelection = () => {
    table.resetRowSelection();
  };

  const isFiltered = table.getState().columnFilters.length > 0;

  const facetFilters = jobPlatformFilters[jobPlatform];

  return (
    <div className="rounded-md border">
      <SelectedRowsButton
        jobPlatform={jobPlatform}
        selectedRows={table.getFilteredSelectedRowModel().rows}
        resetRowSelection={resetRowSelection}
      />
      <div className="flex items-center p-4">
        {jobPlatform === "indeed" || jobPlatform === "linkedinJob" ? (
          <Input
            placeholder="Filter title..."
            value={(table.getColumn("title")?.getFilterValue() as string) ?? ""}
            onChange={(event) =>
              table.getColumn("title")?.setFilterValue(event.target.value)
            }
            className="max-w-sm"
          />
        ) : null}
        <div className="flex flex-wrap px-2">
          {facetFilters.map(({ columnId, title, options }) =>
            table.getColumn(columnId) ? (
              <DataTableFacetedFilter
                key={columnId}
                column={table.getColumn(columnId)}
                title={title}
                options={options}
              />
            ) : null,
          )}
        </div>
        {isFiltered && (
          <Button
            variant="ghost"
            onClick={() => table.resetColumnFilters()}
            className="h-8 px-2 lg:px-3"
          >
            Reset
            <CrossIcon className="ml-2 size-4" />
          </Button>
        )}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="ml-auto">
              Columns
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            {table
              .getAllColumns()
              .filter((column) => column.getCanHide())
              .map((column) => {
                return (
                  <DropdownMenuCheckboxItem
                    key={column.id}
                    className="capitalize"
                    checked={column.getIsVisible()}
                    onCheckedChange={(value) =>
                      column.toggleVisibility(!!value)
                    }
                  >
                    {column.id}
                  </DropdownMenuCheckboxItem>
                );
              })}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <Table>
        <TableHeader>
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map((header) => {
                return (
                  <TableHead key={header.id}>
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext(),
                        )}
                  </TableHead>
                );
              })}
            </TableRow>
          ))}
        </TableHeader>
        <TableBody>
          {table.getRowModel().rows?.length ? (
            table.getRowModel().rows.map((row) => (
              <TableRow
                key={row.id}
                data-state={row.getIsSelected() && "selected"}
              >
                {row.getVisibleCells().map((cell) => (
                  <TableCell key={cell.id}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={columns.length} className="h-24 text-center">
                No results.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>

      <DataTablePagination table={table} />
    </div>
  );
};

export type JobPlatform = "indeed" | "linkedinJob" | "linkedinPost";

const getDateField = (jobPlatform: string) => {
  switch (jobPlatform) {
    case "linkedinPost":
      return "postDate";
    case "indeedJob":
    case "linkedinJob":
      return "createDate";
    default:
      return "createDate"; // Default fallback
  }
};

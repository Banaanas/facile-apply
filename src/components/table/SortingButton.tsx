import { Button } from "@components/ui/button";
import { IndeedJob, LinkedinJob, LinkedinPost } from "@prisma/client";
import { Column } from "@tanstack/react-table";
import { ArrowUpDown } from "lucide-react";
import { ReactNode } from "react";

const SortingButton = ({
  column,
  children,
}: {
  column: Column<IndeedJob> | Column<LinkedinJob> | Column<LinkedinPost>;
  children: ReactNode;
}) => {
  return (
    <Button
      variant="ghost"
      className="items-center justify-center font-bold uppercase"
      onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
    >
      {children}
      <ArrowUpDown className="ml-2 size-4" />
    </Button>
  );
};

export default SortingButton;

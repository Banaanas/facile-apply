import { BanIcon, CheckIcon, CircleDashed } from "lucide-react";

export const labels = [
  {
    value: "bug",
    label: "Bug",
  },
  {
    value: "feature",
    label: "Feature",
  },
  {
    value: "documentation",
    label: "Documentation",
  },
];

export const statuses = [
  {
    value: "NotReviewed",
    label: "Not Reviewed",
    icon: CircleDashed,
  },
  {
    value: "Applied",
    label: "Applied",
    icon: CheckIcon,
  },
  {
    value: "Ignored",
    label: "Ignored",
    icon: BanIcon,
  },
];

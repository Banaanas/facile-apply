import { BanIcon, CheckIcon, CircleDashed } from "lucide-react";

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

export const countries = [
  {
    value: "CA",
    label: "CA",
  },
  {
    value: "CH",
    label: "CH",
  },
  {
    value: "FR",
    label: "FR",
  },
  {
    value: "US",
    label: "US",
  },
];

export const indeedApplyEnableOptions = [
  {
    value: "true",
    label: "Enabled",
  },
  {
    value: "false",
    label: "Not Enabled",
  },
];

export const linkedinEasyApplyOptions = [
  {
    value: "true",
    label: "Enabled",
  },
  {
    value: "false",
    label: "Not Enabled",
  },
];

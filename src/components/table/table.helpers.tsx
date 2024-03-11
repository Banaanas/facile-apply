import FlagCA from "@components/table/country-flags/FlagCA";
import FlagCH from "@components/table/country-flags/FlagCH";
import FlagFR from "@components/table/country-flags/FlagFR";
import { IndeedJob } from "@prisma/client";

export const getReadableStatus = (status: IndeedJob["status"]) => {
  if (status === "Ignored") return "Ignored";
  if (status === "NotReviewed") return "Not Reviewed";
  if (status === "Applied") return "Applied";
};

export const flagComponents = {
  CA: <FlagCA />,
  CH: <FlagCH />,
  FR: <FlagFR />,
  US: <FlagCA />,
};

import FlagCA from "@components/table/country-flags/FlagCA";
import FlagCH from "@components/table/country-flags/FlagCH";
import FlagFR from "@components/table/country-flags/FlagFR";
import FlagUS from "@components/table/country-flags/FlagUS";
import { IndeedJob } from "@prisma/client";
import FlagDK from "@components/table/country-flags/FlagDK";
import FlagFI from "@components/table/country-flags/FlagFI";
import FlagNO from "@components/table/country-flags/FlagNO";
import FlagNL from "@components/table/country-flags/FlagNL";
import React from "react";
import FlagSE from "@components/table/country-flags/FlagSE";

export const getReadableStatus = (status: IndeedJob["status"]) => {
  if (status === "Applied") return "Applied";
  if (status === "Ignored") return "Ignored";
  if (status === "NotReviewed") return "Not Reviewed";
};

export const flagComponents = {
  CA: <FlagCA />,
  CH: <FlagCH />,
  FR: <FlagFR />,
  US: <FlagUS />,

  DK: <FlagDK />,
  FI: <FlagFI />,
  NL: <FlagNL />,
  NO: <FlagNO />,
  SE: <FlagSE />,
};

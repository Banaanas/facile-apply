import { RawLinkedinJobCardUnion } from "@/scripts/linkedIn/fetch-jobs/parsing/transform-job-results";

export const extractDateFromDaysAgoText = (
  footerItems: RawLinkedinJobCardUnion["jobPostingCard"]["footerItems"],
): Date | null => {
  console.log(footerItems);
  for (const item of footerItems) {
    if (item.text?.text) {
      const match = item.text.text.match(/\b(\d+) days? ago\b/);
      console.log("DAYS AGO", match);
      if (match) {
        const daysAgo = Number(match[1]);
        if (isNaN(daysAgo)) {
          throw new Error(`Cannot convert ${match[1]} to number`);
        }
        const date = new Date();
        return new Date(
          date.getFullYear(),
          date.getMonth(),
          date.getDate() - daysAgo,
        );
      }
    }
  }
  return null;
};

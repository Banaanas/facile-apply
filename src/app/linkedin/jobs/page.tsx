import { columnsLinkedinJob } from "@components/table/columns/columns-linkedin/columns-linkedin-job";
import { DataTable } from "@components/table/data-table/data-table";
import { prisma } from "@prisma/db.server";
import ApplyAllJobsButton from "@components/ApplyAllJobsButton";
import Main from "@components/Main";
import { MaxWidthWrapper } from "@components/MaxWidthWrapper";
import { globalMaxWidth } from "@app/styles/common-styles";

const LinkedinJobsPage = async () => {
  const jobs = await prisma.linkedinJob.findMany({
    where: {
      status: "NotReviewed",
      location: {
        contains: "",
        mode: "insensitive",
      },
      /*   location: {
        contains: "Germany",
        mode: "insensitive",
      }, */
    },
  });

  return (
    <Main>
      <MaxWidthWrapper
        maxWidth={globalMaxWidth}
        className="flex flex-col gap-y-4 items-end"
      >
        <ApplyAllJobsButton platform="linkedin" allJobs={jobs} />
        <div className="w-full overflow-x-auto">
          <DataTable
            jobPlatform="linkedinJob"
            columns={columnsLinkedinJob}
            data={jobs}
          />
        </div>
      </MaxWidthWrapper>
    </Main>
  );
};

export default LinkedinJobsPage;

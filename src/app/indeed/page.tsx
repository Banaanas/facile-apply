import { columnsIndeed } from "@components/table/columns/columns-linkedin/columns-indeed";
import { DataTable } from "@components/table/data-table/data-table";
import { prisma } from "@prisma/db.server";
import ApplyAllJobsButton from "@components/ApplyAllJobsButton";
import Main from "@components/Main";
import { MaxWidthWrapper } from "@components/MaxWidthWrapper";
import { globalMaxWidth } from "@app/styles/common-styles";

const IndeedPage = async () => {
  const jobs = await prisma.indeedJob.findMany({
    where: {
      status: "NotReviewed",
      // indeedApplyEnabled: false,
    },
  });

  return (
    <Main>
      <MaxWidthWrapper
        maxWidth={globalMaxWidth}
        className="flex flex-col gap-y-4 items-end"
      >
        <ApplyAllJobsButton platform="indeed" allJobs={jobs} />
        <div className="w-full overflow-x-auto">
          <DataTable jobPlatform="indeed" columns={columnsIndeed} data={jobs} />
        </div>
      </MaxWidthWrapper>
    </Main>
  );
};

export default IndeedPage;

import { columnsIndeed } from "@components/table/columns/columns-linkedin/columns-indeed";
import { DataTable } from "@components/table/data-table/data-table";
import { prisma } from "@prisma/db.server";
import ApplyAllJobsButton from "@components/ApplyAllJobsButton";

const IndeedPage = async () => {
  const jobs = await prisma.indeedJob.findMany({
    where: {
      status: "NotReviewed",
      //indeedApplyEnabled: false,
    },
  });

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-10">
      <ApplyAllJobsButton platform="indeed" allJobs={jobs} />
      <div className="container mx-auto  py-10">
        <DataTable jobPlatform="indeed" columns={columnsIndeed} data={jobs} />
      </div>
    </main>
  );
};

export default IndeedPage;

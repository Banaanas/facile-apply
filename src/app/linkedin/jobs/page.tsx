import { columnsLinkedinJob } from "@components/table/columns/columns-linkedin/columns-linkedin-job";
import { DataTable } from "@components/table/data-table/data-table";
import { prisma } from "@prisma/db.server";

const LinkedinJobsPage = async () => {
  const jobs = await prisma.linkedinJob.findMany({
    where: {
      status: "NotReviewed",
      location: {
        contains: "FRANCE",
        mode: "insensitive", // Optional: make the search case-insensitive
      },
    },
  });

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-10">
      <h1 className="text-4xl font-bold text-blue-700">Linkedin Job Results</h1>
      <div className="container mx-auto py-10">
        <DataTable
          jobPlatform="linkedinJob"
          columns={columnsLinkedinJob}
          data={jobs}
        />
      </div>
    </main>
  );
};

export default LinkedinJobsPage;

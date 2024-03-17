import { columnsLinkedin } from "@components/table/columns/columns-linkedin/columns-linkedin";
import { DataTableIndeed } from "@components/table/data-table/data-table-indeed";
import { prisma } from "@prisma/db.server";

const LinkedInPage = async () => {
  const jobs = await prisma.linkedInJob.findMany();
  console.log(jobs);

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-10">
      <h1 className="text-4xl font-bold text-blue-700">LinkedIn Results</h1>
      <div className="container mx-auto max-w-5xl py-10">
        <DataTableIndeed
          jobPlatform="linkedin"
          columns={columnsLinkedin}
          data={jobs}
        />
      </div>
    </main>
  );
};

export default LinkedInPage;

import { columnsLinkedin } from "@components/table/columns/columns-linkedin/columns-linkedin";
import { DataTable } from "@components/table/data-table/data-table";
import { prisma } from "@prisma/db.server";

const LinkedinPage = async () => {
  const jobs = await prisma.linkedinJob.findMany();

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-10">
      <h1 className="text-4xl font-bold text-blue-700">Linkedin Results</h1>
      <div className="container mx-auto py-10">
        <DataTable
          jobPlatform="linkedin"
          columns={columnsLinkedin}
          data={jobs}
        />
      </div>
    </main>
  );
};

export default LinkedinPage;

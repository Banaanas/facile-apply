import { columnsIndeed } from "@components/table/columns/columns-linkedin/columns-indeed";
import { DataTableIndeed } from "@components/table/data-table/data-table-indeed";
import { prisma } from "@prisma/db.server";

const IndeedPage = async () => {
  const jobs = await prisma.indeedJob.findMany();

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-10">
      <h1 className="text-4xl font-bold text-blue-700">Indeed Results</h1>
      <div className="container mx-auto  py-10">
        <DataTableIndeed
          jobPlatform="indeed"
          columns={columnsIndeed}
          data={jobs}
        />
      </div>
    </main>
  );
};

export default IndeedPage;

import { columns } from "@components/table/columns";
import { DataTable } from "@components/table/data-table";
import { prisma } from "@prisma/db.server";

const HomePage = async () => {
  const jobs = await prisma.indeedJob.findMany();

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-10">
      <h1 className="text-4xl font-bold text-blue-700">Indeed Results</h1>
      <div className="container mx-auto max-w-5xl py-10">
        <DataTable columns={columns} data={jobs} />
      </div>
    </main>
  );
};

export default HomePage;

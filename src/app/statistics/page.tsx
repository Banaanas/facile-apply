import { JobStatus } from "@prisma/client";
import { prisma } from "@prisma/db.server";

const StatisticsPage = async () => {
  const total = await getTotalCounts();

  return (
    <main className="flex min-h-screen flex-col items-center gap-y-24 p-10">
      <h1 className="text-4xl font-bold text-blue-700">Statistics</h1>
      <div className="flex flex-col gap-y-8">
        <div className="flex gap-x-2 bg-fuchsia-400 text-4xl font-extrabold">
          <span>Applied : </span>
          <span>{total.Applied}</span>
        </div>
        <div className="flex gap-x-2 text-4xl font-extrabold">
          <span>Ignored : </span>
          <span>{total.Ignored}</span>
        </div>
      </div>
    </main>
  );
};

export default StatisticsPage;

async function getTotalCounts() {
  // Updated list of statuses
  const statuses: string[] = [
    JobStatus.Applied,
    JobStatus.Ignored,
    JobStatus.NotReviewed,
  ];

  // Initialize a record to keep track of counts
  const totalCounts: Record<string, number> = {
    Applied: 0,
    Ignored: 0,
    NotReviewed: 0,
  };

  // Function to count for a specific model
  async function countForModel(
    model: "indeedJob" | "linkedinJob" | "linkedinPost",
  ) {
    for (const status of statuses) {
      const count = await prisma[model].count({
        where: { status },
      });
      totalCounts[status] += count;
    }
  }

  // Perform counts for each model
  await countForModel("indeedJob");
  await countForModel("linkedinJob");
  await countForModel("linkedinPost");

  return totalCounts;
}

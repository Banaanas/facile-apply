import { columnsLinkedinPost } from "@components/table/columns/columns-linkedin/columns-linkedin-post";
import { DataTable } from "@components/table/data-table/data-table";
import { prisma } from "@prisma/db.server";

const LinkedinPostsPage = async () => {
  const posts = await prisma.linkedinPost.findMany({
    where: {
      status: "NotReviewed",
    },
  });

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-10">
      <div className="container mx-auto py-10">
        <DataTable
          jobPlatform="linkedinPost"
          columns={columnsLinkedinPost}
          data={posts}
        />
      </div>
    </main>
  );
};

export default LinkedinPostsPage;

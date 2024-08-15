import { columnsLinkedinPost } from "@components/table/columns/columns-linkedin/columns-linkedin-post";
import { DataTable } from "@components/table/data-table/data-table";
import { prisma } from "@prisma/db.server";
import Main from "@components/Main";
import { MaxWidthWrapper } from "@components/MaxWidthWrapper";
import { globalMaxWidth } from "@app/styles/common-styles";
import ApplyAllJobsButton from "@components/ApplyAllJobsButton";

const LinkedinPostsPage = async () => {
  const posts = await prisma.linkedinPost.findMany({
    where: {
      status: "NotReviewed",
    },
  });

  return (
    <Main>
      <MaxWidthWrapper
        maxWidth={globalMaxWidth}
        className="flex flex-col gap-y-4 items-end"
      >
        <div className="w-full overflow-x-auto">
          <DataTable
            jobPlatform="linkedinPost"
            columns={columnsLinkedinPost}
            data={posts}
          />
        </div>
      </MaxWidthWrapper>
    </Main>
  );
};

export default LinkedinPostsPage;

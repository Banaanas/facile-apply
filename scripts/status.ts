import { PostStatus } from "@prisma/client";
import { prisma } from "@prisma/db.server";

async function updatePostStatus() {
  await prisma.linkedinPost.updateMany({
    // If you want to update posts with a specific status or without a status, specify those conditions here.
    // For example, to update all posts regardless of their current status, you might not need a `where` clause.
    // If you specifically want to target posts without a `status` set, you might need additional logic,
    // because `null` values for enums can be tricky to handle directly.
    data: {
      status: PostStatus.NotReviewed, // Ensure you're using the enum from `@prisma/client`
    },
  });

  console.log(
    "All existing LinkedinPost records have been updated to NotReviewed status.",
  );
}

updatePostStatus()
  .catch((e) => {
    throw e;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

import { prisma } from "@prisma/db.server";
import { LinkedinPost } from "@prisma/client";

export const fetchNotReviewedPosts = async () => {
  const posts = await prisma.linkedinPost.findMany({
    where: {
      status: "NotReviewed",
    },
  });
  return posts;
};

export const filterPostsWithEmails = (posts: Array<LinkedinPost>) => {
  const emailRegex = /([a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\.[a-zA-Z0-9_-]+)/;

  return posts.filter((post) => emailRegex.test(post.summary));
};

-- CreateTable
CREATE TABLE "LinkedinPost" (
    "id" SERIAL NOT NULL,
    "authorProfileUrl" TEXT NOT NULL,
    "authorCountry" TEXT,
    "postDate" TIMESTAMP(3) NOT NULL,
    "postUrl" TEXT NOT NULL,
    "profilePhotoUrl" TEXT,
    "summary" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "trackingUrn" TEXT NOT NULL,

    CONSTRAINT "LinkedinPost_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "LinkedinPost_postUrl_key" ON "LinkedinPost"("postUrl");

-- CreateIndex
CREATE UNIQUE INDEX "LinkedinPost_trackingUrn_key" ON "LinkedinPost"("trackingUrn");

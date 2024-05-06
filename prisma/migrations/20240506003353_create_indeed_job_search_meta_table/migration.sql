-- CreateTable
CREATE TABLE "IndeedJobSearchMeta" (
    "id" SERIAL NOT NULL,
    "identifier" TEXT NOT NULL,
    "domain" TEXT NOT NULL,
    "query" TEXT NOT NULL,
    "lastSearchAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "IndeedJobSearchMeta_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "IndeedJobSearchMeta_identifier_key" ON "IndeedJobSearchMeta"("identifier");

-- CreateIndex
CREATE UNIQUE INDEX "IndeedJobSearchMeta_domain_query_key" ON "IndeedJobSearchMeta"("domain", "query");

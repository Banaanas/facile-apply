-- CreateTable
CREATE TABLE "LinkedinJobSearchMeta" (
    "id" SERIAL NOT NULL,
    "identifier" TEXT NOT NULL,
    "domain" TEXT NOT NULL,
    "query" TEXT NOT NULL,
    "lastSearchAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "LinkedinJobSearchMeta_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "LinkedinJobSearchMeta_identifier_key" ON "LinkedinJobSearchMeta"("identifier");

-- CreateIndex
CREATE UNIQUE INDEX "LinkedinJobSearchMeta_domain_query_key" ON "LinkedinJobSearchMeta"("domain", "query");

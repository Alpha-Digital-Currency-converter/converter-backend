-- CreateTable
CREATE TABLE "cotacao" (
    "id" SERIAL NOT NULL,
    "code" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "value" DECIMAL(65,30) NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "cotacao_pkey" PRIMARY KEY ("id")
);

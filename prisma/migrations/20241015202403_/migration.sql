-- CreateTable
CREATE TABLE "Params" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(100) NOT NULL,

    CONSTRAINT "Params_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ApplicationParams" (
    "id" SERIAL NOT NULL,
    "paramId" INTEGER NOT NULL,
    "value" VARCHAR(100) NOT NULL,

    CONSTRAINT "ApplicationParams_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "ApplicationParams" ADD CONSTRAINT "ApplicationParams_paramId_fkey" FOREIGN KEY ("paramId") REFERENCES "Params"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

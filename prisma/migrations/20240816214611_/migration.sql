/*
  Warnings:

  - You are about to drop the column `active` on the `Action` table. All the data in the column will be lost.
  - You are about to drop the column `codeName` on the `Feature` table. All the data in the column will be lost.
  - You are about to drop the column `codeName` on the `Group` table. All the data in the column will be lost.
  - You are about to drop the `ActionsFeature` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `code` to the `Action` table without a default value. This is not possible if the table is not empty.
  - Made the column `createdAt` on table `Action` required. This step will fail if there are existing NULL values in that column.
  - Made the column `createdAt` on table `DeviceComponent` required. This step will fail if there are existing NULL values in that column.
  - Added the required column `code` to the `Feature` table without a default value. This is not possible if the table is not empty.
  - Made the column `createdAt` on table `Feature` required. This step will fail if there are existing NULL values in that column.
  - Added the required column `code` to the `Group` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "ActionsFeature" DROP CONSTRAINT "ActionsFeature_actionId_fkey";

-- DropForeignKey
ALTER TABLE "ActionsFeature" DROP CONSTRAINT "ActionsFeature_featureId_fkey";

-- AlterTable
ALTER TABLE "Action" DROP COLUMN "active",
ADD COLUMN     "code" VARCHAR(40) NOT NULL,
ALTER COLUMN "name" SET DATA TYPE VARCHAR(40),
ALTER COLUMN "createdAt" SET NOT NULL;

-- AlterTable
ALTER TABLE "DeviceComponent" ALTER COLUMN "name" SET DATA TYPE VARCHAR(40),
ALTER COLUMN "createdAt" SET NOT NULL;

-- AlterTable
ALTER TABLE "Feature" DROP COLUMN "codeName",
ADD COLUMN     "code" VARCHAR(100) NOT NULL,
ALTER COLUMN "createdAt" SET NOT NULL;

-- AlterTable
ALTER TABLE "Group" DROP COLUMN "codeName",
ADD COLUMN     "code" VARCHAR(100) NOT NULL;

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "connected" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "socket" VARCHAR(100) DEFAULT '';

-- DropTable
DROP TABLE "ActionsFeature";

-- CreateTable
CREATE TABLE "FeatureAction" (
    "id" SERIAL NOT NULL,
    "featureId" INTEGER NOT NULL,
    "actionId" INTEGER NOT NULL,

    CONSTRAINT "FeatureAction_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "FeatureAction" ADD CONSTRAINT "FeatureAction_featureId_fkey" FOREIGN KEY ("featureId") REFERENCES "Feature"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FeatureAction" ADD CONSTRAINT "FeatureAction_actionId_fkey" FOREIGN KEY ("actionId") REFERENCES "Action"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

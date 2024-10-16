/*
  Warnings:

  - You are about to drop the column `code` on the `Action` table. All the data in the column will be lost.
  - You are about to drop the column `code` on the `Feature` table. All the data in the column will be lost.
  - You are about to drop the column `code` on the `Group` table. All the data in the column will be lost.
  - You are about to drop the column `typeId` on the `User` table. All the data in the column will be lost.
  - You are about to drop the `UserType` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `canonical` to the `Action` table without a default value. This is not possible if the table is not empty.
  - Added the required column `canonical` to the `Feature` table without a default value. This is not possible if the table is not empty.
  - Added the required column `canonical` to the `Group` table without a default value. This is not possible if the table is not empty.
  - Added the required column `groupId` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "User" DROP CONSTRAINT "User_typeId_fkey";

-- AlterTable
ALTER TABLE "Action" DROP COLUMN "code",
ADD COLUMN     "canonical" VARCHAR(40) NOT NULL;

-- AlterTable
ALTER TABLE "Feature" DROP COLUMN "code",
ADD COLUMN     "canonical" VARCHAR(100) NOT NULL,
ALTER COLUMN "path" DROP NOT NULL;

-- AlterTable
ALTER TABLE "Group" DROP COLUMN "code",
ADD COLUMN     "canonical" VARCHAR(100) NOT NULL;

-- AlterTable
ALTER TABLE "Profile" ADD COLUMN     "rg" VARCHAR(11),
ALTER COLUMN "photo" SET DATA TYPE VARCHAR(300);

-- AlterTable
ALTER TABLE "User" DROP COLUMN "typeId",
ADD COLUMN     "groupId" INTEGER NOT NULL,
ADD COLUMN     "super" BOOLEAN NOT NULL DEFAULT false;

-- DropTable
DROP TABLE "UserType";

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_groupId_fkey" FOREIGN KEY ("groupId") REFERENCES "Group"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

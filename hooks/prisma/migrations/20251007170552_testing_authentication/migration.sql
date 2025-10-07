/*
  Warnings:

  - You are about to drop the column `sortingOrder` on the `Action` table. All the data in the column will be lost.
  - You are about to drop the column `sortingOrder` on the `Trigger` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[email]` on the table `User` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "public"."Action" DROP COLUMN "sortingOrder";

-- AlterTable
ALTER TABLE "public"."Trigger" DROP COLUMN "sortingOrder";

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "public"."User"("email");

-- AlterTable
ALTER TABLE "public"."Action" ADD COLUMN     "sortingOrder" INTEGER NOT NULL DEFAULT 0;

-- AlterTable
ALTER TABLE "public"."Trigger" ADD COLUMN     "sortingOrder" INTEGER NOT NULL DEFAULT 0;

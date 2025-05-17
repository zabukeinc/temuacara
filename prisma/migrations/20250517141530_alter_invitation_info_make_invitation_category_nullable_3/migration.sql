/*
  Warnings:

  - Made the column `invitation_category_id` on table `invitation_infos` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "invitation_infos" DROP CONSTRAINT "invitation_infos_invitation_category_id_fkey";

-- DropIndex
DROP INDEX "invitation_infos_invitation_category_id_key";

-- AlterTable
ALTER TABLE "invitation_infos" ALTER COLUMN "invitation_category_id" SET NOT NULL;

-- AddForeignKey
ALTER TABLE "invitation_infos" ADD CONSTRAINT "invitation_infos_invitation_category_id_fkey" FOREIGN KEY ("invitation_category_id") REFERENCES "invitation_categories"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

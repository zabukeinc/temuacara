-- DropForeignKey
ALTER TABLE "invitation_infos" DROP CONSTRAINT "invitation_infos_invitation_category_id_fkey";

-- AlterTable
ALTER TABLE "invitation_infos" ALTER COLUMN "invitation_category_id" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "invitation_infos" ADD CONSTRAINT "invitation_infos_invitation_category_id_fkey" FOREIGN KEY ("invitation_category_id") REFERENCES "invitation_categories"("id") ON DELETE SET NULL ON UPDATE CASCADE;

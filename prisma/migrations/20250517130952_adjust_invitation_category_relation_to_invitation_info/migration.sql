/*
  Warnings:

  - You are about to drop the column `invitation_category_id` on the `invitations` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[invitation_category_id]` on the table `invitation_infos` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `invitation_category_id` to the `invitation_infos` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "invitations" DROP CONSTRAINT "invitations_invitation_category_id_fkey";

-- AlterTable
ALTER TABLE "invitation_infos" ADD COLUMN     "invitation_category_id" UUID NOT NULL;

-- AlterTable
ALTER TABLE "invitations" DROP COLUMN "invitation_category_id";

-- CreateIndex
CREATE UNIQUE INDEX "invitation_infos_invitation_category_id_key" ON "invitation_infos"("invitation_category_id");

-- AddForeignKey
ALTER TABLE "invitation_infos" ADD CONSTRAINT "invitation_infos_invitation_category_id_fkey" FOREIGN KEY ("invitation_category_id") REFERENCES "invitation_categories"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

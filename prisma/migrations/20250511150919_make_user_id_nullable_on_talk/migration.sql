-- DropForeignKey
ALTER TABLE "talks" DROP CONSTRAINT "talks_user_id_fkey";

-- AlterTable
ALTER TABLE "talks" ALTER COLUMN "user_id" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "talks" ADD CONSTRAINT "talks_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;

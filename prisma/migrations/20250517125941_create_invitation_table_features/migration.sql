-- CreateEnum
CREATE TYPE "WeddingRoleEnum" AS ENUM ('GROOM', 'BRIDE', 'GROOM_FAMILY', 'BRIDE_FAMILY', 'ALL');

-- CreateEnum
CREATE TYPE "InvitationStatusEnum" AS ENUM ('LISTED', 'UNLISTED', 'INVITED', 'PENDING', 'RESERVED', 'CONFIRMED', 'ATTENDED', 'DECLINED', 'NO_RESPONSE');

-- CreateEnum
CREATE TYPE "InvitationTypeEnum" AS ENUM ('WEBSITE', 'EMAIL', 'MESSAGE', 'WHATSAPP', 'PRINT', 'OTHER');

-- CreateEnum
CREATE TYPE "WebsiteFeatureEnum" AS ENUM ('MUSIC', 'STORY', 'GALLERY', 'MAPS', 'RSVP', 'GIFT', 'DONATION', 'OTHER');

-- CreateEnum
CREATE TYPE "WebsiteTrackEnum" AS ENUM ('OPENED', 'SENT', 'EXPIRED');

-- CreateTable
CREATE TABLE "invitation_categories" (
    "id" UUID NOT NULL,
    "name" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3),
    "deleted_at" TIMESTAMP(3),

    CONSTRAINT "invitation_categories_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "invitations" (
    "id" UUID NOT NULL,
    "name" VARCHAR NOT NULL,
    "pax" INTEGER NOT NULL,
    "inviter" "WeddingRoleEnum" NOT NULL,
    "status" "InvitationStatusEnum" NOT NULL,
    "type" "InvitationTypeEnum" NOT NULL,
    "priority" INTEGER,
    "invitation_category_id" UUID NOT NULL,
    "created_at" TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ,
    "deleted_at" TIMESTAMPTZ,

    CONSTRAINT "invitations_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "invitation_infos" (
    "id" UUID NOT NULL,
    "invitation_id" UUID NOT NULL,
    "address" TEXT NOT NULL,
    "from" VARCHAR,
    "phone" VARCHAR,
    "email" VARCHAR,
    "created_at" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3),
    "deleted_at" TIMESTAMP(3),

    CONSTRAINT "invitation_infos_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "invitation_websites" (
    "id" UUID NOT NULL,
    "invitation_id" UUID NOT NULL,
    "url" TEXT NOT NULL,
    "feature" "WebsiteFeatureEnum"[],
    "track" "WebsiteTrackEnum",
    "sent_at" TIMESTAMP(3),
    "opened_at" TIMESTAMP(3),
    "expired_at" TIMESTAMP(3),
    "created_at" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3),
    "deleted_at" TIMESTAMP(3),

    CONSTRAINT "invitation_websites_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "invitation_infos_invitation_id_key" ON "invitation_infos"("invitation_id");

-- CreateIndex
CREATE UNIQUE INDEX "invitation_websites_invitation_id_key" ON "invitation_websites"("invitation_id");

-- AddForeignKey
ALTER TABLE "invitations" ADD CONSTRAINT "invitations_invitation_category_id_fkey" FOREIGN KEY ("invitation_category_id") REFERENCES "invitation_categories"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "invitation_infos" ADD CONSTRAINT "invitation_infos_invitation_id_fkey" FOREIGN KEY ("invitation_id") REFERENCES "invitations"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "invitation_websites" ADD CONSTRAINT "invitation_websites_invitation_id_fkey" FOREIGN KEY ("invitation_id") REFERENCES "invitations"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

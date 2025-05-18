-- CreateEnum
CREATE TYPE "GiftTypeEnum" AS ENUM ('BRIDE_PRICE', 'WEDDING_GIFT', 'GUEST_GIFT');

-- CreateEnum
CREATE TYPE "GiftPlatformEnum" AS ENUM ('OFFLINE_STORE', 'ONLINE_STORE', 'SOCIAL_MEDIA', 'OTHER');

-- CreateEnum
CREATE TYPE "GiftCategoryEnum" AS ENUM ('CASH', 'GOLD', 'JEWELRY', 'RING', 'MAKEUP', 'SKIN_CARE', 'BODY_CARE', 'HAIR_CARE', 'CLOTHES', 'ACCESSORIES', 'BOX', 'OTHER');

-- CreateEnum
CREATE TYPE "GiftStatusEnum" AS ENUM ('LISTED', 'UNLISTED', 'PREORDERED', 'CHECKOUTED', 'PENDING', 'SHIPPED', 'RECEIVED', 'COMPLETED', 'CANCELLED');

-- CreateTable
CREATE TABLE "gifts" (
    "id" UUID NOT NULL,
    "item" VARCHAR NOT NULL,
    "type" "GiftTypeEnum" NOT NULL,
    "category" "GiftCategoryEnum" NOT NULL,
    "store" VARCHAR NOT NULL,
    "platform" "GiftPlatformEnum" NOT NULL,
    "price" INTEGER NOT NULL,
    "quantity" INTEGER NOT NULL,
    "total_price" INTEGER NOT NULL,
    "responsibility" "WeddingRoleType"[] DEFAULT ARRAY[]::"WeddingRoleType"[],
    "status" "GiftStatusEnum" NOT NULL,
    "notes" TEXT,
    "created_at" TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ,
    "deleted_at" TIMESTAMPTZ,

    CONSTRAINT "gifts_pkey" PRIMARY KEY ("id")
);

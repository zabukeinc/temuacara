-- CreateEnum
CREATE TYPE "TalkEnum" AS ENUM ('PRE_MARITAL', 'POST_MARITAL');

-- CreateEnum
CREATE TYPE "SuggestionType" AS ENUM ('MUST', 'RECOMMENDED', 'OPTIONAL');

-- CreateEnum
CREATE TYPE "WeddingRoleType" AS ENUM ('GROOM', 'BRIDE', 'GROOM_FAMILY', 'BRIDE_FAMILY', 'ALL');

-- CreateEnum
CREATE TYPE "ChecklistType" AS ENUM ('PREPARATION', 'DOCUMENT', 'HEALTH', 'HONEYMOON', 'PRE_MARITAL_TALK', 'POST_MARITAL_TALK');

-- CreateTable
CREATE TABLE "permissions" (
    "id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "permissions_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "roles" (
    "id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "roles_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "users" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "email" CHAR(50),
    "phone" CHAR(14),
    "password" TEXT NOT NULL,
    "reset_token" TEXT,
    "country" TEXT,
    "province" TEXT,
    "state" TEXT,
    "city" TEXT,
    "village" TEXT,
    "postal_code" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "deleted_at" TIMESTAMP(3),

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "user_roles" (
    "id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "user_roles_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "user_role_permissions" (
    "id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "user_role_permissions_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "user_profiles" (
    "id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "user_profiles_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "user_logs" (
    "id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "user_logs_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "talks" (
    "id" SERIAL NOT NULL,
    "question" TEXT NOT NULL,
    "suggestion" TEXT NOT NULL,
    "answered_by_groom" BOOLEAN NOT NULL,
    "answered_by_bride" BOOLEAN NOT NULL,
    "asked_by_groom" BOOLEAN NOT NULL,
    "asked_by_bride" BOOLEAN NOT NULL,
    "is_groom_answerd" BOOLEAN,
    "is_bride_answerd" BOOLEAN,
    "answer_notes" TEXT,
    "type" "TalkEnum" NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "answered_at" TIMESTAMP(3),
    "deleted_at" TIMESTAMP(3),
    "user_id" TEXT,

    CONSTRAINT "talks_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "checklists" (
    "id" UUID NOT NULL,
    "checklist" TEXT NOT NULL,
    "type" "ChecklistType" NOT NULL,
    "suggestion" "SuggestionType" NOT NULL,
    "responsibility" "WeddingRoleType"[] DEFAULT ARRAY[]::"WeddingRoleType"[],
    "status" "WeddingRoleType"[] DEFAULT ARRAY[]::"WeddingRoleType"[],
    "assigned_to" "WeddingRoleType"[] DEFAULT ARRAY[]::"WeddingRoleType"[],
    "notes" TEXT,
    "completed_at" TIMESTAMP(3),
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "deleted_at" TIMESTAMP(3),

    CONSTRAINT "checklists_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");

-- CreateIndex
CREATE INDEX "email_index" ON "users"("email");

-- CreateIndex
CREATE INDEX "question_index" ON "talks"("question");

-- CreateIndex
CREATE INDEX "checklists_checklist_idx" ON "checklists"("checklist");

-- AddForeignKey
ALTER TABLE "talks" ADD CONSTRAINT "talks_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;

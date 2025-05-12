-- CreateTable
CREATE TABLE "checklists" (
    "id" SERIAL NOT NULL,
    "checklist" TEXT NOT NULL,
    "category" TEXT NOT NULL,
    "suggestion" TEXT NOT NULL,
    "responsibility_groom" BOOLEAN NOT NULL,
    "responsibility_bride" BOOLEAN NOT NULL,
    "status_groom" BOOLEAN NOT NULL,
    "status_bride" BOOLEAN NOT NULL,
    "notes" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "deleted_at" TIMESTAMP(3),
    "completed_at" TIMESTAMP(3),

    CONSTRAINT "checklists_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "checklist_category_index" ON "checklists"("checklist", "category");

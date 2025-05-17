/*
  Warnings:

  - A unique constraint covering the columns `[name]` on the table `invitation_categories` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "invitation_categories_name_key" ON "invitation_categories"("name");

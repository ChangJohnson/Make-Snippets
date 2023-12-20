/*
  Warnings:

  - Made the column `code` on table `Snippet` required. This step will fail if there are existing NULL values in that column.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Snippet" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "title" TEXT NOT NULL,
    "cdoe" TEXT,
    "code" TEXT NOT NULL
);
INSERT INTO "new_Snippet" ("cdoe", "code", "id", "title") SELECT "cdoe", "code", "id", "title" FROM "Snippet";
DROP TABLE "Snippet";
ALTER TABLE "new_Snippet" RENAME TO "Snippet";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;

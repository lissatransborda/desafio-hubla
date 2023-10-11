/*
  Warnings:

  - Added the required column `updated_at` to the `sellers` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updated_at` to the `transactions` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_sellers" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "balance" INTEGER NOT NULL,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" DATETIME NOT NULL
);
INSERT INTO "new_sellers" ("balance", "id") SELECT "balance", "id" FROM "sellers";
DROP TABLE "sellers";
ALTER TABLE "new_sellers" RENAME TO "sellers";
CREATE TABLE "new_transactions" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "type" INTEGER NOT NULL,
    "date" DATETIME NOT NULL,
    "product" TEXT NOT NULL,
    "value" REAL NOT NULL,
    "sellerId" TEXT,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" DATETIME NOT NULL,
    CONSTRAINT "transactions_sellerId_fkey" FOREIGN KEY ("sellerId") REFERENCES "sellers" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_transactions" ("date", "id", "product", "sellerId", "type", "value") SELECT "date", "id", "product", "sellerId", "type", "value" FROM "transactions";
DROP TABLE "transactions";
ALTER TABLE "new_transactions" RENAME TO "transactions";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;

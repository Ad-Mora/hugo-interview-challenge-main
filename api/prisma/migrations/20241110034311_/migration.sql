-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Application" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "firstName" TEXT,
    "lastName" TEXT,
    "dob" TEXT,
    "street" TEXT,
    "city" TEXT,
    "state" TEXT,
    "zipcode" TEXT,
    "vehicles" TEXT
);
INSERT INTO "new_Application" ("city", "dob", "firstName", "id", "lastName", "state", "street", "vehicles", "zipcode") SELECT "city", "dob", "firstName", "id", "lastName", "state", "street", "vehicles", "zipcode" FROM "Application";
DROP TABLE "Application";
ALTER TABLE "new_Application" RENAME TO "Application";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;

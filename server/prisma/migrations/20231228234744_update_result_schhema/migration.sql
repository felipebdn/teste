-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Result" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "nota" REAL NOT NULL,
    "disciplina" TEXT NOT NULL,
    "bimestre" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME
);
INSERT INTO "new_Result" ("bimestre", "createdAt", "disciplina", "id", "nota", "updatedAt") SELECT "bimestre", "createdAt", "disciplina", "id", "nota", "updatedAt" FROM "Result";
DROP TABLE "Result";
ALTER TABLE "new_Result" RENAME TO "Result";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;

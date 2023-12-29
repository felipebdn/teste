-- CreateTable
CREATE TABLE "Result" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "nota" REAL NOT NULL,
    "disciplina" TEXT NOT NULL,
    "bimestre" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL,
    "updatedAt" DATETIME
);

-- CreateTable
CREATE TABLE "Staff" (
    "staffId" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "lastName" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "Client" (
    "companyId" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "companyName" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "Appointments" (
    "appointmentId" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "startDate" DATETIME NOT NULL,
    "endDate" DATETIME NOT NULL,
    "staffId" INTEGER NOT NULL,
    "companyId" INTEGER NOT NULL
);

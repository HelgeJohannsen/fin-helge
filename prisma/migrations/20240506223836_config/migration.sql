-- CreateTable
CREATE TABLE "Session" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "shop" TEXT NOT NULL,
    "state" TEXT NOT NULL,
    "isOnline" BOOLEAN NOT NULL DEFAULT false,
    "scope" TEXT,
    "expires" DATETIME,
    "accessToken" TEXT NOT NULL,
    "userId" BIGINT
);

-- CreateTable
CREATE TABLE "Config" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "username" TEXT NOT NULL,
    "vendorId" TEXT NOT NULL,
    "clientId" TEXT NOT NULL,
    "laufzeiten" TEXT NOT NULL,
    "zeroMonth" TEXT NOT NULL,
    "zinsSaetze" TEXT NOT NULL,
    "aktionsZins" INTEGER NOT NULL DEFAULT 0,
    "aktionsZinsMonate" INTEGER NOT NULL DEFAULT 0,
    "shop" TEXT NOT NULL,
    "hash" TEXT NOT NULL,
    "apiKey" TEXT NOT NULL,
    "passwort" TEXT NOT NULL,
    "minBestellwert" INTEGER NOT NULL DEFAULT 11000,
    "isLive" BOOLEAN NOT NULL DEFAULT false
);

-- CreateIndex
CREATE UNIQUE INDEX "Config_shop_key" ON "Config"("shop");

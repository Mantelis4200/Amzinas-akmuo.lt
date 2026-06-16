-- CreateEnum
CREATE TYPE "ServiceType" AS ENUM ('ANTKAPIS', 'RESTAURAVIMAS', 'KAPAVIETES_IRENGIMAS', 'KITA');

-- CreateEnum
CREATE TYPE "LeadStatus" AS ENUM ('NAUJAS', 'SUSISIEKTA', 'PASIULYMAS', 'LAIMETA', 'PRARASTA');

-- CreateTable
CREATE TABLE "Lead" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "name" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "email" TEXT,
    "serviceType" "ServiceType" NOT NULL,
    "message" TEXT NOT NULL,
    "source" TEXT NOT NULL DEFAULT '/',
    "status" "LeadStatus" NOT NULL DEFAULT 'NAUJAS',
    "notes" TEXT NOT NULL DEFAULT '',

    CONSTRAINT "Lead_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

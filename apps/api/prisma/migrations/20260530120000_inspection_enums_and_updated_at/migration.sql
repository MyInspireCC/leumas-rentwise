-- CreateEnum
CREATE TYPE "InspectionStatus" AS ENUM ('PENDING', 'ACCEPTED', 'REJECTED');

-- CreateEnum
CREATE TYPE "InspectionPaymentStatus" AS ENUM ('UNPAID', 'PAID', 'REFUNDED');

-- AlterTable
ALTER TABLE "Inspection" ADD COLUMN "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;

-- AlterTable
ALTER TABLE "Inspection" ALTER COLUMN "status" DROP DEFAULT;
ALTER TABLE "Inspection" ALTER COLUMN "status" TYPE "InspectionStatus" USING ("status"::"InspectionStatus");
ALTER TABLE "Inspection" ALTER COLUMN "status" SET DEFAULT 'PENDING';

-- AlterTable
ALTER TABLE "Inspection" ALTER COLUMN "paymentStatus" DROP DEFAULT;
ALTER TABLE "Inspection" ALTER COLUMN "paymentStatus" TYPE "InspectionPaymentStatus" USING ("paymentStatus"::"InspectionPaymentStatus");
ALTER TABLE "Inspection" ALTER COLUMN "paymentStatus" SET DEFAULT 'UNPAID';

-- CreateTable
CREATE TABLE "VerificationOtp" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "otp" TEXT NOT NULL,
    "expires" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "VerificationOtp_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "VerificationOtp_otp_key" ON "VerificationOtp"("otp");

-- CreateIndex
CREATE UNIQUE INDEX "VerificationOtp_email_otp_key" ON "VerificationOtp"("email", "otp");

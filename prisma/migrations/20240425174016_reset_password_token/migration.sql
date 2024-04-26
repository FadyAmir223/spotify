-- CreateTable
CREATE TABLE "resetPasswordToken" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "token" TEXT NOT NULL,
    "expires" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "resetPasswordToken_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "resetPasswordToken_token_key" ON "resetPasswordToken"("token");

-- CreateIndex
CREATE UNIQUE INDEX "resetPasswordToken_email_token_key" ON "resetPasswordToken"("email", "token");

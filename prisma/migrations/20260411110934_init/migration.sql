-- CreateEnum
CREATE TYPE "TransferType" AS ENUM ('IN', 'OUT', 'DAMAGED');

-- CreateTable
CREATE TABLE "user" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "emailVerified" BOOLEAN NOT NULL DEFAULT false,
    "image" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "role" TEXT DEFAULT 'user',
    "banned" BOOLEAN DEFAULT false,
    "banReason" TEXT,
    "banExpires" TIMESTAMP(3),
    "username" TEXT,
    "displayUsername" TEXT,

    CONSTRAINT "user_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "session" (
    "id" TEXT NOT NULL,
    "expiresAt" TIMESTAMP(3) NOT NULL,
    "token" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "ipAddress" TEXT,
    "userAgent" TEXT,
    "userId" TEXT NOT NULL,
    "impersonatedBy" TEXT,

    CONSTRAINT "session_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "account" (
    "id" TEXT NOT NULL,
    "accountId" TEXT NOT NULL,
    "providerId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "accessToken" TEXT,
    "refreshToken" TEXT,
    "idToken" TEXT,
    "accessTokenExpiresAt" TIMESTAMP(3),
    "refreshTokenExpiresAt" TIMESTAMP(3),
    "scope" TEXT,
    "password" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "account_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "item" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "price" INTEGER NOT NULL,
    "stock" INTEGER NOT NULL DEFAULT 0,
    "unit" TEXT NOT NULL DEFAULT 'pcs',
    "image" TEXT,
    "isMaterial" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "item_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "product" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "price" INTEGER NOT NULL,
    "image" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "product_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "product_item" (
    "qty" INTEGER NOT NULL DEFAULT 0,
    "productId" TEXT NOT NULL,
    "itemId" TEXT NOT NULL,

    CONSTRAINT "product_item_pkey" PRIMARY KEY ("productId","itemId")
);

-- CreateTable
CREATE TABLE "outlet" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "location" TEXT,
    "latitude" TEXT,
    "longitude" TEXT,

    CONSTRAINT "outlet_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "outlet_stock" (
    "id" TEXT NOT NULL,
    "stock" INTEGER NOT NULL DEFAULT 0,
    "outletId" TEXT NOT NULL,
    "itemId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "outlet_stock_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "stock_transfer" (
    "id" SERIAL NOT NULL,
    "type" "TransferType" NOT NULL DEFAULT 'IN',
    "outletId" TEXT,
    "note" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "createdById" TEXT NOT NULL,

    CONSTRAINT "stock_transfer_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "stock_transfer_item" (
    "id" TEXT NOT NULL,
    "qty" INTEGER NOT NULL DEFAULT 0,
    "stockTransferId" INTEGER NOT NULL,
    "itemId" TEXT NOT NULL,

    CONSTRAINT "stock_transfer_item_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "shift" (
    "id" SERIAL NOT NULL,
    "start" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "end" TIMESTAMP(3),
    "isOpen" BOOLEAN NOT NULL DEFAULT true,
    "outletId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,

    CONSTRAINT "shift_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "purchase" (
    "id" SERIAL NOT NULL,
    "title" TEXT,
    "total" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "createdById" TEXT NOT NULL,

    CONSTRAINT "purchase_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "purchase_item" (
    "id" SERIAL NOT NULL,
    "qty" INTEGER NOT NULL,
    "price" INTEGER NOT NULL,
    "purchaseId" INTEGER NOT NULL,
    "itemId" TEXT NOT NULL,

    CONSTRAINT "purchase_item_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "sale" (
    "id" SERIAL NOT NULL,
    "title" TEXT,
    "total" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "outletId" TEXT NOT NULL,

    CONSTRAINT "sale_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "sale_item" (
    "id" SERIAL NOT NULL,
    "qty" INTEGER NOT NULL,
    "price" INTEGER NOT NULL,
    "saleId" INTEGER NOT NULL,
    "productId" TEXT NOT NULL,

    CONSTRAINT "sale_item_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "user_email_key" ON "user"("email");

-- CreateIndex
CREATE UNIQUE INDEX "user_username_key" ON "user"("username");

-- CreateIndex
CREATE INDEX "session_userId_idx" ON "session"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "session_token_key" ON "session"("token");

-- CreateIndex
CREATE INDEX "account_userId_idx" ON "account"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "outlet_stock_outletId_itemId_key" ON "outlet_stock"("outletId", "itemId");

-- CreateIndex
CREATE UNIQUE INDEX "stock_transfer_item_stockTransferId_itemId_key" ON "stock_transfer_item"("stockTransferId", "itemId");

-- CreateIndex
CREATE UNIQUE INDEX "purchase_item_purchaseId_itemId_key" ON "purchase_item"("purchaseId", "itemId");

-- CreateIndex
CREATE UNIQUE INDEX "sale_item_saleId_productId_key" ON "sale_item"("saleId", "productId");

-- AddForeignKey
ALTER TABLE "session" ADD CONSTRAINT "session_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "account" ADD CONSTRAINT "account_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "product_item" ADD CONSTRAINT "product_item_productId_fkey" FOREIGN KEY ("productId") REFERENCES "product"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "product_item" ADD CONSTRAINT "product_item_itemId_fkey" FOREIGN KEY ("itemId") REFERENCES "item"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "outlet_stock" ADD CONSTRAINT "outlet_stock_outletId_fkey" FOREIGN KEY ("outletId") REFERENCES "outlet"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "outlet_stock" ADD CONSTRAINT "outlet_stock_itemId_fkey" FOREIGN KEY ("itemId") REFERENCES "item"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "stock_transfer" ADD CONSTRAINT "stock_transfer_outletId_fkey" FOREIGN KEY ("outletId") REFERENCES "outlet"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "stock_transfer" ADD CONSTRAINT "stock_transfer_createdById_fkey" FOREIGN KEY ("createdById") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "stock_transfer_item" ADD CONSTRAINT "stock_transfer_item_stockTransferId_fkey" FOREIGN KEY ("stockTransferId") REFERENCES "stock_transfer"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "stock_transfer_item" ADD CONSTRAINT "stock_transfer_item_itemId_fkey" FOREIGN KEY ("itemId") REFERENCES "item"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "shift" ADD CONSTRAINT "shift_outletId_fkey" FOREIGN KEY ("outletId") REFERENCES "outlet"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "shift" ADD CONSTRAINT "shift_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "purchase" ADD CONSTRAINT "purchase_createdById_fkey" FOREIGN KEY ("createdById") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "purchase_item" ADD CONSTRAINT "purchase_item_purchaseId_fkey" FOREIGN KEY ("purchaseId") REFERENCES "purchase"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "purchase_item" ADD CONSTRAINT "purchase_item_itemId_fkey" FOREIGN KEY ("itemId") REFERENCES "item"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "sale" ADD CONSTRAINT "sale_outletId_fkey" FOREIGN KEY ("outletId") REFERENCES "outlet"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "sale_item" ADD CONSTRAINT "sale_item_saleId_fkey" FOREIGN KEY ("saleId") REFERENCES "sale"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "sale_item" ADD CONSTRAINT "sale_item_productId_fkey" FOREIGN KEY ("productId") REFERENCES "product"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

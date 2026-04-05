'use server'

import { z } from 'zod'
import { db } from '@/lib/prisma'

//////////////////////////////
// SCHEMA
//////////////////////////////

const addStockSchema = z.object({
    itemId: z.string(),
    qty: z.coerce.number().int().positive()
})

const distributeStockSchema = z.object({
    itemId: z.string(),
    qty: z.coerce.number().int().positive(),
    outletId: z.string()
})

const adjustStockSchema = z.object({
    itemId: z.string(),
    qty: z.coerce.number().int().positive(),
    note: z.string().optional()
})

//////////////////////////////
// ADD STOCK (IN)
//////////////////////////////

export async function addStock(_: any, formData: FormData) {
    const result = addStockSchema.safeParse(Object.fromEntries(formData))

    if (!result.success) {
        return {
            success: false,
            message: z.flattenError(result.error).fieldErrors
        }
    }

    const { itemId, qty } = result.data

    const item = await db.item.findUnique({ where: { id: itemId } })
    if (!item) throw new Error('Item tidak ditemukan')

    try {
        await db.$transaction([
            db.stock.upsert({
                where: { itemId },
                update: { qty: { increment: qty } },
                create: { itemId, qty, createdById: userId }
            }),

            db.stockMovement.create({
                data: {
                    itemId,
                    qty,
                    type: 'IN',
                    createdById: userId
                }
            })
        ])

        return { success: true, message: 'Stok berhasil ditambahkan' }
    } catch (error: any) {
        return {
            success: false,
            message: error?.message
        }
    }
}

//////////////////////////////
// DISTRIBUTE STOCK (OUT)
//////////////////////////////

export async function distributeStock(_: any, formData: FormData) {
    const result = distributeStockSchema.safeParse(Object.fromEntries(formData))

    if (!result.success) {
        return {
            success: false,
            message: z.flattenError(result.error).fieldErrors
        }
    }

    const { itemId, qty, outletId, userId } = result.data

    const item = await db.item.findUnique({ where: { id: itemId } })
    if (!item) throw new Error('Item tidak ditemukan')

    try {
        await db.$transaction(async (tx) => {
            const stock = await tx.stock.findUnique({
                where: { itemId }
            })

            if (!stock || stock.qty < qty) {
                throw new Error('Stok tidak cukup')
            }

            await tx.stock.update({
                where: { itemId },
                data: {
                    qty: { decrement: qty }
                }
            })

            await tx.stockMovement.create({
                data: {
                    itemId,
                    qty,
                    type: 'OUT',
                    outletId,
                    createdById: userId
                }
            })
        })

        return { success: true, message: 'Stok berhasil dikirim ke outlet' }
    } catch (error: any) {
        return {
            success: false,
            message: error?.message
        }
    }
}

//////////////////////////////
// ADJUST STOCK
//////////////////////////////

export async function adjustStock(_: any, formData: FormData) {
    const result = adjustStockSchema.safeParse(Object.fromEntries(formData))

    if (!result.success) {
        return {
            success: false,
            message: z.flattenError(result.error).fieldErrors
        }
    }

    const { itemId, qty, note, userId } = result.data

    const item = await db.item.findUnique({ where: { id: itemId } })
    if (!item) throw new Error('Item tidak ditemukan')

    try {
        await db.$transaction(async (tx) => {
            const stock = await tx.stock.findUnique({
                where: { itemId }
            })

            if (!stock) {
                throw new Error('Stock tidak ditemukan')
            }

            // contoh: adjust = set ulang qty
            const diff = qty - stock.qty

            await tx.stock.update({
                where: { itemId },
                data: {
                    qty
                }
            })

            await tx.stockMovement.create({
                data: {
                    itemId,
                    qty: Math.abs(diff),
                    type: 'ADJUST',
                    note,
                    createdById: userId
                }
            })
        })

        return { success: true, message: 'Stock berhasil disesuaikan' }
    } catch (error: any) {
        return {
            success: false,
            message: error?.message
        }
    }
}

//////////////////////////////
// GET STOCK (READ)
//////////////////////////////

export async function getStocks() {
    try {
        const stocks = await db.stock.findMany({
            include: {
                item: true
            },
            orderBy: {
                updatedAt: 'desc'
            }
        })

        return { success: true, data: stocks }
    } catch (error: any) {
        return {
            success: false,
            message: error?.message
        }
    }
}

//////////////////////////////
// GET STOCK MOVEMENTS
//////////////////////////////

export async function getStockMovements() {
    try {
        const movements = await db.stockMovement.findMany({
            include: {
                item: true,
                createdBy: true,
                outlet: true
            },
            orderBy: {
                createdAt: 'desc'
            }
        })

        return { success: true, data: movements }
    } catch (error: any) {
        return {
            success: false,
            message: error?.message
        }
    }
}

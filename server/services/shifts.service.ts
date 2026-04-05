'use server'

import { z } from 'zod'
import { db } from '@/lib/prisma'

//////////////////////////////
// SCHEMA
//////////////////////////////

const openShiftSchema = z.object({
    userId: z.string(),
    outletId: z.string(),
    initialCash: z.coerce.number().min(0)
})

const closeShiftSchema = z.object({
    shiftId: z.string(),
    finalCash: z.coerce.number().min(0),
    userId: z.string()
})

const sellItemSchema = z.object({
    shiftId: z.string(),
    itemId: z.string(),
    qty: z.coerce.number().int().positive(),
    price: z.coerce.number().min(0),
    userId: z.string()
})

const addExpenseSchema = z.object({
    shiftId: z.string(),
    name: z.string(),
    amount: z.coerce.number().positive(),
    userId: z.string()
})

//////////////////////////////
// OPEN SHIFT
//////////////////////////////

export async function openShift(_: any, formData: FormData) {
    const result = openShiftSchema.safeParse(Object.fromEntries(formData))

    if (!result.success) {
        return {
            success: false,
            message: z.flattenError(result.error).fieldErrors
        }
    }

    const { userId, outletId } = result.data

    try {
        // cek shift masih open
        const existing = await db.shift.findFirst({
            where: {
                userId,
                closedAt: null
            }
        })

        if (existing) {
            throw new Error('Masih ada shift yang belum ditutup')
        }

        await db.shift.create({
            data: {
                userId,
                outletId,
                date: new Date()
            }
        })

        return { success: true, message: 'Shift berhasil dibuka' }
    } catch (error: any) {
        return {
            success: false,
            message: error?.message
        }
    }
}

//////////////////////////////
// SELL ITEM
//////////////////////////////

export async function sellItem(_: any, formData: FormData) {
    const result = sellItemSchema.safeParse(Object.fromEntries(formData))

    if (!result.success) {
        return {
            success: false,
            message: z.flattenError(result.error).fieldErrors
        }
    }

    const { shiftId, itemId, qty, price, userId } = result.data

    try {
        await db.$transaction(async (tx) => {
            const shift = await tx.shift.findUnique({
                where: { id: shiftId }
            })

            if (!shift || shift.status === 'CLOSED') {
                throw new Error('Shift tidak aktif')
            }

            const stock = await tx.stock.findUnique({
                where: { itemId }
            })

            if (!stock || stock.qty < qty) {
                throw new Error('Stok tidak cukup')
            }

            const total = qty * price

            // kurangi stok
            await tx.stock.update({
                where: { itemId },
                data: {
                    qty: { decrement: qty }
                }
            })

            // catat movement
            await tx.stockMovement.create({
                data: {
                    itemId,
                    qty,
                    type: 'OUT',
                    createdById: userId
                }
            })

            // simpan sale
            await tx.sale.create({
                data: {
                    shiftId,
                    itemId,
                    qty,
                    price,
                    total,
                    createdById: userId
                }
            })
        })

        return { success: true, message: 'Penjualan berhasil' }
    } catch (error: any) {
        return {
            success: false,
            message: error?.message
        }
    }
}

//////////////////////////////
// ADD EXPENSE
//////////////////////////////

export async function addExpense(_: any, formData: FormData) {
    const result = addExpenseSchema.safeParse(Object.fromEntries(formData))

    if (!result.success) {
        return {
            success: false,
            message: z.flattenError(result.error).fieldErrors
        }
    }

    const { shiftId, name, amount, userId } = result.data

    try {
        const shift = await db.shift.findUnique({
            where: { id: shiftId }
        })

        if (!shift || shift.status === 'CLOSED') {
            throw new Error('Shift tidak aktif')
        }

        await db.expense.create({
            data: {
                shiftId,
                name,
                amount,
                createdById: userId
            }
        })

        return { success: true, message: 'Expense berhasil ditambahkan' }
    } catch (error: any) {
        return {
            success: false,
            message: error?.message
        }
    }
}

//////////////////////////////
// CLOSE SHIFT
//////////////////////////////

export async function closeShift(_: any, formData: FormData) {
    const result = closeShiftSchema.safeParse(Object.fromEntries(formData))

    if (!result.success) {
        return {
            success: false,
            message: z.flattenError(result.error).fieldErrors
        }
    }

    const { shiftId, finalCash, userId } = result.data

    const shift = await db.shift.findUnique({
        where: { id: shiftId },
        include: {
            sales: true,
            expenses: true
        }
    })

    if (!shift || shift.status === 'CLOSED') {
        throw new Error('Shift tidak ditemukan / sudah ditutup')
    }

    try {
        const totalSales = shift.sales.reduce((sum, s) => sum + s.total, 0)
        const totalExpense = shift.expenses.reduce((sum, e) => sum + e.amount, 0)

        const expectedCash = shift.initialCash + totalSales - totalExpense
        const difference = finalCash - expectedCash

        await db.shift.update({
            where: { id: shiftId },
            data: {
                finalCash,
                totalSales,
                totalExpense,
                difference,
                closedById: userId
            }
        })

        return {
            success: true,
            message: 'Shift berhasil ditutup',
            data: {
                totalSales,
                totalExpense,
                expectedCash,
                difference
            }
        }
    } catch (error: any) {
        return {
            success: false,
            message: error?.message
        }
    }
}

//////////////////////////////
// GET ACTIVE SHIFT
//////////////////////////////

export async function getActiveShift(userId: string) {
    try {
        const shift = await db.shift.findFirst({
            where: {
                userId,
                closedAt: null
            },
            include: {
                sales: true,
                expenses: true
            }
        })

        return { success: true, data: shift }
    } catch (error: any) {
        return {
            success: false,
            message: error?.message
        }
    }
}

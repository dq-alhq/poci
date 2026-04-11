'use server'

import z from 'zod'
import db from '@/lib/prisma'

const addOutletStockSchema = z.array(
    z.object({
        itemId: z.string(),
        qty: z.number(),
        outletId: z.string()
    })
)

export const addOutletStock = async ({ items }: { items: { itemId: string; qty: number; outletId: string }[] }) => {
    const { data, success, error } = addOutletStockSchema.safeParse({ items })
    if (!success) {
        return {
            success: false,
            error: z.flattenError(error).fieldErrors
        }
    }

    try {
        await db.outletStock.createMany({
            data
        })
        return {
            success: true,
            message: 'Stok outlet berhasil ditambahkan'
        }
    } catch (error: any) {
        return {
            success: false,
            error: error.message
        }
    }
}

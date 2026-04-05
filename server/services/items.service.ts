'use server'

import z from 'zod'
import db from '@/lib/prisma'

const itemSchema = z
    .object({
        id: z.string().optional(),
        name: z.string().min(1, 'Nama produk harus diisi'),
        price: z.number().min(1, 'Harga produk harus diisi'),
        sellPrice: z.number().optional(),
        unit: z.string().min(1, 'Satuan produk harus diisi'),
        isProduct: z.coerce.boolean(),
        image: z.string().optional()
    })
    .refine(
        (data) => {
            if (data.isProduct) {
                return !!data.sellPrice
            }
            return true
        },
        {
            message: 'Harga jual produk harus diisi',
            path: ['sellPrice']
        }
    )

export async function createItem(_: any, formData: FormData) {
    const { data, success, error } = itemSchema.safeParse(Object.fromEntries(formData))
    if (!success) {
        return {
            success: false,
            error: z.flattenError(error).fieldErrors
        }
    }

    try {
        await db.item.create({
            data
        })
        return {
            success: true,
            message: 'Item berhasil dibuat'
        }
    } catch (error: any) {
        return {
            success: false,
            error: error.message
        }
    }
}

export async function sellItem({ shiftId, itemId, qty }: { shiftId: string; itemId: string; qty: number }) {
    const item = await db.shiftItem.findUnique({
        where: { shiftId_itemId: { shiftId, itemId } }
    })

    if (!item) throw new Error('Item tidak ada di shift')

    const available = item.qtyOut - item.qtySold - item.qtyWaste - item.qtyReturn

    if (available < qty) {
        throw new Error('Stok shift tidak cukup')
    }

    await db.shiftItem.update({
        where: { id: item.id },
        data: {
            qtySold: { increment: qty }
        }
    })
}

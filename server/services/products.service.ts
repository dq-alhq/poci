'use server'

import { revalidatePath } from 'next/cache'
import z from 'zod'
import db from '@/lib/prisma'

const productSchema = z
    .object({
        id: z.string().optional(),
        name: z.string().min(1, 'Nama produk harus diisi'),
        sellPrice: z.number().default(0),
        buyPrice: z.number().default(0),
        qty: z.number().default(0),
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

export async function createProduct(_: any, formData: FormData) {
    const { data, success, error } = productSchema.safeParse(Object.fromEntries(formData))
    if (!success) {
        return {
            success: false,
            error: z.flattenError(error).fieldErrors
        }
    }

    try {
        await db.product.create({
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

export const modifyStock = async (id: string, qty: number) => {
    try {
        await db.product.update({
            where: { id },
            data: { qty }
        })
        revalidatePath('/dashboard/stok')
        return {
            success: true,
            message: 'Stok berhasil diubah'
        }
    } catch (error: any) {
        return {
            success: false,
            error: error.message
        }
    }
}

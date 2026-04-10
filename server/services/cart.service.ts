'use server'

import { headers } from 'next/headers'
import z from 'zod'
import { auth } from '@/lib/auth'
import db from '@/lib/prisma'

const cartSchema = z.array(
    z.object({
        productId: z.string(),
        qty: z.coerce.number(),
        price: z.coerce.number(),
        total: z.coerce.number()
    })
)

export const addToCart = async (_: any, formData: FormData) => {
    const session = await auth.api.getSession({
        headers: await headers()
    })
    if (!session?.user) {
        return {
            success: false,
            message: 'Anda tidak berhak'
        }
    }

    const rawItems: { productId: string; qty: number; price: number; total: number }[] = []

    for (const [key, value] of formData) {
        if (!key.startsWith('qty-')) continue
        if (Number(value) <= 0) continue
        const productId = key.replace('qty-', '')
        rawItems.push({
            productId,
            qty: Number(value),
            price: Number(formData.get(`price-${productId}`) || '0'),
            total: Number(value) * Number(formData.get(`price-${productId}`) || '0')
        })
    }

    if (rawItems.length === 0) {
        return {
            success: false,
            error: 'Tidak ada item yang dipilih'
        }
    }

    const { data, success, error } = cartSchema.safeParse(rawItems)
    if (!success) {
        return {
            success: false,
            error: z.flattenError(error).fieldErrors
        }
    }

    try {
        await db.cart.createMany({
            data: data.map((item) => ({
                ...item,
                userId: session.user.id
            }))
        })
        return {
            success: true,
            message: 'Items ditambahkan ke Keranjang'
        }
    } catch (error: any) {
        return {
            success: false,
            error: error.message
        }
    }
}

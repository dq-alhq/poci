'use server'

import { revalidatePath } from 'next/cache'
import z from 'zod'
import db from '@/lib/prisma'

const productSchema = z.object({
    id: z.string().optional(),
    name: z.string().min(1, 'Nama produk harus diisi'),
    price: z.coerce.number().default(0),
    image: z.string().optional(),
    productItems: z.array(
        z
            .object({
                itemId: z.string(),
                qty: z.coerce.number().default(1)
            })
            .optional()
    )
})

export async function upsertProduct({ id, name, price, image, productItems }: z.infer<typeof productSchema>) {
    const { data, success, error } = productSchema.safeParse({ id, name, price, image, productItems })
    if (!success) {
        return {
            success: false,
            error: z.flattenError(error).fieldErrors
        }
    }

    try {
        if (data.id) {
            if (data.image) {
                const old = await db.product.findUnique({
                    where: { id: data.id }
                })
                if (old?.image && old.image !== data.image) {
                    await fetch(`${process.env.NEXT_PUBLIC_APP_URL}/api/blob`, {
                        method: 'DELETE',
                        body: JSON.stringify({ url: old.image, method: 'DELETE' })
                    })
                }
            }
            await Promise.all([
                await db.product.update({
                    where: { id: data.id },
                    data: {
                        name: data.name,
                        price: data.price,
                        image: data.image
                    }
                }),
                db.productItem.deleteMany({
                    where: {
                        productId: data.id || ''
                    }
                }),
                db.productItem.createMany({
                    data:
                        data.productItems
                            ?.filter((item) => item?.itemId && item?.qty > 0)
                            .map((item) => ({
                                itemId: item?.itemId || '',
                                qty: item?.qty || 0,
                                productId: data.id || ''
                            })) || []
                })
            ])
        } else {
            await db.product.create({
                data: {
                    name: data.name,
                    price: data.price,
                    image: data.image,
                    productItems: {
                        createMany: {
                            data:
                                data.productItems
                                    ?.filter((item) => item?.itemId && item?.qty > 0)
                                    .map((item) => ({
                                        itemId: item?.itemId || '',
                                        qty: item?.qty || 0
                                    })) || []
                        }
                    }
                }
            })
        }
        revalidatePath('/dashboard/produk')
        return {
            success: true,
            message: data.id ? 'Produk berhasil diupdate' : 'Produk berhasil dibuat'
        }
    } catch (error: any) {
        return {
            success: false,
            error: error.message
        }
    }
}

export const deleteProduct = async (id: string) => {
    try {
        const product = await db.product.findUnique({
            where: { id }
        })
        if (!product) {
            return {
                success: false,
                error: 'Item tidak ditemukan'
            }
        }
        if (product.image) {
            await fetch(`${process.env.NEXT_PUBLIC_APP_URL}/api/blob`, {
                method: 'DELETE',
                body: JSON.stringify({ url: product.image, method: 'DELETE' })
            })
        }
        await db.product.delete({
            where: { id }
        })
        revalidatePath('/dashboard/produk')
        return {
            success: true,
            message: 'Item berhasil dihapus'
        }
    } catch (error: any) {
        return {
            success: false,
            error: error.message
        }
    }
}

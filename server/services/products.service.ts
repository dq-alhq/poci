'use server'

import { revalidatePath } from 'next/cache'
import { headers } from 'next/headers'
import z from 'zod'
import { TransferType } from '@/generated/prisma/enums'
import { auth } from '@/lib/auth'
import db from '@/lib/prisma'

const productSchema = z
    .object({
        id: z.string().optional(),
        name: z.string().min(1, 'Nama produk harus diisi'),
        sellPrice: z.coerce.number().default(0),
        buyPrice: z.coerce.number().default(0),
        qty: z.coerce.number().default(0),
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

export async function upsertProduct(_: any, formData: FormData) {
    const { data, success, error } = productSchema.safeParse(Object.fromEntries(formData))
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
            await db.product.update({
                where: { id: data.id },
                data
            })
            revalidatePath('/dashboard/produk')
            return {
                success: true,
                message: 'Item berhasil diupdate'
            }
        } else {
            await db.product.create({
                data
            })
            revalidatePath('/dashboard/produk')
            return {
                success: true,
                message: 'Item berhasil dibuat'
            }
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

export const getProduct = async (id: string) => {
    return await db.product.findUnique({
        where: {
            id
        }
    })
}

const stockSchema = z.object({
    note: z.string().optional(),
    outletId: z.string().optional(),
    type: z.enum(TransferType),
    items: z.array(
        z.object({
            productId: z.string().min(1, 'Produk harus dipilih'),
            qty: z.coerce.number().default(0)
        })
    )
})

export const updateStock = async (_: any, formData: FormData) => {
    const session = await auth.api.getSession({
        headers: await headers()
    })
    if (!session?.user) {
        return {
            success: false,
            message: 'Anda tidak berhak'
        }
    }

    const rawItems: { productId: string; qty: number }[] = []

    for (const [key, value] of formData.entries()) {
        if (!key.startsWith('qty-')) continue

        const productId = key.replace('qty-', '')
        const qty = Number(value)

        if (qty <= 0) continue

        rawItems.push({ productId, qty })
    }

    const parsedData = {
        items: rawItems,
        note: formData.get('note')?.toString(),
        outletId: formData.get('outletId')?.toString(),
        type: formData.get('type')
    }

    const { data, success, error } = stockSchema.safeParse(parsedData)
    if (!success) {
        return {
            success: false,
            error: z.flattenError(error).fieldErrors
        }
    }

    try {
        await db.stockTransfer.create({
            data: {
                type: data.type,
                note: data.note,
                outletId: data.outletId,
                createdById: session.user.id,
                items: {
                    createMany: {
                        data: data.items
                    }
                }
            }
        })
        data.items.forEach(async (item) => {
            if (data.type === TransferType.IN || data.type === TransferType.RETURN) {
                await db.product.update({
                    where: { id: item.productId },
                    data: {
                        qty: {
                            increment: item.qty
                        }
                    }
                })
            } else {
                await db.product.update({
                    where: { id: item.productId },
                    data: {
                        qty: {
                            decrement: item.qty
                        }
                    }
                })
            }
        })
        revalidatePath('/dashboard/stok')
        return {
            success: true,
            message: 'Stok berhasil diupdate'
        }
    } catch (error: any) {
        return {
            success: false,
            error: error.message
        }
    }
}

export const modifyStock = async (id: string, qty: number, type: TransferType) => {
    const session = await auth.api.getSession({
        headers: await headers()
    })
    if (!session?.user) {
        return {
            success: false,
            message: 'Anda tidak berhak'
        }
    }
    try {
        await Promise.all([
            db.stockTransfer.create({
                data: {
                    items: {
                        create: {
                            productId: id,
                            qty
                        }
                    },
                    type,
                    createdById: session.user.id
                }
            }),
            db.product.update({
                where: { id },
                data: { qty }
            })
        ])
        revalidatePath('/dashboard/stok')
        return {
            success: true,
            message: 'Stok berhasil diubah'
        }
    } catch (error: any) {
        return {
            success: false,
            message: error.message
        }
    }
}

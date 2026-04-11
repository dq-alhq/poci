'use server'

import { revalidatePath } from 'next/cache'
import { headers } from 'next/headers'
import z from 'zod'
import { auth } from '@/lib/auth'
import db from '@/lib/prisma'
import { updateStock } from './item.service'

const purchaseSchema = z.object({
    title: z.string().min(1, 'Judul tidak boleh kosong'),
    total: z.number().positive('Total harus positif'),
    items: z
        .array(
            z.object({
                itemId: z.string(),
                qty: z.coerce.number(),
                price: z.coerce.number()
            })
        )
        .optional()
})

export const createPurchase = async ({ title, total, items }: z.infer<typeof purchaseSchema>) => {
    const session = await auth.api.getSession({
        headers: await headers()
    })
    if (!session?.user) {
        return {
            success: false,
            error: 'Anda tidak berhak'
        }
    }

    const { data, success, error } = purchaseSchema.safeParse({ title, total, items })
    if (!success) {
        return {
            success: false,
            error: z.flattenError(error).fieldErrors
        }
    }

    try {
        if (data?.items && data?.items.length > 0) {
            await Promise.all([
                db.purchase.create({
                    data: {
                        title: data.title,
                        total: data.total,
                        createdById: session.user.id,
                        items: {
                            createMany: {
                                data: data.items
                            }
                        }
                    }
                }),
                updateStock({
                    note: data.title,
                    type: 'IN',
                    items: data.items
                })
            ])
        } else {
            await db.purchase.create({
                data: {
                    title: data.title,
                    total: data.total,
                    createdById: session.user.id
                }
            })
        }

        revalidatePath('/dashboard/purchases')
        return {
            success: true,
            message: 'Pembelanjaan berhasil dibuat'
        }
    } catch (error: any) {
        return {
            success: false,
            error: error.message
        }
    }
}

export const deletePurchase = async (id: number) => {
    try {
        await db.purchase.delete({
            where: { id }
        })
        revalidatePath('/dashboard/purchases')
        return {
            success: true,
            message: 'Pembelanjaan berhasil dihapus'
        }
    } catch (error: any) {
        return {
            success: false,
            message: error.message
        }
    }
}

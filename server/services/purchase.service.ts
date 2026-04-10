'use server'

import { headers } from 'next/headers'
import z from 'zod'
import { PurchaseType } from '@/generated/prisma/enums'
import { auth } from '@/lib/auth'

const purchaseSchema = z.object({
    supplier: z.string(),
    title: z.string(),
    type: z.enum(PurchaseType),
    total: z.coerce.number(),
    items: z
        .array(
            z.object({
                productId: z.string(),
                quantity: z.coerce.number(),
                price: z.coerce.number()
            })
        )
        .optional()
})

export const createPurchase = async (_: any, formData: FormData) => {
    const session = await auth.api.getSession({
        headers: await headers()
    })
    if (!session?.user) {
        return {
            success: false,
            message: 'Anda tidak berhak'
        }
    }

    const rawItems: { productId: string; qty: number; price: number }[] = []

    for (const [key, value] of formData.entries()) {
        if (!key.startsWith('qty-')) continue

        const productId = key.replace('qty-', '')
        const qty = Number(value)

        if (qty <= 0) continue

        rawItems.push({ productId, qty, price: 0 })
    }

    const parsedData = {
        items: rawItems,
        note: formData.get('note')?.toString(),
        outletId: formData.get('outletId')?.toString(),
        type: formData.get('type')
    }

    const { data, success, error } = purchaseSchema.safeParse(parsedData)
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

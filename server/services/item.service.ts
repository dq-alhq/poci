'use server'

import { revalidatePath } from 'next/cache'
import { headers } from 'next/headers'
import z from 'zod'
import { TransferType } from '@/generated/prisma/enums'
import { auth } from '@/lib/auth'
import db from '@/lib/prisma'

const updateStockSchema = z.object({
    note: z.string().optional(),
    outletId: z.string().optional(),
    type: z.enum(TransferType),
    items: z.array(
        z.object({
            itemId: z.string().min(1, 'Item harus dipilih'),
            qty: z.coerce.number().default(0)
        })
    )
})

export const updateStock = async ({ note, outletId, type, items }: z.infer<typeof updateStockSchema>) => {
    const session = await auth.api.getSession({
        headers: await headers()
    })
    if (!session?.user) {
        return {
            success: false,
            error: 'Anda tidak berhak'
        }
    }

    const { data, success, error } = updateStockSchema.safeParse({ note, outletId, type, items })
    if (!success) {
        return {
            success: false,
            error: z.flattenError(error).fieldErrors
        }
    }

    try {
        await Promise.all([
            db.stockTransfer.create({
                data: {
                    type: data.type,
                    note: data.note,
                    outletId: data.outletId,
                    createdById: session.user.id,
                    items: {
                        createMany: { data: data.items }
                    }
                }
            }),
            data.items.map(async (item) => {
                if (data.type === TransferType.IN) {
                    await db.item.update({
                        where: { id: item.itemId },
                        data: {
                            stock: {
                                increment: item.qty
                            }
                        }
                    })
                } else {
                    await db.item.update({
                        where: { id: item.itemId },
                        data: {
                            stock: {
                                decrement: item.qty
                            }
                        }
                    })
                }
            })
        ])
        revalidatePath('/dashboard/items')
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

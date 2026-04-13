'use server'

import db from '@/lib/prisma'
import { updateStock } from '@/server/services/item.service'

export const addOutletStock = async ({ items }: { items: { itemId: string; stock: number; outletId: string }[] }) => {
    try {
        await Promise.all([
            ...items.map((item) =>
                db.outletStock.upsert({
                    where: {
                        outletId_itemId: {
                            outletId: item.outletId,
                            itemId: item.itemId
                        }
                    },
                    update: { stock: { increment: item.stock } },
                    create: item
                })
            ),
            updateStock({
                items: items.map((item) => ({
                    itemId: item.itemId,
                    qty: item.stock
                })),
                outletId: items[0].outletId,
                type: 'OUT',
                note: 'Stok Keluar'
            })
        ])
        return {
            success: true,
            message: 'Stok outlet berhasil ditambahkan'
        }
    } catch (error: any) {
        return {
            success: false,
            message: error.message
        }
    }
}

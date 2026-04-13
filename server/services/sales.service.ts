'use server'

import db from '@/lib/prisma'

export const createSales = async ({
    items,
    total,
    shiftId,
    outletId
}: {
    total: number
    shiftId: number
    outletId: string
    items: { productId: string; qty: number; price: number }[]
}) => {
    try {
        const itemsUsed: { itemId: string; stock: number }[] = []
        await Promise.all(
            items.map(async (item) => {
                const materials = await db.productItem.findMany({
                    where: {
                        productId: item.productId
                    }
                })

                if (materials) {
                    materials.forEach((material) => {
                        itemsUsed.push({
                            itemId: material.itemId,
                            stock: item.qty * material.qty
                        })
                    })
                }
            })
        )

        const map = new Map()

        itemsUsed.forEach(({ itemId, stock }) => {
            if (!map.has(itemId)) {
                map.set(itemId, { itemId, stock: 0 })
            }
            map.get(itemId).stock += stock
        })

        const usedItems = Array.from(map.values())

        await db.$transaction(async (tx) => {
            const sale = await tx.sale.upsert({
                where: { outletId_shiftId: { outletId, shiftId } },
                create: {
                    outletId,
                    shiftId,
                    total
                },
                update: {
                    total: { increment: total }
                }
            })

            await Promise.all([
                ...items.map((item) =>
                    tx.saleItem.upsert({
                        where: {
                            saleId_productId: {
                                saleId: sale.id,
                                productId: item.productId
                            }
                        },
                        create: {
                            saleId: sale.id,
                            ...item
                        },
                        update: {
                            qty: {
                                increment: item.qty
                            }
                        }
                    })
                ),
                ...usedItems.map((item) =>
                    tx.outletStock.update({
                        where: {
                            outletId_itemId: {
                                outletId,
                                itemId: item.itemId
                            }
                        },
                        data: {
                            stock: {
                                decrement: item.stock
                            }
                        }
                    })
                )
            ])
        })

        return {
            success: true,
            message: 'Sales created successfully'
        }
    } catch (error: any) {
        return {
            success: false,
            message: error.message
        }
    }
}

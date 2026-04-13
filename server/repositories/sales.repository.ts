'use server'

import db from '@/lib/prisma'

export const getSales = async (outletId: string) => {
    const sales = await db.sale.findMany({
        where: {
            outletId
        },
        orderBy: {
            createdAt: 'desc'
        },
        include: {
            shift: {
                include: {
                    user: true
                }
            },
            items: {
                include: {
                    product: true
                }
            }
        }
    })
    const map = new Map()

    sales
        .flatMap((sale) => sale.items)
        .forEach((item) => {
            if (!map.has(item.productId)) {
                map.set(item.productId, {
                    image: item.product.image,
                    productId: item.productId,
                    name: item.product.name,
                    qty: 0,
                    total: 0
                })
            }

            const current = map.get(item.productId)
            current.qty += item.qty
            current.total += item.qty * item.price
        })

    return Array.from(map.values())
}

'use server'

import db from '@/lib/prisma'

export const getSales = async () => {
    return await db.sale.findMany({
        include: {
            items: {
                include: {
                    product: true
                }
            }
        }
    })
}

'use server'

import db from '@/lib/prisma'

export const getPurchases = async () => {
    return await db.purchase.findMany({
        include: {
            createdBy: true,
            items: {
                include: {
                    item: true
                }
            }
        }
    })
}

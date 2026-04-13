'use server'

import db from '@/lib/prisma'

export const getOutletStock = async (outletId: string) => {
    return db.outletStock.findMany({
        where: {
            outletId
        },
        orderBy: {
            item: {
                id: 'desc'
            }
        },
        include: {
            item: true
        }
    })
}

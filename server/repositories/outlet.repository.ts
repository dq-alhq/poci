'use server'

import db from '@/lib/prisma'

export const getOutlets = async () => {
    return db.outlet.findMany({ include: { shifts: true }, orderBy: { id: 'asc' } })
}

export const getOutlet = async (id: string) => {
    return db.outlet.findUnique({
        where: {
            id
        },
        include: {
            shifts: true,
            outletStocks: {
                include: {
                    item: true
                }
            }
        }
    })
}

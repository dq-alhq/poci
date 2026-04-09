'use server'

import db from '@/lib/prisma'

export const getAllOutlet = async () => {
    const data = await db.outlet.findMany({ orderBy: { id: 'asc' } })
    const count = await db.outlet.count()

    return {
        data,
        count
    }
}

export const getOutlet = async (id: string) => {
    return await db.outlet.findUnique({
        where: {
            id
        },
        include: {
            shifts: true,
            stocks: {
                include: {
                    product: true
                }
            }
        }
    })
}

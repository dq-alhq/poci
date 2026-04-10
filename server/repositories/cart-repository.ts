'use server'

import db from '@/lib/prisma'

export const getCartItems = async () => {
    return await db.cart.findMany({
        include: {
            product: true
        }
    })
}

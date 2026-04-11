'use server'

import db from '@/lib/prisma'

export const getProducts = async () => {
    return db.product.findMany()
}

export const getProduct = async (id: string) => {
    return db.product.findUnique({
        where: {
            id
        }
    })
}

export const getProductWithItems = async (id: string) => {
    return db.product.findUnique({
        where: {
            id
        },
        include: {
            productItems: true
        }
    })
}

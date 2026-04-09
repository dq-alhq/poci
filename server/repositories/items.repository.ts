'use server'

import db from '@/lib/prisma'

export const getAllProducts = async () => {
    const data = await db.product.findMany({
        where: {
            isProduct: true
        }
    })

    const count = await db.product.count({
        where: {
            isProduct: true
        }
    })

    return {
        data,
        count
    }
}

export const getAllItems = async () => {
    const data = await db.product.findMany({
        where: {
            isProduct: false
        },
        orderBy: {
            name: 'asc'
        }
    })

    const count = await db.product.count({
        where: {
            isProduct: false
        }
    })

    return {
        data,
        count
    }
}

export const getAllMaterials = async () => {
    const data = await db.product.findMany({
        where: {
            isProduct: false
        }
    })

    const count = await db.product.count({
        where: {
            isProduct: false
        }
    })

    return {
        data,
        count
    }
}

export const getItem = async (id: string) => {
    return db.product.findUnique({
        where: {
            id
        }
    })
}

'use server'

import db from '@/lib/prisma'

export const getItems = async () => {
    return db.item.findMany({
        orderBy: {
            isMaterial: 'desc'
        }
    })
}

export const getMaterialItems = async () => {
    return db.item.findMany({
        where: {
            isMaterial: true
        },
        orderBy: [{ stock: 'desc' }]
    })
}

export const getPurchasableItems = async () => {
    return db.item.findMany({
        where: {
            id: {
                not: 'es-batu'
            }
        },
        orderBy: {
            stock: 'desc'
        }
    })
}

export const getItem = async (id: string) => {
    return db.item.findUnique({
        where: {
            id
        }
    })
}

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

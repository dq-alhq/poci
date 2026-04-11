'use server'

import db from '@/lib/prisma'

export const getStockTransfer = async () => {
    return await db.stockTransfer.findMany({
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

export const getInStockTransfer = async () => {
    return await db.stockTransfer.findMany({
        where: {
            type: 'IN'
        },
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

export const getOutStockTransfer = async () => {
    return await db.stockTransfer.findMany({
        where: {
            type: 'OUT'
        },
        include: {
            createdBy: true,
            items: {
                include: {
                    item: true
                }
            },
            outlet: true
        }
    })
}

export const getDamagedStockTransfer = async () => {
    return await db.stockTransfer.findMany({
        where: {
            type: 'DAMAGED'
        },
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

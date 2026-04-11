'use server'

import db from '@/lib/prisma'

export const getShifts = async () => {
    return db.shift.findMany({
        orderBy: {
            start: 'asc'
        },
        include: {
            outlet: true,
            user: true
        }
    })
}

export const getUsers = async () => {
    return db.user.findMany({
        select: {
            id: true,
            name: true
        }
    })
}

export const getOutlets = async () => {
    return db.outlet.findMany({
        select: {
            id: true,
            name: true
        }
    })
}

export const getCurrentOpenShift = async (userId: string) => {
    return db.shift.findFirst({
        where: {
            userId,
            isOpen: true
        },
        include: {
            outlet: true
        },
        orderBy: {
            start: 'desc'
        }
    })
}

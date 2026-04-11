'use server'

import { revalidatePath } from 'next/cache'
import z from 'zod'
import db from '@/lib/prisma'

const dateSchema = z.preprocess((arg) => {
    if (typeof arg === 'string' || arg instanceof Date) return new Date(arg)
}, z.date())

const shiftSchema = z.object({
    start: dateSchema,
    end: dateSchema.optional(),
    outletId: z.string(),
    userId: z.string()
})

export const createShift = async (_: any, formData: FormData) => {
    const { data, success, error } = shiftSchema.safeParse(Object.fromEntries(formData))
    if (!success) {
        return {
            success: false,
            error: z.flattenError(error).fieldErrors
        }
    }

    try {
        await db.shift.create({
            data
        })
        revalidatePath('/dashboard/shifts')
        return {
            success: true,
            message: 'Shift berhasil dibuat'
        }
    } catch (error: any) {
        return {
            success: false,
            error: error.message
        }
    }
}

const startShiftSchema = z.object({
    outletId: z.string(),
    userId: z.string()
})

export const startShift = async (_: any, formData: FormData) => {
    const { data, success, error } = startShiftSchema.safeParse(Object.fromEntries(formData))
    if (!success) {
        return {
            success: false,
            error: z.flattenError(error).fieldErrors
        }
    }
    try {
        await db.shift.create({
            data: {
                ...data,
                start: new Date(),
                isOpen: true
            }
        })
        revalidatePath('/')
        return {
            success: true,
            message: 'Shift berhasil dimulai'
        }
    } catch (error: any) {
        return {
            success: false,
            error: error.message
        }
    }
}

export const closeShift = async (id: number) => {
    try {
        await db.shift.update({
            where: {
                id
            },
            data: {
                end: new Date(),
                isOpen: false
            }
        })
        revalidatePath('/')
        return {
            success: true,
            message: 'Shift berhasil ditutup'
        }
    } catch (error: any) {
        return {
            success: false,
            error: error.message
        }
    }
}

export const openShift = async (id: number) => {
    try {
        await db.shift.update({
            where: {
                id
            },
            data: {
                end: null,
                isOpen: true
            }
        })
        revalidatePath('/dashboard/shifts')
        return {
            success: true,
            message: 'Shift berhasil dibuka'
        }
    } catch (error: any) {
        return {
            success: false,
            error: error.message
        }
    }
}

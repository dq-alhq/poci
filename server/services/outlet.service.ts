'use server'

import { revalidatePath } from 'next/cache'
import z from 'zod'
import db from '@/lib/prisma'

const outletSchema = z.object({
    id: z.string().optional(),
    name: z.string(),
    location: z.string(),
    latitude: z.string().optional(),
    longitude: z.string().optional()
})

export const upsertOutlet = async (_: any, formData: FormData) => {
    const { data, success, error } = outletSchema.safeParse(Object.fromEntries(formData))
    if (!success) {
        return {
            success: false,
            error: z.flattenError(error).fieldErrors
        }
    }

    try {
        if (data.id) {
            await db.outlet.update({
                where: { id: data.id },
                data: data
            })
        } else {
            await db.outlet.create({
                data: data
            })
        }
        revalidatePath('/dashboard/outlet')
        return {
            success: true,
            message: data.id ? 'Outlet berhasil diupdate' : 'Outlet berhasil ditambahkan'
        }
    } catch (error: any) {
        return {
            success: false,
            error: error.message
        }
    }
}

export const deleteOutlet = async (id: string) => {
    try {
        await db.outlet.delete({
            where: { id }
        })
        revalidatePath('/dashboard/outlet')
        return {
            success: true,
            message: 'Outlet berhasil dihapus'
        }
    } catch (error: any) {
        return {
            success: false,
            error: error.message
        }
    }
}

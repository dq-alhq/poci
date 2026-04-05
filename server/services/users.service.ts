'use server'

import { revalidatePath } from 'next/cache'
import { headers } from 'next/headers'
import z from 'zod'
import { auth } from '@/lib/auth'

const createUserSchema = z.object({
    role: z.enum(['user', 'admin']),
    username: z.string().min(1),
    name: z.string().min(1),
    email: z.email()
})

export async function createUser(_: any, formData: FormData) {
    const result = createUserSchema.safeParse(Object.fromEntries(formData))
    const { success, data, error } = result

    if (!success) {
        return {
            errors: z.flattenError(error).fieldErrors
        }
    }

    try {
        auth.api.createUser({
            body: data,
            headers: await headers()
        })

        revalidatePath('/users')

        return { success: true }
    } catch (error: any) {
        return {
            success: false,
            errors: {
                name: error?.message
            }
        }
    }
}

const updateUserSchema = z.object({
    userId: z.string(),
    username: z.string().optional(),
    name: z.string().min(1),
    email: z.email(),
    role: z.enum(['user', 'admin'])
})

export async function updateUser(_: any, formData: FormData) {
    const result = updateUserSchema.safeParse(Object.fromEntries(formData))
    const { success, data, error } = result

    if (!success) {
        return {
            errors: z.flattenError(error).fieldErrors
        }
    }

    try {
        auth.api.adminUpdateUser({
            body: { userId: data.userId, data: data },
            headers: await headers()
        })

        return { success: true }
    } catch (error: any) {
        return {
            success: false,
            errors: {
                name: error?.message
            }
        }
    }
}

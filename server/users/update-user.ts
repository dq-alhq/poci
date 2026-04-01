'use server'

import { headers as nextHeaders } from 'next/headers'
import z from 'zod'
import { auth } from '@/lib/auth'

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
        const headers = await nextHeaders()
        auth.api.adminUpdateUser({
            body: { userId: data.userId, data: data },
            headers
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

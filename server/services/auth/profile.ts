'use server'

import { headers as nextHeaders } from 'next/headers'
import z from 'zod'
import { auth } from '@/lib/auth'

const updateProfileSchema = z.object({
    username: z.string().min(1),
    name: z.string().min(1),
    email: z.email()
})

export async function updateProfile(_: any, formData: FormData) {
    const result = updateProfileSchema.safeParse(Object.fromEntries(formData))
    const { success, data, error } = result

    if (!success) {
        return {
            errors: z.flattenError(error).fieldErrors
        }
    }

    try {
        const headers = await nextHeaders()
        await Promise.all([
            auth.api.updateUser({
                body: { name: data.name, username: data.username },
                headers
            }),
            auth.api.changeEmail({
                body: { newEmail: data.email },
                headers
            })
        ])

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

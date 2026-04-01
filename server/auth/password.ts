'use server'

import { headers as nextHeaders } from 'next/headers'
import z from 'zod'
import { auth } from '@/lib/auth'

const updateProfileSchema = z
    .object({
        currentPassword: z.string().min(8),
        newPassword: z.string().min(8),
        revokeOtherSessions: z.coerce.boolean().default(false),
        confirmNewPassword: z.string().min(8)
    })
    .refine((data) => data.newPassword === data.confirmNewPassword, {
        message: "Passwords don't match",
        path: ['confirmNewPassword']
    })

export async function updatePassword(_: any, formData: FormData) {
    const result = updateProfileSchema.safeParse(Object.fromEntries(formData))
    const { success, data, error } = result

    if (!success) {
        return {
            errors: z.flattenError(error).fieldErrors
        }
    }

    try {
        const headers = await nextHeaders()
        await auth.api.changePassword({
            body: data,
            headers
        })

        return { success: true }
    } catch (error: any) {
        return {
            success: false,
            errors: {
                currentPassword: error?.message
            }
        }
    }
}

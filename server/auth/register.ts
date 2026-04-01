'use server'
import z from 'zod'
import { auth } from '@/lib/auth'
import { slugify } from '@/lib/utils'

const registerSchema = z
    .object({
        name: z.string().min(1),
        email: z.string().min(1),
        password: z.string().min(8)
    })
    .transform((data) => ({ ...data, username: slugify(data.name), displayUsername: data.name }))

export async function register(_: any, formData: FormData) {
    const result = registerSchema.safeParse(Object.fromEntries(formData))
    const { success, data, error } = result

    if (!success) {
        return {
            errors: z.flattenError(error).fieldErrors
        }
    }

    try {
        await auth.api.signUpEmail({
            body: data
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

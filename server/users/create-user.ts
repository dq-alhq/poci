'use server'

import { headers as nextHeaders } from 'next/headers'
import z from 'zod'
import { auth } from '@/lib/auth'
import { revalidatePath } from 'next/cache'

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
        const headers = await nextHeaders()
        auth.api.createUser({
            body: data,
            headers
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

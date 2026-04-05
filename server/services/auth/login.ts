'use server'
import { redirect } from 'next/navigation'
import z from 'zod'
import { auth } from '@/lib/auth'

const loginSchema = z.object({
    username: z.string().min(1),
    password: z.string().min(8)
})

export async function login(_: any, formData: FormData) {
    const result = loginSchema.safeParse(Object.fromEntries(formData))
    const { success, data, error } = result

    if (!success) {
        return {
            errors: z.flattenError(error).fieldErrors
        }
    }

    try {
        if (data.username.includes('@')) {
            await auth.api.signInEmail({
                body: {
                    email: data.username,
                    ...data
                }
            })
        } else {
            await auth.api.signInUsername({
                body: data
            })
        }
    } catch (error: any) {
        return {
            success: false,
            errors: {
                username: error?.message
            }
        }
    }

    redirect('/dashboard', 'replace')
}

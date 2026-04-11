'use server'

import { revalidatePath } from 'next/cache'
import { headers } from 'next/headers'
import { redirect } from 'next/navigation'
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

const updatePasswordSchema = z
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
    const result = updatePasswordSchema.safeParse(Object.fromEntries(formData))
    const { success, data, error } = result

    if (!success) {
        return {
            errors: z.flattenError(error).fieldErrors
        }
    }

    try {
        await auth.api.changePassword({
            body: data,
            headers: await headers()
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
        await Promise.all([
            auth.api.updateUser({
                body: { name: data.name, username: data.username },
                headers: await headers()
            }),
            auth.api.changeEmail({
                body: { newEmail: data.email },
                headers: await headers()
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

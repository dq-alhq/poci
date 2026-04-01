'use client'

import type { User } from '@/generated/prisma/client'
import { useRouter } from 'next/navigation'
import { useActionState, useEffect } from 'react'
import { toast } from 'sonner'
import { Button } from '@/components/ui/button'
import { FieldError, FieldGroup, FieldLabel, Form } from '@/components/ui/field'
import { Input } from '@/components/ui/input'
import { Radio, RadioGroup } from '@/components/ui/radio'
import { PasswordInput, TextField } from '@/components/ui/text-field'
import { createUser } from '@/server/users/create-user'
import { updateUser } from '@/server/users/update-user'

export function UserForm({ user }: { user?: User }) {
    const router = useRouter()
    const [{ errors, success }, action, isPending] = useActionState(user ? updateUser : createUser, { errors: {} })
    useEffect(() => {
        if (success) {
            toast.success(user ? 'User updated successfully' : 'User created successfully')
            router.back()
        }
    }, [success])
    return (
        <Form action={action} validationErrors={errors}>
            <FieldGroup className='flex flex-col gap-6'>
                {user && <input defaultValue={user?.id} name='userId' type='hidden' />}
                <TextField autoComplete='name' defaultValue={user?.name} isRequired name='name'>
                    <FieldLabel>Name</FieldLabel>
                    <Input placeholder='Name' />
                    <FieldError />
                </TextField>
                <TextField autoComplete='username' defaultValue={user?.username ?? ''} name='username'>
                    <FieldLabel>Username</FieldLabel>
                    <Input placeholder='Username' />
                    <FieldError />
                </TextField>
                <TextField autoComplete='email' defaultValue={user?.email} isRequired name='email'>
                    <FieldLabel>Email</FieldLabel>
                    <Input placeholder='Email' />
                    <FieldError />
                </TextField>
                {!user && (
                    <TextField autoComplete='current-password' isRequired name='password'>
                        <FieldLabel>Password</FieldLabel>
                        <PasswordInput placeholder='Password' />
                        <FieldError />
                    </TextField>
                )}
                <RadioGroup defaultValue={user?.role} name='role'>
                    <FieldLabel>Role</FieldLabel>
                    <Radio id='admin' value='admin'>
                        Admin
                    </Radio>
                    <Radio id='user' value='user'>
                        User
                    </Radio>
                </RadioGroup>
                <Button isPending={isPending} type='submit'>
                    {user ? 'Update User' : 'Create User'}
                </Button>
            </FieldGroup>
        </Form>
    )
}

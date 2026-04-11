'use client'

import { IconLogin } from '@tabler/icons-react'
import Link from 'next/link'
import { useActionState } from 'react'
import { Button } from '@/components/ui/button'
import { FieldError, FieldGroup, FieldLabel, Form } from '@/components/ui/field'
import { Input } from '@/components/ui/input'
import { PasswordInput, TextField } from '@/components/ui/text-field'
import { login } from '@/server/services/users.service'

export function LoginForm({ disableSignUp }: { disableSignUp: boolean }) {
    const [{ errors }, action, isPending] = useActionState(login, { errors: {} })
    return (
        <Form action={action} validationErrors={errors}>
            <FieldGroup className='flex flex-col gap-6'>
                <TextField autoComplete='username' isRequired name='username'>
                    <FieldLabel>Username / Email</FieldLabel>
                    <Input placeholder='Username / Email' />
                    <FieldError />
                </TextField>
                <TextField autoComplete='current-password' isRequired name='password'>
                    <div className='flex items-center'>
                        <FieldLabel>Password</FieldLabel>
                        <Link
                            className='ml-auto inline-block text-sm underline-offset-4 hover:underline'
                            href='#'
                            tabIndex={-1}
                        >
                            Forgot your password?
                        </Link>
                    </div>
                    <PasswordInput placeholder='Password' />
                    <FieldError />
                </TextField>
                <Button isPending={isPending} type='submit'>
                    <IconLogin />
                    Login
                </Button>
            </FieldGroup>
            {!disableSignUp && (
                <div className='mt-4 text-center text-sm'>
                    Don&apos;t have an account?{' '}
                    <Link className='underline underline-offset-4' href='/register'>
                        Sign up
                    </Link>
                </div>
            )}
        </Form>
    )
}

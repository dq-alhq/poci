'use client'
import { IconUserPlus } from '@tabler/icons-react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useActionState, useEffect } from 'react'
import { toast } from 'sonner'
import { Button } from '@/components/ui/button'
import { FieldError, FieldGroup, FieldLabel, Form } from '@/components/ui/field'
import { Input } from '@/components/ui/input'
import { PasswordInput, TextField } from '@/components/ui/text-field'
import { register } from '@/server/auth/register'

export function RegisterForm() {
    const router = useRouter()
    const [{ errors, success }, action, isPending] = useActionState(register, { errors: {} })
    useEffect(() => {
        if (success) {
            toast.success('Registration success!')
            router.push('/dashboard')
        }
    }, [success])
    return (
        <Form action={action} validationErrors={errors}>
            <FieldGroup className='flex flex-col gap-6'>
                <TextField autoComplete='name' isRequired name='name'>
                    <FieldLabel>Name</FieldLabel>
                    <Input placeholder='Name' />
                    <FieldError />
                </TextField>
                <TextField autoComplete='email' isRequired name='email'>
                    <FieldLabel>Email</FieldLabel>
                    <Input placeholder='Email' />
                    <FieldError />
                </TextField>
                <TextField autoComplete='current-password' isRequired name='password'>
                    <FieldLabel>Password</FieldLabel>
                    <PasswordInput placeholder='Password' />
                    <FieldError />
                </TextField>
                <Button isPending={isPending} type='submit'>
                    <IconUserPlus />
                    Register
                </Button>
            </FieldGroup>
            <div className='mt-4 text-center text-sm'>
                Already have an account?{' '}
                <Link className='underline underline-offset-4' href='/login'>
                    Login
                </Link>
            </div>
        </Form>
    )
}

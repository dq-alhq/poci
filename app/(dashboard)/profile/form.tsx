'use client'

import { IconDeviceFloppy } from '@tabler/icons-react'
import { useActionState, useEffect } from 'react'
import { toast } from 'sonner'
import { Button } from '@/components/ui/button'
import { FieldError, FieldGroup, FieldLabel, Form } from '@/components/ui/field'
import { Input } from '@/components/ui/input'
import { Separator } from '@/components/ui/separator'
import { Skeleton } from '@/components/ui/skeleton'
import { TextField } from '@/components/ui/text-field'
import { authClient } from '@/lib/auth-client'
import { updateProfile } from '@/server/auth/profile'

export default function ProfileUpdateForm() {
    const { refetch, data, isPending: loading } = authClient.useSession()
    const [{ success, errors }, action, isPending] = useActionState(updateProfile, { errors: {} })

    useEffect(() => {
        if (success) {
            toast.success('Profile updated successfully')
            refetch()
        }
    }, [success])

    return loading ? (
        <div className='grid gap-4 px-4 lg:w-1/2 lg:px-6'>
            <Skeleton className='h-5 w-1/2' />
            <Skeleton className='h-5 w-2/3' />
            <Separator className='mb-4' />
            <Skeleton className='h-5 w-full' />
            <Skeleton className='h-7.5 w-full' />
            <Skeleton className='h-5 w-full' />
            <Skeleton className='h-7.5 w-full' />
            <Skeleton className='h-7.5 w-full' />
        </div>
    ) : (
        <div className='px-4 lg:px-6'>
            <h1 className='font-medium text-lg'>Profile Setting</h1>
            <p className='mb-2 text-muted-foreground text-sm'>Edit your profile information</p>
            <Separator className='mb-4' />
            <Form action={action} className='lg:w-1/2' validationErrors={errors}>
                <FieldGroup>
                    <TextField defaultValue={data?.user?.name} isRequired name='name'>
                        <FieldLabel>Name</FieldLabel>
                        <Input placeholder='Full Name' />
                        <FieldError />
                    </TextField>
                    <TextField defaultValue={data?.user?.username ?? ''} isRequired name='username'>
                        <FieldLabel>Username</FieldLabel>
                        <Input placeholder='Username' />
                        <FieldError />
                    </TextField>
                    <TextField defaultValue={data?.user?.email} isRequired name='email' type='email'>
                        <FieldLabel>Email</FieldLabel>
                        <Input placeholder='email@example.com' />
                        <FieldError />
                    </TextField>

                    <Button isPending={isPending} type='submit'>
                        <IconDeviceFloppy />
                        Save
                    </Button>
                </FieldGroup>
            </Form>
        </div>
    )
}

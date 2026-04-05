'use client'

import { IconDeviceFloppy } from '@tabler/icons-react'
import { useActionState, useEffect } from 'react'
import { toast } from 'sonner'
import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import { FieldError, FieldGroup, FieldLabel, Form } from '@/components/ui/field'
import { Separator } from '@/components/ui/separator'
import { PasswordInput, TextField } from '@/components/ui/text-field'
import { authClient } from '@/lib/auth-client'
import { updatePassword } from '@/server/services/auth/password'

export default function ProfileUpdateForm() {
    const { refetch } = authClient.useSession()
    const [{ success, errors }, action, isPending] = useActionState(updatePassword, { errors: {} })

    useEffect(() => {
        if (success) {
            toast.success('Password updated successfully')
            refetch()
        }
    }, [success])

    return (
        <div className='px-4 lg:px-6'>
            <h1 className='font-medium text-lg'>Security</h1>
            <p className='mb-2 text-muted-foreground text-sm'>Secure your account</p>
            <Separator className='mb-4' />
            <Form action={action} className='lg:w-1/2' validationErrors={errors}>
                <FieldGroup>
                    <TextField isRequired name='currentPassword'>
                        <FieldLabel>Current Password</FieldLabel>
                        <PasswordInput placeholder='Current Password' />
                        <FieldError />
                    </TextField>
                    <TextField isRequired name='newPassword'>
                        <FieldLabel>New Password</FieldLabel>
                        <PasswordInput placeholder='New Password' />
                        <FieldError />
                    </TextField>
                    <TextField isRequired name='confirmNewPassword'>
                        <FieldLabel>Confirm New Password</FieldLabel>
                        <PasswordInput placeholder='Confirm New Password' />
                        <FieldError />
                    </TextField>

                    <Checkbox name='revokeOtherSession'>Revoke other session</Checkbox>

                    <Button isPending={isPending} type='submit'>
                        <IconDeviceFloppy />
                        Save
                    </Button>
                </FieldGroup>
            </Form>
        </div>
    )
}

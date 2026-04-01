import { redirect } from 'next/navigation'
import { RegisterForm } from '@/app/(auth)/register/register'
import { InterceptModal } from '@/components/intercept-modal'
import { auth } from '@/lib/auth'

export default async function RegisterModal() {
    const { disableSignUp } = auth.options.emailAndPassword
    if (disableSignUp) redirect('/login', 'replace')

    return (
        <InterceptModal description='Get started with your new account' title='Create an account'>
            <RegisterForm />
        </InterceptModal>
    )
}

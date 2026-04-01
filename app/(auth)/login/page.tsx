import Image from 'next/image'
import Link from 'next/link'
import { Card } from '@/components/ui/card'
import { auth } from '@/lib/auth'
import { LoginForm } from './login-form'

export default async function Page() {
    const { disableSignUp } = auth.options.emailAndPassword
    return (
        <div className='flex min-h-svh w-full items-center justify-center p-6 md:p-10'>
            <div className='flex w-full max-w-sm flex-col items-center justify-center gap-6'>
                <Link className='text-center' href='/'>
                    <Image alt='Logo' height={20} src='/next.svg' width={98.5} />
                </Link>
                <Card className='w-full'>
                    <Card.Header>
                        <Card.Title>Login to your account</Card.Title>
                        <Card.Description>Enter your username or email below to login to your account</Card.Description>
                    </Card.Header>
                    <Card.Content>
                        <LoginForm disableSignUp={disableSignUp} />
                    </Card.Content>
                </Card>
            </div>
        </div>
    )
}

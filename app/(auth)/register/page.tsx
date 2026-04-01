import Image from 'next/image'
import Link from 'next/link'
import { redirect } from 'next/navigation'
import { Card } from '@/components/ui/card'
import { auth } from '@/lib/auth'
import { RegisterForm } from './register'

export default async function Page() {
    const { disableSignUp } = auth.options.emailAndPassword
    if (disableSignUp) redirect('/login', 'replace')
    return (
        <div className='flex min-h-svh w-full items-center justify-center p-6 md:p-10'>
            <div className='w-full max-w-sm'>
                <div className='flex w-full max-w-sm flex-col items-center justify-center gap-6'>
                    <Link className='text-center' href='/'>
                        <Image alt='Logo' height={20} src='/next.svg' width={98.5} />
                    </Link>
                    <Card className='w-full'>
                        <Card.Header>
                            <Card.Title>Create an account</Card.Title>
                            <Card.Description>Get started with your new account</Card.Description>
                        </Card.Header>
                        <Card.Content>
                            <RegisterForm />
                        </Card.Content>
                    </Card>
                </div>
            </div>
        </div>
    )
}

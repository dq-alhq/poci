import type { UserWithRole } from 'better-auth/plugins'
import { IconEdit } from '@tabler/icons-react'
import { headers } from 'next/headers'
import Link from 'next/link'
import { InterceptModal } from '@/components/intercept-modal'
import { Avatar } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import { buttonVariants } from '@/components/ui/button-group'
import { auth } from '@/lib/auth'

export default async function Page({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params
    const user = (await auth.api.getUser({
        query: {
            id
        },
        headers: await headers()
    })) as UserWithRole & { username?: string }

    if (!user) return null
    return (
        <InterceptModal title={'User Detail'}>
            <div className='flex flex-col items-center gap-3 lg:flex-row'>
                <Avatar className='size-20 lg:size-14' src={user.image} />
                <div className='flex flex-col items-center lg:items-start'>
                    <h1 className='font-semibold text-lg text-primary'>{user.name}</h1>
                    <p className='text-muted-foreground text-sm'>{user.role}</p>
                </div>
            </div>
            <div className='my-4 grid grid-cols-1 gap-3'>
                <div>
                    <h3 className='text-muted-foreground text-sm'>Email</h3>
                    <p>{user?.email}</p>
                </div>
                <div>
                    <h3 className='text-muted-foreground text-sm'>Username</h3>
                    <p>{user?.username ?? <Badge variant='secondary'>Not Set</Badge>}</p>
                </div>
                <div>
                    <h3 className='text-muted-foreground text-sm'>Role</h3>
                    <p>{user?.role ?? '-'}</p>
                </div>
            </div>
            <Link
                className={buttonVariants({
                    size: 'sm',
                    variant: 'outline'
                })}
                href={`/users/${id}/edit`}
            >
                <IconEdit />
                Edit
            </Link>
        </InterceptModal>
    )
}

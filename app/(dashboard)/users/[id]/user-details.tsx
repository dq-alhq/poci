import { IconEdit } from '@tabler/icons-react'
import { headers } from 'next/headers'
import Link from 'next/link'
import { Avatar } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import { buttonVariants } from '@/components/ui/button-group'
import { Card } from '@/components/ui/card'
import { auth, type User } from '@/lib/auth'

export const UserDetails = async ({ id }: { id: string }) => {
    const user: User = await auth.api.getUser({
        query: {
            id
        },
        headers: await headers()
    })

    return (
        <>
            <Card className='relative'>
                <Card.Content>
                    <div>
                        <Link
                            className={buttonVariants({
                                className: 'absolute top-4 right-4',
                                size: 'sm',
                                variant: 'outline'
                            })}
                            href={`/users/${id}/edit`}
                        >
                            <IconEdit />
                            Edit
                        </Link>
                    </div>
                    <div className='flex flex-col items-center gap-3 lg:flex-row'>
                        <Avatar className='size-20 lg:size-14' src={user.image} />
                        <div className='flex flex-col items-center lg:items-start'>
                            <h1 className='font-semibold text-lg text-primary'>{user.name}</h1>
                            <p className='text-muted-foreground text-sm'>{user.role}</p>
                        </div>
                    </div>
                </Card.Content>
            </Card>
            <Card>
                <Card.Content>
                    <div className='grid grid-cols-1 gap-3'>
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
                </Card.Content>
            </Card>
        </>
    )
}

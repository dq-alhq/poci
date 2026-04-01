'use client'

import type { UserWithRole } from 'better-auth/plugins'
import { IconBriefcase, IconDotsVertical, IconEdit, IconEye, IconTrash } from '@tabler/icons-react'
import { useRouter } from 'next/navigation'
import { toast } from 'sonner'
import { Avatar } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator
} from '@/components/ui/dropdown-menu'
import { Table } from '@/components/ui/table'
import { authClient } from '@/lib/auth-client'

interface User extends UserWithRole {
    username?: string
}

export const UsersTable = ({ users }: { users: User[] }) => {
    const { refresh } = useRouter()
    const { data: session } = authClient.useSession()
    const removeUser = (userId: string) =>
        authClient.admin
            .removeUser({
                userId
            })
            .then(() => toast.success('User deleted successfully!'))
            .finally(refresh)

    const assignRole = (userId: string, role: 'admin' | 'user') =>
        authClient.admin
            .setRole({
                userId,
                role
            })
            .then(() => toast.success('Role set successfully!'))
            .finally(refresh)

    return (
        <Table aria-label='Users'>
            <Table.Header>
                <Table.Column className='w-10' isRowHeader>
                    #
                </Table.Column>
                <Table.Column>Name</Table.Column>
                <Table.Column>Username / Email</Table.Column>
                <Table.Column className='w-0' />
            </Table.Header>
            <Table.Body>
                {users.map((user, i) => (
                    <Table.Row key={i}>
                        <Table.Cell>{i + 1}</Table.Cell>
                        <Table.Cell>
                            <div className='users-center flex gap-2'>
                                <Avatar alt={user.name} className='size-8' src={user.image} />
                                <div className='flex flex-col'>
                                    <div className='font-medium text-sm'>{user.name}</div>
                                    <span className='text-muted-foreground text-xs'>{user?.role}</span>
                                </div>
                            </div>
                        </Table.Cell>
                        <Table.Cell>
                            <div className='flex flex-col'>
                                <div className='font-medium text-sm'>{user?.username}</div>
                                <span className='text-muted-foreground text-xs'>{user.email}</span>
                            </div>
                        </Table.Cell>
                        <Table.Cell>
                            <DropdownMenu>
                                <Button size='icon-xs' variant='ghost'>
                                    <IconDotsVertical />
                                </Button>
                                <DropdownMenuContent placement='left top'>
                                    <DropdownMenuItem href={`/users/${user.id}`}>
                                        <IconEye />
                                        View
                                    </DropdownMenuItem>
                                    <DropdownMenuItem href={`/users/${user.id}/edit`}>
                                        <IconEdit />
                                        Edit
                                    </DropdownMenuItem>
                                    <DropdownMenuSeparator />
                                    <DropdownMenu.Item
                                        isDisabled={!session?.user.id || session?.user.id === user.id}
                                        onAction={() => assignRole(user?.id, user.role === 'admin' ? 'user' : 'admin')}
                                    >
                                        <IconBriefcase />
                                        Set Role: {user.role === 'admin' ? 'User' : 'Admin'}
                                    </DropdownMenu.Item>
                                    <DropdownMenuSeparator />
                                    <DropdownMenuItem
                                        isDisabled={!session?.user.id || session?.user.id === user.id}
                                        onAction={() =>
                                            toast.error("Are you sure wan't to delete this user?", {
                                                action: {
                                                    label: 'Delete',
                                                    onClick: () => removeUser(user.id)
                                                },
                                                cancel: {
                                                    label: 'Cancel',
                                                    onClick: () => {}
                                                },
                                                duration: Infinity
                                            })
                                        }
                                        variant='destructive'
                                    >
                                        <IconTrash />
                                        Delete
                                    </DropdownMenuItem>
                                </DropdownMenuContent>
                            </DropdownMenu>
                        </Table.Cell>
                    </Table.Row>
                ))}
            </Table.Body>
        </Table>
    )
}

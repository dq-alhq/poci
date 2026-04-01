import { IconUserPlus } from '@tabler/icons-react'
import { headers as nextHeaders } from 'next/headers'
import Heading from '@/components/heading'
import { Paginator, Search } from '@/components/table-control'
import { buttonVariants } from '@/components/ui/button-group'
import { FieldGroup } from '@/components/ui/field'
import { Link } from '@/components/ui/link'
import { auth } from '@/lib/auth'
import { UsersTable } from './table'

export default async function Page({ searchParams }: { searchParams: Promise<{ [key: string]: string | undefined }> }) {
    const headers = await nextHeaders()
    const filters = await searchParams

    const search = filters?.search ?? ''
    const show = filters?.show ?? 10
    const page = filters?.page ?? 1

    const { users, total } = await auth.api.listUsers({
        query: {
            searchValue: search,
            searchField: 'name',
            searchOperator: 'contains',
            limit: show,
            offset: (Number(page) - 1) * Number(show),
            sortBy: 'name',
            sortDirection: 'desc'
        },
        headers
    })

    return (
        <div className='space-y-4 px-4 lg:px-6'>
            <Heading description='Manage users in this applications' title='Users'>
                <Link className={buttonVariants()} href='/users/create'>
                    <IconUserPlus />
                    Add new User
                </Link>
            </Heading>
            <FieldGroup aria-orientation='horizontal'>
                <Search />
            </FieldGroup>
            {users && <UsersTable users={users} />}
            <Paginator total={total} />
        </div>
    )
}

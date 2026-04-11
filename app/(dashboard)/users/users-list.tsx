import { headers } from 'next/headers'
import { Paginator } from '@/components/table-control'
import { auth } from '@/lib/auth'
import { UsersTable } from './table'

export const UserList = async ({ search, show, page }: { search: string; show: number; page: number }) => {
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
        headers: await headers()
    })

    return (
        <>
            {users && <UsersTable users={users} />}
            <Paginator total={total} />
        </>
    )
}

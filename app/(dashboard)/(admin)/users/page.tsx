import type { Metadata } from 'next'
import { IconUserPlus } from '@tabler/icons-react'
import { Suspense } from 'react'
import Heading from '@/components/heading'
import { Search } from '@/components/table-control'
import { buttonVariants } from '@/components/ui/button-group'
import { FieldGroup } from '@/components/ui/field'
import { Link } from '@/components/ui/link'
import { UserList } from './users-list'

export const metadata: Metadata = {
    title: 'Daftar Pengguna'
}
export default async function Page({ searchParams }: { searchParams: Promise<{ [key: string]: string | undefined }> }) {
    const filters = await searchParams

    const search = filters?.search ?? ''
    const show = filters?.show ?? 10
    const page = filters?.page ?? 1

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
            <Suspense fallback={<div>Loading...</div>}>
                <UserList page={Number(page)} search={search} show={Number(show)} />
            </Suspense>
        </div>
    )
}

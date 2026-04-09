import type { Metadata } from 'next'
import Link from 'next/link'
import { Suspense } from 'react'
import Heading from '@/components/heading'
import { Autocomplete } from '@/components/ui/autocomplete'
import { buttonVariants } from '@/components/ui/button-group'
import { SearchField, SearchInput } from '@/components/ui/search-field'
import { OutletList } from './outlet-list'

export const metadata: Metadata = {
    title: 'Outlet'
}

export default function OutletPage() {
    return (
        <div className='px-6'>
            <Heading description={'Kelola outlet anda'} title={'Outlet'} />
            <div className='py-6'>
                <Autocomplete>
                    <div className='mb-6 flex w-full items-center justify-between gap-4'>
                        <SearchField aria-label='Search products' className='lg:max-w-sm'>
                            <SearchInput placeholder='Cari ...' />
                        </SearchField>
                        <Link className={buttonVariants()} href='/dashboard/outlet/create'>
                            Tambah Outlet
                        </Link>
                    </div>
                    <Suspense fallback={<div>Loading...</div>}>
                        <OutletList />
                    </Suspense>
                </Autocomplete>
            </div>
        </div>
    )
}

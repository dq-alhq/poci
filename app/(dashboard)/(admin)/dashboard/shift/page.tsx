import type { Metadata } from 'next'
import Link from 'next/link'
import { Suspense } from 'react'
import Heading from '@/components/heading'
import { Autocomplete } from '@/components/ui/autocomplete'
import { buttonVariants } from '@/components/ui/button-group'
import { SearchField, SearchInput } from '@/components/ui/search-field'
import { ShiftList } from './shift-list'

export const metadata: Metadata = {
    title: 'Shift'
}

export default function Shiftpage() {
    return (
        <div className='px-6'>
            <Heading description={'Kelola Shift'} title={'Shift'}>
                <div className='flex gap-2'>
                    <Link className={buttonVariants()} href='/app/(dashboard)/(admin)/dashboard/shift/create'>
                        Tambah Shift
                    </Link>
                </div>
            </Heading>
            <div className='py-6'>
                <Autocomplete>
                    <div className='mb-6 flex w-full items-center gap-4'>
                        <SearchField aria-label='Search products' className='lg:max-w-sm'>
                            <SearchInput placeholder='Cari ...' />
                        </SearchField>
                    </div>
                    <Suspense fallback={<div>Loading...</div>}>
                        <ShiftList />
                    </Suspense>
                </Autocomplete>
            </div>
        </div>
    )
}

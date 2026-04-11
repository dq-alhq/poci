import type { Metadata } from 'next'
import Link from 'next/link'
import { Suspense } from 'react'
import Heading from '@/components/heading'
import { Autocomplete } from '@/components/ui/autocomplete'
import { buttonVariants } from '@/components/ui/button-group'
import { SearchField, SearchInput } from '@/components/ui/search-field'
import { PengeluaranList } from './pengeluaran-list'

export const metadata: Metadata = {
    title: 'Pengeluaran'
}

export default function PengeluaranPage() {
    return (
        <div className='px-6'>
            <Heading description={'Kelola pengeluaran di Aplikasi anda'} title={'Pengeluaran'}>
                <Link className={buttonVariants()} href='/dashboard/pengeluaran/create'>
                    Tambah Pengeluaran
                </Link>
            </Heading>
            <div className='py-6'>
                <Autocomplete>
                    <div className='mb-6 flex w-full items-center justify-between gap-4'>
                        <SearchField aria-label='Search products' className='lg:max-w-sm'>
                            <SearchInput placeholder='Cari ...' />
                        </SearchField>
                    </div>
                    <Suspense fallback={<div>Loading...</div>}>
                        <PengeluaranList />
                    </Suspense>
                </Autocomplete>
            </div>
        </div>
    )
}

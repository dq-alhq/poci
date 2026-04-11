import type { Metadata } from 'next'
import Link from 'next/link'
import { Suspense } from 'react'
import Heading from '@/components/heading'
import { Autocomplete } from '@/components/ui/autocomplete'
import { buttonVariants } from '@/components/ui/button-group'
import { SearchField, SearchInput } from '@/components/ui/search-field'
import { PembelanjaanList } from './pembelanjaan-list'

export const metadata: Metadata = {
    title: 'Pembelanjaan'
}

export default function PembelanjaanPage() {
    return (
        <div className='px-6'>
            <Heading description={'Kelola pembelanjaan di Aplikasi anda'} title={'Pembelanjaan'}>
                <Link className={buttonVariants()} href='/dashboard/pembelanjaan/create'>
                    Tambah Pembelanjaan
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
                        <PembelanjaanList />
                    </Suspense>
                </Autocomplete>
            </div>
        </div>
    )
}

import Link from 'next/link'
import { Suspense } from 'react'
import Heading from '@/components/heading'
import { Autocomplete } from '@/components/ui/autocomplete'
import { buttonVariants } from '@/components/ui/button-group'
import { SearchField, SearchInput } from '@/components/ui/search-field'
import { StokList } from './stok-list'

export default async function StokPage() {
    return (
        <div className='px-6'>
            <Heading description={'Kelola Stok pada Gudang Utama'} title={'Stok'}>
                <div className='flex gap-2'>
                    <Link className={buttonVariants()} href='/dashboard/stok/add'>
                        Tambah Stok
                    </Link>
                    <Link className={buttonVariants({ variant: 'destructive' })} href='/dashboard/stok/damaged'>
                        Barang Rusak
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
                        <StokList />
                    </Suspense>
                </Autocomplete>
            </div>
        </div>
    )
}

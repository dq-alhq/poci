import { IconArrowLeft } from '@tabler/icons-react'
import Link from 'next/link'
import { Suspense } from 'react'
import Heading from '@/components/heading'
import { buttonVariants } from '@/components/ui/button-group'
import { ItemList } from './item-list'

export default async function OutletStockPage({ searchParams }: { searchParams: Promise<{ outletId: string }> }) {
    const outletId = (await searchParams).outletId
    return (
        <div className='px-6'>
            <Heading description={'Tambah Stok pada Outlet'} title={'Tambah Stok'}>
                <Link className={buttonVariants({ variant: 'outline' })} href='/'>
                    <IconArrowLeft />
                    Kembali
                </Link>
            </Heading>
            <div className='py-6'>
                <Suspense fallback={<div>Loading...</div>}>
                    <ItemList outletId={outletId} />
                </Suspense>
            </div>
        </div>
    )
}

import { IconArrowLeft } from '@tabler/icons-react'
import Link from 'next/link'
import { Suspense } from 'react'
import Heading from '@/components/heading'
import { buttonVariants } from '@/components/ui/button-group'
import { ProductList } from './product-list'

export default async function SalesPage({
    searchParams
}: {
    searchParams: Promise<{ shiftId: string; outletId: string }>
}) {
    const { shiftId, outletId } = await searchParams

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
                    <ProductList outletId={outletId} shiftId={shiftId} />
                </Suspense>
            </div>
        </div>
    )
}

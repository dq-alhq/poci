import { IconArrowLeft } from '@tabler/icons-react'
import Link from 'next/link'
import { Suspense } from 'react'
import Heading from '@/components/heading'
import { buttonVariants } from '@/components/ui/button-group'
import { StokItems } from './stok-items'

export default function AddStokPage() {
    return (
        <div className='px-6'>
            <Heading description={'Tambah Stok pada Gudang Utama'} title={'Tambah Stok'}>
                <Link className={buttonVariants({ variant: 'outline' })} href='/dashboard/stok'>
                    <IconArrowLeft />
                    Kembali
                </Link>
            </Heading>
            <div className='py-6'>
                <Suspense fallback={<div>Loading...</div>}>
                    <StokItems />
                </Suspense>
            </div>
        </div>
    )
}

import { IconArrowLeft } from '@tabler/icons-react'
import Link from 'next/link'
import { Suspense } from 'react'
import Heading from '@/components/heading'
import { buttonVariants } from '@/components/ui/button-group'
import { EditProductForm } from './edit-product-forn'

export default async function EditProdukPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params
    return (
        <div className='px-6'>
            <Heading description={'Isi form di bawah ini'} title={'Edit Produk'}>
                <Link className={buttonVariants({ variant: 'outline' })} href={`/dashboard/produk/${id}`}>
                    <IconArrowLeft />
                    Kembali
                </Link>
            </Heading>
            <Suspense fallback={<div>Loading...</div>}>
                <EditProductForm id={id} />
            </Suspense>
        </div>
    )
}

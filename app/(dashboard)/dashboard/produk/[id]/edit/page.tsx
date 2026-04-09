import { IconArrowLeft } from '@tabler/icons-react'
import Link from 'next/link'
import { Suspense } from 'react'
import Heading from '@/components/heading'
import { buttonVariants } from '@/components/ui/button-group'
import EditProductPage from './edit-product'

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
                <EditProductPage id={id} />
            </Suspense>
        </div>
    )
}

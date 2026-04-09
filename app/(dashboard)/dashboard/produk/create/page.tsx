import { Suspense } from 'react'
import CreateProductForm from '@/app/(dashboard)/dashboard/produk/create/create-product-form'
import Heading from '@/components/heading'

export default function CreateProductPage() {
    return (
        <div className='px-6'>
            <Heading description={'Isi form di bawah ini'} title={'Tambah Produk'} />
            <Suspense fallback={<div>Loading...</div>}>
                <CreateProductForm />
            </Suspense>
        </div>
    )
}

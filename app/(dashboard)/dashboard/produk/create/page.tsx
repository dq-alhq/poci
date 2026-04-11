import { Suspense } from 'react'
import Heading from '@/components/heading'
import { CreateProductForm } from './create-product-form'

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

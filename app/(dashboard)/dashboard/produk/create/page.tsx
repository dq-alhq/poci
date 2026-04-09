import ProductForm from '@/app/(dashboard)/dashboard/produk/product-form'
import Heading from '@/components/heading'

export default async function CreateProductPage() {
    return (
        <div className='px-6'>
            <Heading description={'Isi form di bawah ini'} title={'Tambah Produk'} />
            <ProductForm />
        </div>
    )
}

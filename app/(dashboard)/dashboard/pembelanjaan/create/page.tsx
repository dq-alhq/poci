import { Suspense } from 'react'
import Heading from '@/components/heading'
import { ItemList } from './item-list'

export default function PembelanjaanCreatePage() {
    return (
        <div className='px-6'>
            <Heading description={'Buat pembelanjaan baru'} title={'Buat Pembelanjaan'} />
            <div className='py-6'>
                <Suspense fallback={<div>Loading...</div>}>
                    <ItemList />
                </Suspense>
            </div>
        </div>
    )
}

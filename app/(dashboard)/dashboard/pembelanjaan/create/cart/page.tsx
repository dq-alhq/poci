import { Suspense } from 'react'
import Heading from '@/components/heading'
import { CartList } from './cart-list'

export default function Cart() {
    return (
        <div className='px-6'>
            <Heading description='Daftar item yang dipilih' title='Keranjang' />
            <div className='mt-4'>
                <Suspense fallback={<div>Loading...</div>}>
                    <CartList />
                </Suspense>
            </div>
        </div>
    )
}

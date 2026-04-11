import { Suspense } from 'react'
import Heading from '@/components/heading'
import { CartForm } from './cart-form'

export default function Cart() {
    return (
        <div className='px-6'>
            <Heading description='Daftar item yang dipilih' title='Pembelanjaan' />
            <div className='mt-4'>
                <Suspense fallback={<div>Loading...</div>}>
                    <CartForm />
                </Suspense>
            </div>
        </div>
    )
}

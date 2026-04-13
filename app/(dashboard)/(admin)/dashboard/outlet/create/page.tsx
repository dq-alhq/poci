import { Suspense } from 'react'
import Heading from '@/components/heading'
import CreateOutletForm from './create-outlet-form'

export default function CreateOutletPage() {
    return (
        <div className='px-6'>
            <Heading description={'Isi form di bawah ini'} title={'Tambah Outlet'} />
            <Suspense fallback={<div>Loading...</div>}>
                <CreateOutletForm />
            </Suspense>
        </div>
    )
}

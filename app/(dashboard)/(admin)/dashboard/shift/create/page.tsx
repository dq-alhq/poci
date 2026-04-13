import Link from 'next/link'
import { Suspense } from 'react'
import Heading from '@/components/heading'
import { buttonVariants } from '@/components/ui/button-group'
import { ShiftCreatePage } from './shift-create-page'

export default function CreateShiftPage() {
    return (
        <div className='px-6'>
            <Heading description={'Buat Shift Baru'} title={'Buat Shift'}>
                <div className='flex gap-2'>
                    <Link className={buttonVariants({ variant: 'outline' })} href='/dashboard/shift'>
                        Kembali
                    </Link>
                </div>
            </Heading>
            <div className='py-4'>
                <Suspense fallback={<div>Loading...</div>}>
                    <ShiftCreatePage />
                </Suspense>
            </div>
        </div>
    )
}

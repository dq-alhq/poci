import { IconArrowLeft } from '@tabler/icons-react'
import Link from 'next/link'
import { Suspense } from 'react'
import { PengeluaranCreatePage } from '@/app/(dashboard)/dashboard/pengeluaran/create/pengeluaran-page'
import Heading from '@/components/heading'
import { buttonVariants } from '@/components/ui/button-group'

export default async function PembelanjaanCreatePage() {
    return (
        <div className='px-6'>
            <Heading description={'Buat pengeluaran baru'} title={'Buat Pengeluaran'}>
                <Link className={buttonVariants({ variant: 'outline' })} href='/dashboard/pengeluaran'>
                    <IconArrowLeft /> Kembali
                </Link>
            </Heading>
            <div className='py-6'>
                <Suspense fallback={<div>Loading...</div>}>
                    <PengeluaranCreatePage />
                </Suspense>
            </div>
        </div>
    )
}

import { IconArrowLeft } from '@tabler/icons-react'
import Link from 'next/link'
import Heading from '@/components/heading'
import { buttonVariants } from '@/components/ui/button-group'
import { PengeluaranForm } from './pengeluaran-form'

export default function PembelanjaanCreatePage() {
    return (
        <div className='px-6'>
            <Heading description={'Buat pengeluaran baru'} title={'Buat Pengeluaran'}>
                <Link className={buttonVariants({ variant: 'outline' })} href='/dashboard/pengeluaran'>
                    <IconArrowLeft /> Kembali
                </Link>
            </Heading>
            <div className='py-6'>
                <PengeluaranForm />
            </div>
        </div>
    )
}

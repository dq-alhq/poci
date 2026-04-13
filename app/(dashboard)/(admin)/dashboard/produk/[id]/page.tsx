import { IconArrowLeft } from '@tabler/icons-react'
import Link from 'next/link'
import { Suspense } from 'react'
import Heading from '@/components/heading'
import { buttonVariants } from '@/components/ui/button-group'
import { Skeleton } from '@/components/ui/skeleton'
import { ProdukDetailPage, ProdukImage } from './product-details'

export default async function ProductPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params

    return (
        <div className='px-6'>
            <Heading description='Lihat detail produk' title='Detail Produk'>
                <Link className={buttonVariants({ variant: 'outline' })} href='/dashboard/produk'>
                    <IconArrowLeft />
                    Kembali
                </Link>
            </Heading>
            <div className='grid gap-4 py-6 lg:grid-cols-[300px_1fr]'>
                <div className='aspect-square rounded-lg border shadow-sm'>
                    <Suspense fallback={<Skeleton className='size-full' />}>
                        <ProdukImage id={id} />
                    </Suspense>
                </div>
                <Suspense fallback={<Skeleton className='size-full' />}>
                    <ProdukDetailPage id={id} />
                </Suspense>
            </div>
        </div>
    )
}

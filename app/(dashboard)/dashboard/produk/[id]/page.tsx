import Image from 'next/image'
import { Suspense } from 'react'
import { Badge } from '@/components/ui/badge'
import { Card } from '@/components/ui/card'
import { Field, FieldDescription, FieldLabel } from '@/components/ui/field'
import { Skeleton } from '@/components/ui/skeleton'
import { formatRupiah } from '@/lib/utils'
import { getItem } from '@/server/repositories/items.repository'

export default async function ProductPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params
    const data = await getItem(id)

    if (!data) {
        return <div>Item not found</div>
    }

    return (
        <div className='grid gap-4 px-6 lg:grid-cols-[300px_1fr]'>
            <div className='aspect-square rounded-lg border shadow-sm'>
                <Suspense fallback={<Skeleton className='size-full' />}>
                    <Image
                        alt={data?.name ?? 'Image'}
                        className='size-full object-cover'
                        height={512}
                        src={data?.image ?? ''}
                        width={512}
                    />
                </Suspense>
            </div>
            <Suspense fallback={<Skeleton className='size-full' />}>
                <Card>
                    <Card.Header>
                        <Card.Title>{data.name}</Card.Title>
                        <Card.Description>
                            {data.isProduct ? <Badge>Dijual</Badge> : <Badge>Tidak Dijual</Badge>}
                        </Card.Description>
                    </Card.Header>
                    <Card.Content className='grid grid-cols-1 gap-6 md:grid-cols-[300px_1fr]'>
                        <div className='w-full max-w-sm'>
                            <Field orientation='horizontal'>
                                <FieldLabel>Harga Beli</FieldLabel>
                                <FieldDescription>{formatRupiah(data.buyPrice!)}</FieldDescription>
                            </Field>
                            <Field orientation='horizontal'>
                                <FieldLabel>Harga Jual</FieldLabel>
                                <FieldDescription>{formatRupiah(data.sellPrice!)}</FieldDescription>
                            </Field>
                        </div>
                    </Card.Content>
                </Card>
            </Suspense>
        </div>
    )
}

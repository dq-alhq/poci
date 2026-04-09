import { IconEdit } from '@tabler/icons-react'
import Image from 'next/image'
import Link from 'next/link'
import { AlertDialog } from '@/components/alert-dialog'
import { Badge } from '@/components/ui/badge'
import { buttonVariants } from '@/components/ui/button-group'
import { Card } from '@/components/ui/card'
import { Field, FieldDescription, FieldLabel } from '@/components/ui/field'
import { Skeleton } from '@/components/ui/skeleton'
import { formatRupiah } from '@/lib/utils'
import { getItem } from '@/server/repositories/items.repository'

export async function ProdukDetailPage({ id }: { id: string }) {
    const data = await getItem(id)

    if (!data) {
        return <div>Item not found</div>
    }
    return (
        <Card>
            <Card.Header>
                <Card.Title>{data.name}</Card.Title>
                <Card.Description>
                    {data.isProduct ? <Badge>Dijual</Badge> : <Badge>Tidak Dijual</Badge>}
                </Card.Description>
                <Card.Action className='space-x-2'>
                    <AlertDialog data='product' id={id} />
                    <Link className={buttonVariants({ variant: 'outline' })} href={`/dashboard/produk/${id}/edit`}>
                        <IconEdit />
                        Edit
                    </Link>
                </Card.Action>
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
    )
}

export async function ProdukImage({ id }: { id: string }) {
    const data = await getItem(id)

    if (!data) {
        return <Skeleton className='size-full object-cover' />
    }
    return (
        <Image
            alt={data?.name ?? 'Image'}
            className='size-full object-cover'
            height={512}
            src={data?.image ?? ''}
            width={512}
        />
    )
}

import { IconEdit } from '@tabler/icons-react'
import Image from 'next/image'
import Link from 'next/link'
import { AlertDialog } from '@/components/alert-dialog'
import { buttonVariants } from '@/components/ui/button-group'
import { Card } from '@/components/ui/card'
import { Field, FieldDescription, FieldLabel } from '@/components/ui/field'
import { Skeleton } from '@/components/ui/skeleton'
import { formatRupiah } from '@/lib/utils'
import { getProduct } from '@/server/repositories/products.repository'

export async function ProdukDetailPage({ id }: { id: string }) {
    const data = await getProduct(id)

    if (!data) {
        return <div>Produk tidak ditemukan</div>
    }
    return (
        <Card>
            <Card.Header>
                <Card.Title>{data.name}</Card.Title>
                <Card.Description>{formatRupiah(data.price)}</Card.Description>
                <Card.Action className='space-x-2'>
                    <AlertDialog data='product' id={id} />
                    <Link
                        className={buttonVariants({ variant: 'outline' })}
                        href={`/app/(dashboard)/(admin)/dashboard/produk/${id}/edit`}
                    >
                        <IconEdit />
                        Edit
                    </Link>
                </Card.Action>
            </Card.Header>
            <Card.Content>
                <div className='w-full max-w-sm'>
                    <Field orientation='horizontal'>
                        <FieldLabel>Terjual</FieldLabel>
                        {/* HARDCODED */}
                        <FieldDescription>20 pcs</FieldDescription>
                    </Field>
                </div>
            </Card.Content>
        </Card>
    )
}

export async function ProdukImage({ id }: { id: string }) {
    const data = await getProduct(id)

    if (!data?.image) {
        return <Skeleton className='size-full object-cover' />
    }
    return (
        <Image
            alt={data?.name ?? 'Image'}
            className='size-full object-cover'
            height={512}
            src={data?.image}
            width={512}
        />
    )
}

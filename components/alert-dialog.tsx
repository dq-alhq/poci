'use client'
import { IconTrash } from '@tabler/icons-react'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { toast } from 'sonner'
import { deleteOutlet } from '@/server/services/outlet.service'
import { deleteProduct } from '@/server/services/products.service'
import { Button } from './ui/button'
import { Dialog } from './ui/dialog'

export const AlertDialog = ({ id, data }: { id: string; data: 'product' | 'outlet' }) => {
    const router = useRouter()
    const [loading, setLoading] = useState(false)
    const onConfirm = async () => {
        setLoading(true)
        switch (data) {
            case 'product': {
                const res = await deleteProduct(id)
                if (res.success) {
                    toast.success(res.message ?? 'Produk berhasil dihapus')
                } else {
                    toast.error(res.message ?? 'Produk gagal dihapus')
                }
                break
            }
            case 'outlet': {
                const res = await deleteOutlet(id)
                if (res.success) {
                    toast.success(res.message ?? 'Outlet berhasil dihapus')
                } else {
                    toast.error(res.message ?? 'Outlet gagal dihapus')
                }
                break
            }
            default:
                break
        }
        setLoading(false)
        router.back()
    }

    return (
        <Dialog>
            <Button variant='destructive'>
                <IconTrash />
                Hapus
            </Button>
            <Dialog.Content role='alertdialog'>
                <Dialog.Header>
                    <Dialog.Title>Hapus Data</Dialog.Title>
                    <Dialog.Description>Apakah anda yakin ingin menghapus data ini?</Dialog.Description>
                </Dialog.Header>
                <Dialog.Footer>
                    <Button isDisabled={loading} slot='close' variant='secondary'>
                        Batal
                    </Button>
                    <Button isPending={loading} onPress={onConfirm} variant='destructive'>
                        <IconTrash />
                        Hapus
                    </Button>
                </Dialog.Footer>
            </Dialog.Content>
        </Dialog>
    )
}

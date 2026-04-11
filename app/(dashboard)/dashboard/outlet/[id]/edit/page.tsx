import { getOutlet } from '@/server/repositories/outlet.repository'
import EditOutletForm from './edit-outlet-form'

export default async function EditOutletPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params
    const outlet = await getOutlet(id)
    if (!outlet) {
        throw new Error('Outlet not found')
    }
    return <EditOutletForm data={outlet} />
}

import { getOutlets, getUsers } from '@/server/repositories/shift.repository'
import { ShiftForm } from './shift-form'

export const ShiftCreatePage = async () => {
    const [users, outlets] = await Promise.all([getUsers(), getOutlets()])
    return <ShiftForm outlets={outlets} users={users} />
}

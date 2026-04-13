import { getShifts } from '@/server/repositories/shift.repository'
import { ShiftTable } from './shift-table'

export const ShiftList = async () => {
    const shifts = await getShifts()
    return (
        <div>
            <ShiftTable shifts={shifts} />
        </div>
    )
}

'use server'

import z from 'zod'
import db from '@/lib/prisma'

const endShiftSchema = z.object({
    shiftId: z.coerce.number(),
    outletId: z.string(),
    damagedItems: z.array(
        z.object({
            itemId: z.string(),
            quantity: z.coerce.number()
        })
    ),
    saleItems: z.array(
        z.object({
            itemId: z.string(),
            quantity: z.coerce.number()
        })
    ),
    returnItems: z.array(
        z.object({
            itemId: z.string(),
            quantity: z.coerce.number()
        })
    )
})

export const endShiftForAll = async (_: any, formData: FormData) => {
    const { success, data, error } = endShiftSchema.safeParse(Object.fromEntries(formData))
    if (!success) {
        return {
            success: false,
            error: z.flattenError(error).fieldErrors
        }
    }

    try {
        await db.$transaction(async (tx) => [
            tx.shift.update({
                where: {
                    id: data?.shiftId
                },
                data: {
                    end: new Date(),
                    isOpen: false
                }
            }),
            tx.outletStock.deleteMany({
                where: {
                    outletId: data?.outletId
                }
            })
        ])
    } catch (error: any) {
        return {
            success: false,
            message: error.message
        }
    }
}

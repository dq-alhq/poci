import db from '@/lib/prisma'

export async function createExpense({
    type,
    title,
    items,
    total,
    userId
}: {
    title: string
    type: 'ITEM' | 'NON_ITEM'
    total: number
    userId: string
    items?: { qty: number; price: number; id: string }[]
}) {
    return db.$transaction(async (tx) => {
        if (type === 'NON_ITEM') {
            if (!total) throw new Error('Total wajib')

            return tx.expense.create({
                data: {
                    title,
                    type,
                    total,
                    createdById: userId
                }
            })
        }

        if (type === 'ITEM') {
            if (!items?.length) throw new Error('Item wajib')

            const computedTotal = items.reduce((sum, i) => sum + i.qty * i.price, 0)

            return tx.expense.create({
                data: {
                    title,
                    type,
                    total: computedTotal,
                    createdById: userId,
                    expenseItems: {
                        create: items
                    }
                }
            })
        }
    })
}

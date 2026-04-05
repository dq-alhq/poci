import { auth } from '@/lib/auth'
import db from '@/lib/prisma'

async function main() {
    console.info('🌱 Seeding start...')

    //////////////////////////
    // USERS
    //////////////////////////

    const admin = await auth.api.createUser({
        body: {
            name: 'Yuni',
            email: 'admin@mail.com',
            role: 'admin',
            password: 'password',
            data: {
                username: 'yuni'
            }
        }
    })

    const kasir = await auth.api.createUser({
        body: {
            name: 'Sasha',
            email: 'sasha@mail.com',
            role: 'user',
            password: 'password',
            data: {
                username: 'sasha'
            }
        }
    })

    const kasir2 = await auth.api.createUser({
        body: {
            name: 'Pipit',
            email: 'pipit@mail.com',
            role: 'user',
            password: 'password',
            data: {
                username: 'pipit'
            }
        }
    })

    //////////////////////////
    // OUTLET
    //////////////////////////

    const outlet = await db.outlet.create({
        data: {
            name: 'Melirang'
        }
    })

    //////////////////////////
    // INVENTORY ITEMS
    //////////////////////////

    const inventoryNames = [
        // rasa
        'Cappuchino',
        'Chocolate',
        'Thai tea',
        'Matcha',
        'Milk tea',
        'Apel',
        'Mangga',
        'Lecy',
        'Blackcurrant',
        'Lemon Honey',
        'Orange',

        // cup
        'Cup Kecil',
        'Cup Jumbo',
        'Cup Xtra',

        // lainnya
        'Es Batu',
        'Sedotan',

        'Galon 19L',
        'Kantong Teh'
    ]

    const inventoryItems = []

    for (const name of inventoryNames) {
        const item = await db.item.create({
            data: {
                name,
                unit: 'pcs',
                price: 2000,
                sellPrice: 3000
            }
        })
        inventoryItems.push(item)
    }

    //////////////////////////
    // WAREHOUSE STOCK AWAL
    //////////////////////////

    for (const item of inventoryItems) {
        let qty = 100

        // custom stok awal biar realistis
        if (item.name.includes('Cup')) qty = 500
        if (item.name === 'Sedotan') qty = 1000
        if (item.name === 'Es Batu') qty = 50

        await db.stock.create({
            data: {
                itemId: item.id,
                qty,
                createdById: admin.user.id
            }
        })
    }

    //////////////////////////
    // SHIFT CONTOH (OPTIONAL)
    //////////////////////////

    const shift = await db.shift.create({
        data: {
            outletId: outlet.id,
            userId: kasir.user.id,
            createdById: admin.user.id,
            date: new Date()
        }
    })

    const shift2 = await db.shift.create({
        data: {
            outletId: outlet.id,
            userId: kasir2.user.id,
            createdById: admin.user.id,
            date: new Date()
        }
    })

    // contoh isi shift (kayak laporan pagi)
    for (const item of inventoryItems) {
        let qtyOut = 5

        if (item.name.includes('Cup')) qtyOut = 50
        if (item.name === 'Es Batu') qtyOut = 3

        await db.shiftItem.create({
            data: {
                shiftId: shift.id,
                itemId: item.id,
                qtyOut,
                sellPrice: 2000
            }
        })

        await db.shiftItem.create({
            data: {
                shiftId: shift2.id,
                itemId: item.id,
                qtyOut,
                sellPrice: item.sellPrice
            }
        })
    }

    console.info('✅ Seeding selesai!')
}

main()
    .catch((e) => {
        console.error(e)
        process.exit(1)
    })
    .finally(async () => {
        await db.$disconnect()
    })

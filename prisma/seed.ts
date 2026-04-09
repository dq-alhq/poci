import { auth } from '@/lib/auth'
import db from '@/lib/prisma'
import Products from './products.json'

async function main() {
    console.info('🌱 Seeding start...')

    //////////////////////////
    // USERS
    //////////////////////////

    console.info('👦 Seeding users')

    await db.user.deleteMany()

    const _admin = await auth.api.createUser({
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

    const _sasha = await auth.api.createUser({
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

    const _pipit = await auth.api.createUser({
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
    console.info('✅ User Created!')

    console.info('🧃 Seeding Products')
    await db.product.deleteMany()
    await db.product.createMany({
        data: Products
    })
    console.info('✅ Products Created!')

    console.info('🏠 Seeding Outlets')
    await db.outlet.deleteMany()
    await db.outlet.create({
        data: {
            name: 'Gudang Utama'
        }
    })

    await db.outlet.create({
        data: {
            name: 'Cabang Melirang',
            location: 'Dsn.Galalo RT.09 RW.04 (Samping Tugu Pereng Kulon)'
        }
    })
    console.info('✅ Outlet Created!')

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

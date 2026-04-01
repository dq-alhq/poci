import { auth } from '@/lib/auth'

async function main() {
    console.info('🌱 Seeding starting...')

    await auth.api.createUser({
        body: {
            email: 'admin@gmail.com',
            name: 'Administrator',
            password: 'password',
            role: 'admin',
            data: { username: 'admin', displayUsername: 'Administrator' }
        }
    })

    console.info('🌱 Seeding completed...')
}

main()

import { NextResponse } from 'next/server'
import db from '@/lib/prisma'

export async function GET() {
    const _users = await db.user.findMany()
    return NextResponse.json('ok')
}

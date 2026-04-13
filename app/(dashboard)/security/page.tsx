import type { Metadata } from 'next'
import ProfileUpdateForm from './form'

export const metadata: Metadata = {
    title: 'Keamanan'
}

export default async function Page() {
    return <ProfileUpdateForm />
}

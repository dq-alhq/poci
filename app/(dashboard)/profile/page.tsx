import type { Metadata } from 'next'
import ProfileUpdateForm from './form'

export const metadata: Metadata = {
    title: 'Pengaturan Profil'
}
export default async function Page() {
    return <ProfileUpdateForm />
}

import { IconKey, IconLayoutGrid, IconUserCircle, IconUsers } from '@tabler/icons-react'

export const getNavigations = (role: string | undefined) => {
    const mainNavigations = [
        {
            title: 'Dashboard',
            href: '/dashboard',
            icon: IconLayoutGrid,
            show: true
        }
    ]

    const footerNavigations = [
        {
            title: 'Users Management',
            href: '/users',
            icon: IconUsers,
            show: role === 'admin'
        },
        {
            title: 'Profile',
            href: '/profile',
            icon: IconUserCircle,
            show: true
        },
        {
            title: 'Security',
            href: '/security',
            icon: IconKey,
            show: true
        }
    ]

    return {
        mainNavigations,
        footerNavigations
    }
}

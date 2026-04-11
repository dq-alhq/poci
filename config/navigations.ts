import {
    IconBuildingStore,
    IconBuildingWarehouse,
    IconClock,
    IconHome,
    IconKey,
    IconLayoutGrid,
    IconMoneybagMinus,
    IconPackage,
    IconShoppingCart,
    IconUserCircle,
    IconUsers
} from '@tabler/icons-react'

export const getNavigations = (role: string | undefined) => {
    const mainNavigations = [
        {
            title: 'Dashboard',
            href: '/dashboard',
            icon: IconLayoutGrid,
            show: true
        },
        {
            title: 'Produk',
            href: '/dashboard/produk',
            icon: IconPackage,
            show: true
        },
        {
            title: 'Outlet',
            href: '/dashboard/outlet',
            icon: IconBuildingStore,
            show: true
        },
        {
            title: 'Stok',
            href: '/dashboard/stok',
            icon: IconBuildingWarehouse,
            show: true
        },
        {
            title: 'Pembelanjaan',
            href: '/dashboard/pembelanjaan',
            icon: IconShoppingCart,
            show: true
        },
        {
            title: 'Pengeluaran',
            href: '/dashboard/pengeluaran',
            icon: IconMoneybagMinus,
            show: true
        },
        {
            title: 'Shift',
            href: '/dashboard/shift',
            icon: IconClock,
            show: true
        }
    ]

    const userNavigations = [
        {
            title: 'Home',
            href: '/',
            icon: IconHome,
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
        footerNavigations,
        userNavigations
    }
}

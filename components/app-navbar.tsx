'use client'

import type { User } from '@/lib/auth'
import type { NavItem } from '@/types'
import { IconChevronDown, IconLogout, IconUserCircle } from '@tabler/icons-react'
import { usePathname, useRouter } from 'next/navigation'
import { Avatar } from '@/components/ui/avatar'
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger
} from '@/components/ui/dropdown-menu'
import {
    Navbar,
    NavbarCompact,
    NavbarFlex,
    NavbarItem,
    NavbarLogo,
    NavbarNav,
    NavbarSection,
    NavbarTrigger
} from '@/components/ui/navbar'
import { getNavigations } from '@/config/navigations'
import { authClient } from '@/lib/auth-client'
import { AppLogo } from './app-logo'
import { ModeToggle } from './mode-toggle'

export default function AppNavbar({ user }: { user: User }) {
    if (!user.role) {
        return null
    }
    const { userNavigations } = getNavigations(user.role)
    return (
        <Navbar isSticky variant='floating'>
            <NavbarNav>
                <NavbarLogo aria-label='Goto documenation of Navbar' href='/'>
                    <AppLogo className='h-10' />
                </NavbarLogo>
                <NavbarSection>
                    <Navigation items={userNavigations} />
                </NavbarSection>

                <NavbarSection className='ml-auto hidden md:flex'>
                    <NavbarFlex className='sm:gap-x-1'>
                        <ModeToggle variant='ghost' />
                    </NavbarFlex>
                    <NavUser user={user} />
                </NavbarSection>
            </NavbarNav>
            <NavbarCompact>
                <NavbarFlex>
                    <NavbarTrigger className='-ml-2' />
                    <NavbarLogo aria-label='Goto documenation of Navbar' href='/'>
                        <AppLogo className='-ml-2 h-8' />
                    </NavbarLogo>
                </NavbarFlex>
                <NavbarFlex>
                    <Navbar.Flex>
                        <ModeToggle variant='ghost' />
                    </Navbar.Flex>
                    <NavUser user={user} />
                </NavbarFlex>
            </NavbarCompact>
        </Navbar>
    )
}

const Navigation = ({ items }: { items: NavItem[] }) => {
    const pathname = usePathname()

    return items.map((item) =>
        item.items ? (
            <DropdownMenu key={item.title}>
                <NavbarItem isActive={pathname === item.href}>
                    {item.icon && <item.icon />}
                    <span>{item.title}</span>
                    <IconChevronDown className='ml-auto in-aria-expanded:rotate-180 transition-transform' />
                </NavbarItem>
                <DropdownMenuContent placement='bottom start'>
                    {item.items?.map((subItem) => (
                        <DropdownMenuItem href={subItem.href} key={subItem.title}>
                            {subItem.title}
                        </DropdownMenuItem>
                    ))}
                </DropdownMenuContent>
            </DropdownMenu>
        ) : (
            <NavbarItem href={item.href} isActive={pathname === item.href} key={item.title}>
                {item.icon && <item.icon />}
                <span>{item.title}</span>
            </NavbarItem>
        )
    )
}

const NavUser = ({ user }: { user: User }) => {
    const router = useRouter()
    const signOut = async () => {
        await authClient.signOut({
            fetchOptions: {
                onSuccess: () => {
                    router.push('/login')
                }
            }
        })
    }
    return (
        <DropdownMenu>
            <DropdownMenuTrigger className='data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground'>
                <Avatar alt={user.name} className='size-8 rounded-md' src={user.image || ''} />
            </DropdownMenuTrigger>
            <DropdownMenuContent aria-label='User Menu' className='min-w-56 rounded-lg' placement='bottom end'>
                <DropdownMenuLabel className='p-0 font-normal'>
                    <div className='flex items-center gap-2 px-1 py-1.5 text-left text-sm'>
                        <Avatar alt={user.name} className='h-8 w-8 rounded-lg' src={user?.image ?? ''} />
                        <div className='grid flex-1 text-left text-sm leading-tight'>
                            <span className='truncate font-medium'>{user.name}</span>
                            <span className='truncate text-muted-foreground text-xs'>{user.email}</span>
                        </div>
                    </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuGroup>
                    <DropdownMenuItem href='/profile'>
                        <IconUserCircle />
                        Profile
                    </DropdownMenuItem>
                </DropdownMenuGroup>
                <DropdownMenuSeparator />
                <DropdownMenuItem onAction={signOut} variant='destructive'>
                    <IconLogout />
                    Logout
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}

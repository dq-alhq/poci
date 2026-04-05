'use client'

import {
    IconBell,
    IconChevronDown,
    IconCircleCheck,
    IconCreditCard,
    IconHome,
    IconLayoutNavbar,
    IconLayoutSidebar,
    IconLogout,
    IconSparkles
} from '@tabler/icons-react'
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
import { AppLogo } from './app-logo'
import { ModeToggle } from './mode-toggle'

type NavMenu = {
    title: string
    url?: string
    icon?: React.ComponentType<{ className?: string }>
    items?: {
        title: string
        url: string
    }[]
}[]

const navigations: NavMenu = [
    {
        title: 'Home',
        url: '#',
        icon: IconHome
    },
    {
        title: 'Sidebars',
        url: '/block/layouts/sidebar',
        icon: IconLayoutSidebar,
        items: [
            {
                title: 'Default',
                url: '/block/layouts/sidebar/sidebar-demo'
            },
            {
                title: 'Floating',
                url: '/block/layouts/sidebar/sidebar-floating-demo'
            },
            {
                title: 'Inset',
                url: '/block/layouts/sidebar/sidebar-inset-demo'
            },
            {
                title: 'Default Icon',
                url: '/block/layouts/sidebar/sidebar-icon-demo'
            },
            {
                title: 'Floating Icon',
                url: '/block/layouts/sidebar/sidebar-floating-icon-demo'
            },
            {
                title: 'Inset Icon',
                url: '/block/layouts/sidebar/sidebar-inset-icon-demo'
            },
            {
                title: 'Fixed',
                url: '/block/layouts/sidebar/sidebar-fixed-demo'
            }
        ]
    },
    {
        title: 'Navbars',
        url: '/block/layouts/navbar',
        icon: IconLayoutNavbar,
        items: [
            {
                title: 'Default',
                url: '/block/layouts/navbar/navbar-demo'
            },
            {
                title: 'Floating',
                url: '/block/layouts/navbar/navbar-floating-demo'
            },
            {
                title: 'Inset',
                url: '/block/layouts/navbar/navbar-inset-demo'
            }
        ]
    }
]

const user = {
    name: 'DQ Al Haqqi',
    email: 'dq.alhaqqi@gmail.com',
    avatar: 'https://github.com/dq-alhq.png'
}

export default function AppNavbar() {
    return (
        <Navbar isSticky variant='floating'>
            <NavbarNav>
                <NavbarLogo aria-label='Goto documenation of Navbar' href='/'>
                    <AppLogo className='h-10' />
                </NavbarLogo>
                <NavbarSection>
                    <Navigation items={navigations} />
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

const Navigation = ({ items }: { items: NavMenu }) => {
    return items.map((item) =>
        item.items ? (
            <DropdownMenu key={item.title}>
                <NavbarItem isActive={item.title === 'Navbar'}>
                    {item.icon && <item.icon />}
                    <span>{item.title}</span>
                    <IconChevronDown className='ml-auto in-aria-expanded:rotate-180 transition-transform' />
                </NavbarItem>
                <DropdownMenuContent placement='bottom start'>
                    {item.items?.map((subItem) => (
                        <DropdownMenuItem href={subItem.url} key={subItem.title}>
                            {subItem.title}
                        </DropdownMenuItem>
                    ))}
                </DropdownMenuContent>
            </DropdownMenu>
        ) : (
            <NavbarItem href={item.url} key={item.title}>
                {item.icon && <item.icon />}
                <span>{item.title}</span>
            </NavbarItem>
        )
    )
}

const NavUser = ({
    user
}: {
    user: {
        name: string
        email: string
        avatar: string
    }
}) => {
    return (
        <DropdownMenu>
            <DropdownMenuTrigger className='data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground'>
                <Avatar alt={user.name} className='size-8 rounded-md' src={user.avatar} />
            </DropdownMenuTrigger>
            <DropdownMenuContent className='min-w-56 rounded-lg' placement='bottom end'>
                <DropdownMenuLabel className='p-0 font-normal'>
                    <div className='flex items-center gap-2 px-1 py-1.5 text-left text-sm'>
                        <Avatar alt={user.name} className='size-8 rounded-md' src={user.avatar} />
                        <div className='grid flex-1 text-left text-sm leading-tight'>
                            <span className='truncate font-medium'>{user.name}</span>
                            <span className='truncate text-xs'>{user.email}</span>
                        </div>
                    </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuGroup>
                    <DropdownMenuItem>
                        <IconSparkles />
                        Upgrade to Pro
                    </DropdownMenuItem>
                </DropdownMenuGroup>
                <DropdownMenuSeparator />
                <DropdownMenuGroup>
                    <DropdownMenuItem>
                        <IconCircleCheck />
                        Account
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                        <IconCreditCard />
                        Billing
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                        <IconBell />
                        Notifications
                    </DropdownMenuItem>
                </DropdownMenuGroup>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                    <IconLogout />
                    Log out
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}

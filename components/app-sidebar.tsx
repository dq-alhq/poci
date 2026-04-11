'use client'

import type { User } from '@/lib/auth'
import type { NavItem } from '@/types'
import { IconChevronRight, IconInnerShadowTop, IconLogout, IconSelector, IconUserCircle } from '@tabler/icons-react'
import { usePathname, useRouter } from 'next/navigation'
import { useEffect } from 'react'
import { Avatar } from '@/components/ui/avatar'
import { Collapsible, CollapsibleContent } from '@/components/ui/collapsible'
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator
} from '@/components/ui/dropdown-menu'
import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarGroup,
    SidebarGroupLabel,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    SidebarMenuSub,
    SidebarMenuSubButton,
    SidebarMenuSubItem,
    useSidebar
} from '@/components/ui/sidebar'
import { getNavigations } from '@/config/navigations'
import { authClient } from '@/lib/auth-client'

interface AppSidebarProps extends React.ComponentProps<typeof Sidebar> {
    user: User
}

export function AppSidebar({ user, ...props }: AppSidebarProps) {
    const pathname = usePathname()
    const { setOpenMobile, openMobile } = useSidebar()

    useEffect(() => {
        if (openMobile) {
            setOpenMobile(false)
        }
    }, [pathname])

    if (!user.role) {
        throw new Error('AppSidebar requires a user but received undefined.')
    }

    const { mainNavigations, footerNavigations } = getNavigations(user?.role)

    return (
        <Sidebar collapsible='offcanvas' {...props}>
            <SidebarHeader>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton href={'/dashboard'} size='lg'>
                            <IconInnerShadowTop className='size-5!' />
                            <span className='font-semibold text-base'>Dashboard</span>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarHeader>
            <SidebarContent>
                <NavMenu items={mainNavigations} />
                <NavMenu className='mt-auto' items={footerNavigations} />
            </SidebarContent>
            <SidebarFooter>
                <NavUser user={user} />
            </SidebarFooter>
        </Sidebar>
    )
}

function NavMenu({
    items,
    title,
    ...props
}: {
    items: NavItem[]
    title?: string
} & React.ComponentPropsWithoutRef<typeof SidebarGroup>) {
    const pathname = usePathname()

    return (
        <SidebarGroup {...props}>
            {title && <SidebarGroupLabel>{title}</SidebarGroupLabel>}
            <SidebarMenu>
                {items
                    .filter((i) => i.show)
                    .map((item) =>
                        item.items ? (
                            <Collapsible defaultExpanded={true} key={item.href as string}>
                                <SidebarMenuItem>
                                    <SidebarMenuButton tooltip={item.title}>
                                        {item.icon && <item.icon />}
                                        <span>{item.title}</span>
                                        <IconChevronRight className='ml-auto transition-transform duration-200 group-data-expanded/collapsible:rotate-90' />
                                    </SidebarMenuButton>
                                    <CollapsibleContent>
                                        <SidebarMenuSub>
                                            {item.items
                                                .filter((i) => i.show)
                                                .map((subItem) => (
                                                    <SidebarMenuSubItem key={subItem.href as string}>
                                                        <SidebarMenuSubButton
                                                            href={subItem.href as string}
                                                            isActive={
                                                                subItem.href === '/dashboard'
                                                                    ? pathname === subItem.href
                                                                    : pathname.startsWith(subItem.href)
                                                            }
                                                        >
                                                            {subItem.icon && <subItem.icon />}
                                                            <span>{subItem.title}</span>
                                                        </SidebarMenuSubButton>
                                                    </SidebarMenuSubItem>
                                                ))}
                                        </SidebarMenuSub>
                                    </CollapsibleContent>
                                </SidebarMenuItem>
                            </Collapsible>
                        ) : (
                            <SidebarMenuItem key={item.href as string}>
                                <SidebarMenuButton
                                    href={item.href as string}
                                    isActive={
                                        item.href === '/dashboard'
                                            ? pathname === item.href
                                            : pathname.startsWith(item.href)
                                    }
                                    tooltip={item.title}
                                >
                                    {item.icon && <item.icon />}
                                    <span>{item.title}</span>
                                </SidebarMenuButton>
                            </SidebarMenuItem>
                        )
                    )}
            </SidebarMenu>
        </SidebarGroup>
    )
}

function NavUser({ user }: { user: User }) {
    const { isMobile, state } = useSidebar()
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
        <SidebarMenu>
            <SidebarMenuItem>
                <DropdownMenu>
                    <SidebarMenuButton
                        className='group text-sidebar-accent-foreground data-[state=open]:bg-sidebar-accent'
                        data-test='sidebar-menu-button'
                        size='lg'
                        slot={null}
                    >
                        <Avatar alt={user.name} className='h-8 w-8 rounded-lg grayscale' src={user?.image ?? ''} />
                        <div className='grid flex-1 text-left text-sm leading-tight'>
                            <span className='truncate font-medium'>{user.name}</span>
                            <span className='truncate text-muted-foreground text-xs'>{user.email}</span>
                        </div>
                        <IconSelector className='ml-auto size-4' />
                    </SidebarMenuButton>
                    <DropdownMenuContent
                        aria-label='User Menu'
                        className='w-(--trigger-width) min-w-56 rounded-lg'
                        placement={isMobile ? 'bottom' : state === 'collapsed' ? 'left' : 'bottom'}
                    >
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
            </SidebarMenuItem>
        </SidebarMenu>
    )
}

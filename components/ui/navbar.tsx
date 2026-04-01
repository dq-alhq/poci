'use client'

import type { ButtonProps, LinkProps } from 'react-aria-components'
import { IconMenu } from '@tabler/icons-react'
import { type ComponentPropsWithRef, createContext, use, useCallback, useMemo, useState } from 'react'
import { composeRenderProps, Link, Button as RACButton } from 'react-aria-components'
import { tv, type VariantProps } from 'tailwind-variants'
import { useIsMobile } from '@/hooks/use-mobile'
import { cn } from '@/lib/utils'
import { Button } from './button'
import { Sheet } from './sheet'

const HEIGHT = '3.5rem'

type NavbarOptions = {
    isSticky?: boolean
    variant?: 'default' | 'floating' | 'inset'
}

type NavbarContextProps = {
    open: boolean
    setOpen: (open: boolean) => void
    isCompact: boolean
    toggleNavbar: () => void
} & NavbarOptions

const NavbarContext = createContext<NavbarContextProps | null>(null)

function useNavbar() {
    const context = use(NavbarContext)
    if (!context) {
        throw new Error('useNavbar must be used within a Navbar.')
    }

    return context
}

interface NavbarProps extends ComponentPropsWithRef<'header'>, NavbarOptions {
    defaultOpen?: boolean
    isOpen?: boolean
    onOpenChange?: (open: boolean) => void
}

const Navbar = ({
    children,
    isOpen: openProp,
    onOpenChange: setOpenProp,
    defaultOpen = false,
    className,
    isSticky = false,
    variant = 'default',
    ...props
}: NavbarProps) => {
    const isCompact = useIsMobile()
    const [_open, _setOpen] = useState(defaultOpen)
    const open = openProp ?? _open

    const setOpen = useCallback(
        (value: boolean | ((value: boolean) => boolean)) => {
            if (setOpenProp) {
                return setOpenProp?.(typeof value === 'function' ? value(open) : value)
            }

            _setOpen(value)
        },
        [setOpenProp, open]
    )

    const toggleNavbar = useCallback(() => {
        setOpen((open) => !open)
    }, [setOpen])

    const contextValue = useMemo<NavbarContextProps>(
        () => ({
            open,
            setOpen,
            isCompact,
            toggleNavbar,
            variant,
            isSticky
        }),
        [open, setOpen, isCompact, toggleNavbar, variant, isSticky]
    )
    return (
        <NavbarContext value={contextValue}>
            <header
                className={cn(
                    'group/navbar [--navbar-breadcrumbs-height:0px] has-data-navbar-breadcrumbs:[--navbar-breadcrumbs-height:3rem]',
                    'relative isolate flex w-full flex-col',
                    variant === 'floating' && 'px-2.5 pt-2',
                    variant === 'inset' && 'min-h-dvh bg-sidebar',
                    isSticky && 'sticky top-0 z-50',
                    className
                )}
                data-navbar-variant={variant}
                style={{
                    // @ts-expect-error
                    '--navbar-height': HEIGHT
                }}
                {...props}
            >
                {children}
            </header>
        </NavbarContext>
    )
}

interface NavbarNavProps extends ComponentPropsWithRef<'div'> {
    variant?: 'default' | 'floating' | 'inset'
    isSticky?: boolean
    useDefaultResponsive?: boolean
}

const NavbarNav = ({ useDefaultResponsive = true, className, ref, children, ...props }: NavbarNavProps) => {
    const { isCompact, variant, open, setOpen, isSticky } = useNavbar()

    if (isCompact && useDefaultResponsive) {
        return (
            <Sheet isOpen={open} onOpenChange={setOpen} {...props}>
                <Sheet.Trigger className='sr-only' />
                <Sheet.Content aria-label='Compact Navbar' data-navbar='compact' side='left'>
                    <Sheet.Body className='px-2 md:px-4'>{children}</Sheet.Body>
                </Sheet.Content>
            </Sheet>
        )
    }

    return (
        <div
            className={cn(
                'group peer hidden w-full items-center px-4 md:flex md:px-0',
                'h-(--navbar-height)',
                isSticky && 'sticky top-0 z-50',
                '*:mx-auto *:w-full *:max-w-7xl *:items-center md:*:flex lg:*:max-w-(--breakpoint-xl) 2xl:*:max-w-(--breakpoint-2xl)',
                variant === 'floating' &&
                    'mx-auto w-full max-w-7xl rounded-lg border border-sidebar-border bg-sidebar px-4 text-sidebar-foreground shadow-sm md:px-6 lg:max-w-(--breakpoint-xl) lg:px-8 2xl:max-w-(--breakpoint-2xl)',
                variant === 'default' &&
                    'border-sidebar-border border-b bg-sidebar text-sidebar-foreground *:px-4 sm:*:px-6 lg:*:px-8',
                variant === 'inset' &&
                    'mx-auto bg-sidebar md:px-6 [&>div]:mx-auto [&>div]:w-full [&>div]:items-center md:[&>div]:flex',
                className
            )}
            data-navbar-nav='true'
            ref={ref}
            {...props}
        >
            <div>{children}</div>
        </div>
    )
}

const NavbarTrigger = ({ className, onPress, ...props }: ButtonProps) => {
    const { toggleNavbar } = useNavbar()
    return (
        <Button
            aria-label={props['aria-label'] || 'Toggle Navbar'}
            className={className}
            data-navbar-trigger='true'
            onPress={(event) => {
                onPress?.(event)
                toggleNavbar()
            }}
            size='icon'
            variant='ghost'
            {...props}
        >
            <IconMenu />
            <span className='sr-only'>Toggle Navbar</span>
        </Button>
    )
}

const NavbarSection = ({ className, ...props }: ComponentPropsWithRef<'div'>) => {
    const { isCompact } = useNavbar()
    return (
        <div
            className={cn('flex', isCompact ? 'flex-col gap-y-1' : 'flex-row items-center gap-x-3', className)}
            data-navbar-section
            {...props}
        >
            {'title' in props && <h4 className='-mx-2 my-4 px-5 font-medium text-sm md:hidden'>{props.title}</h4>}
            {props.children}
        </div>
    )
}

const navbarItemVariants = tv({
    base: 'peer/menu-button flex w-full select-none items-center gap-2 rounded-md p-2 text-sm outline-hidden transition-[width,height,padding] hover:bg-sidebar-accent hover:text-sidebar-accent-foreground disabled:pointer-events-none disabled:opacity-50 aria-disabled:pointer-events-none aria-disabled:opacity-50 data-[active=true]:bg-sidebar-accent data-[active=true]:font-medium data-[active=true]:text-sidebar-accent-foreground data-focus-visible:ring-2 data-focus-visible:ring-sidebar-ring [&>span:last-child]:truncate [&>svg]:size-4 [&>svg]:shrink-0',
    variants: {
        variant: {
            default: 'hover:bg-sidebar-accent hover:text-sidebar-accent-foreground',
            outline:
                'bg-background shadow-[0_0_0_1px_hsl(var(--sidebar-border))] hover:bg-sidebar-accent hover:text-sidebar-accent-foreground hover:shadow-[0_0_0_1px_hsl(var(--sidebar-accent))]'
        },
        size: {
            default: 'h-8 text-sm',
            sm: 'h-7 text-xs',
            lg: 'h-12 text-sm'
        }
    },
    defaultVariants: {
        variant: 'default',
        size: 'default'
    }
})

const NavbarItem = ({
    className,
    isActive = false,
    variant = 'default',
    size = 'default',
    ...props
}: Omit<LinkProps, 'className' | 'slot'> &
    ButtonProps & {
        isActive?: boolean
    } & VariantProps<typeof navbarItemVariants>) => {
    const Comp = 'href' in props ? Link : RACButton

    return (
        <Comp
            aria-current={isActive ? 'page' : undefined}
            className={cn(navbarItemVariants({ size, variant }), className)}
            data-active={isActive}
            data-navbar='item'
            data-slot='navbar-item'
            type='button'
            {...props}
        />
    )
}

const NavbarLogo = ({ className, ...props }: LinkProps) => {
    return (
        <Link
            className={composeRenderProps(className, (className) =>
                cn(
                    'relative flex items-center gap-x-2 px-2 py-4 text-sidebar-foreground focus:outline-hidden focus-visible:outline-1 focus-visible:outline-sidebar-ring md:mr-6 md:px-0 md:py-0',
                    className
                )
            )}
            {...props}
        />
    )
}

const NavbarFlex = ({ className, ref, ...props }: ComponentPropsWithRef<'div'>) => {
    return <div className={cn('flex items-center gap-2', className)} ref={ref} {...props} />
}

interface NavbarCompactProps extends ComponentPropsWithRef<'div'> {
    variant?: 'floating' | 'inset' | 'default'
}

const NavbarCompact = ({ className, ref, ...props }: NavbarCompactProps) => {
    const { variant } = useNavbar()
    return (
        <div
            className={cn(
                'flex justify-between bg-sidebar text-sidebar-foreground peer-has-data-[navbar-variant=floating]:border peer-has-data-[navbar-variant=floating]:border-sidebar-border md:hidden',
                variant === 'floating' && 'h-12 rounded-lg border px-3.5',
                variant === 'inset' && 'h-14 border-b px-4',
                variant === 'default' && 'h-14 border-b px-4',
                className
            )}
            ref={ref}
            {...props}
        />
    )
}

const NavbarBreadcrumbs = ({ className, ref, children, ...props }: ComponentPropsWithRef<'div'>) => {
    const { variant } = useNavbar()
    return (
        <div
            className={cn(
                'flex h-(--navbar-breadcrumbs-height) items-center',
                variant === 'default' &&
                    'w-full border-sidebar-border border-b bg-sidebar text-sidebar-foreground *:max-w-7xl lg:*:max-w-(--breakpoint-xl) 2xl:*:max-w-(--breakpoint-2xl)',
                variant === 'inset' &&
                    'w-full rounded-lg rounded-b-none border-sidebar-border border-b bg-sidebar px-4 md:mx-auto md:max-w-[calc(100vw-(--spacing(6)))] md:border md:px-6',
                variant === 'floating' &&
                    'mx-auto w-full max-w-7xl rounded-lg px-2 text-foreground md:px-4 lg:max-w-(--breakpoint-xl) 2xl:max-w-(--breakpoint-2xl)',
                className
            )}
            data-navbar-breadcrumbs={true}
            ref={ref}
            {...props}
        >
            <div className={cn(variant === 'default' && 'mx-auto w-full px-4 sm:px-6 lg:px-8')}>{children}</div>
        </div>
    )
}

const NavbarInset = ({ className, ref, ...props }: ComponentPropsWithRef<'div'>) => {
    const { variant } = useNavbar()
    return (
        <div
            className={cn(
                'relative flex w-full flex-col overflow-auto',
                variant === 'default' &&
                    'min-h-[calc(100vh-var(--navbar-height,0px)-var(--navbar-breadcrumbs-height,0px)-8px)]',
                variant === 'inset' &&
                    'mx-auto min-h-[calc(100vh-var(--navbar-height,0px)-var(--navbar-breadcrumbs-height,0px))] max-w-[calc(100vw-(--spacing(6)))] overflow-auto bg-sidebar',
                variant === 'floating' &&
                    'h-[calc(100vh-var(--navbar-height,0px)-var(--navbar-breadcrumbs-height,0px)-8px)] pb-2 md:px-0',
                className
            )}
            ref={ref}
        >
            <main
                className={cn(
                    'mx-auto flex size-full flex-1 grow flex-col',
                    variant === 'inset' &&
                        'max-h-[calc(100vh-var(--navbar-height,0px)-var(--navbar-breadcrumbs-height,0px)-8px)] overflow-auto rounded-lg border-sidebar-border bg-background px-4 shadow md:border md:group-has-data-navbar-breadcrumbs/navbar:rounded-t-none md:group-has-data-navbar-breadcrumbs/navbar:border-t-0',
                    variant === 'default' &&
                        'max-w-7xl px-4 sm:px-6 lg:max-w-(--breakpoint-xl) lg:px-8 2xl:max-w-(--breakpoint-2xl)',
                    variant === 'floating' && 'max-w-7xl px-4 lg:max-w-(--breakpoint-xl) 2xl:max-w-(--breakpoint-2xl)'
                )}
            >
                {props.children}
            </main>
        </div>
    )
}

Navbar.Nav = NavbarNav
Navbar.Inset = NavbarInset
Navbar.Compact = NavbarCompact
Navbar.Flex = NavbarFlex
Navbar.Trigger = NavbarTrigger
Navbar.Logo = NavbarLogo
Navbar.Item = NavbarItem
Navbar.Breadcrumbs = NavbarBreadcrumbs
Navbar.Section = NavbarSection

export {
    Navbar,
    NavbarBreadcrumbs,
    NavbarCompact,
    NavbarFlex,
    NavbarInset,
    NavbarItem,
    NavbarLogo,
    NavbarNav,
    NavbarSection,
    NavbarTrigger
}

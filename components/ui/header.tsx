import type { ComponentPropsWithRef } from 'react'
import { cn } from '@/lib/utils'

interface HeaderProps extends ComponentPropsWithRef<'header'> {
    title?: string
    description?: string
}

const Header = ({ title, description, className, children, ...props }: HeaderProps) => (
    <header
        className={cn(
            'grid items-start gap-1.5 md:auto-rows-min md:grid-rows-[auto_auto] md:has-[[slot=action]]:grid-cols-[1fr_auto]',
            className
        )}
        slot='header'
        {...props}
    >
        {title && <HeaderTitle>{title}</HeaderTitle>}
        {description && <HeaderDescription>{description}</HeaderDescription>}
        {!title && typeof children === 'string' ? <HeaderTitle>{children}</HeaderTitle> : children}
    </header>
)

const HeaderTitle = ({ className, ...props }: ComponentPropsWithRef<'h3'>) => (
    <h3 slot='title' {...props} className={cn('font-semibold text-lg leading-none tracking-tight', className)} />
)

const HeaderDescription = ({ className, ...props }: ComponentPropsWithRef<'div'>) => (
    <div className={cn('text-muted-foreground text-sm md:row-start-2', className)} slot='description' {...props} />
)

const HeaderAction = ({ className, ...props }: ComponentPropsWithRef<'div'>) => (
    <div
        className={cn(
            'flex items-center gap-2 self-start justify-self-end md:col-start-2 md:row-span-2 md:row-start-1',
            className
        )}
        slot='action'
        {...props}
    />
)

Header.Title = HeaderTitle
Header.Description = HeaderDescription
Header.Action = HeaderAction

export { Header, HeaderAction, HeaderDescription, HeaderTitle }

import type { ComponentProps, ComponentPropsWithoutRef } from 'react'
import { Link, type LinkProps } from 'react-aria-components'
import { tv, type VariantProps } from 'tailwind-variants'
import { cn } from '@/lib/utils'
import { Separator } from './separator'

const ItemGroup = ({ className, ...props }: ComponentProps<'div'>) => (
    <div className={cn('group/item-group flex flex-col', className)} data-slot='item-group' role='list' {...props} />
)

const ItemSeparator = ({ className, ...props }: ComponentProps<typeof Separator>) => (
    <Separator className={cn('my-0', className)} data-slot='item-separator' orientation='horizontal' {...props} />
)

const itemVariants = tv({
    base: [
        'group/item flex flex-wrap items-center rounded-md border border-transparent text-sm outline-none transition-colors transition-colors duration-100 hover:bg-accent/50 focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50',
        'data-selected:bg-accent data-selected:text-accent-foreground'
    ],
    variants: {
        variant: {
            default: 'bg-transparent',
            outline: 'border-border',
            muted: 'bg-muted/50'
        },
        size: {
            default: 'gap-4 p-4',
            sm: 'gap-2.5 px-4 py-3'
        }
    },
    defaultVariants: {
        variant: 'default',
        size: 'default'
    }
})

const Item = ({
    className,
    variant = 'default',
    size = 'default',
    ...props
}: Omit<LinkProps, 'slot' | 'className'> &
    Omit<ComponentPropsWithoutRef<'div'>, 'style'> &
    VariantProps<typeof itemVariants>) => {
    const Comp = 'href' in props ? Link : 'div'

    return (
        <Comp
            className={cn(itemVariants({ variant, size, className }))}
            data-size={size}
            data-slot='item'
            data-variant={variant}
            {...props}
        />
    )
}

const itemMediaVariants = tv({
    base: 'flex shrink-0 items-center justify-center gap-2 group-has-[[data-slot=item-description]]/item:translate-y-0.5 group-has-[[data-slot=item-description]]/item:self-start [&_svg]:pointer-events-none',
    variants: {
        variant: {
            default: 'bg-transparent',
            icon: "size-8 rounded-sm border bg-muted [&_svg:not([class*='size-'])]:size-4",
            image: 'size-10 overflow-hidden rounded-sm [&_img]:size-full [&_img]:object-cover'
        }
    },
    defaultVariants: {
        variant: 'default'
    }
})

const ItemMedia = ({
    className,
    variant = 'default',
    ...props
}: ComponentProps<'div'> & VariantProps<typeof itemMediaVariants>) => (
    <div
        className={cn(itemMediaVariants({ variant, className }))}
        data-slot='item-media'
        data-variant={variant}
        {...props}
    />
)

const ItemContent = ({ className, ...props }: ComponentProps<'div'>) => (
    <div
        className={cn('flex flex-1 flex-col gap-1 [&+[data-slot=item-content]]:flex-none', className)}
        data-slot='item-content'
        {...props}
    />
)

const ItemTitle = ({ className, ...props }: ComponentProps<'div'>) => (
    <div
        className={cn('flex w-fit items-center gap-2 font-medium text-sm leading-snug', className)}
        data-slot='item-title'
        {...props}
    />
)

const ItemDescription = ({ className, ...props }: ComponentProps<'p'>) => (
    <p
        className={cn(
            'line-clamp-2 text-balance font-normal text-muted-foreground text-sm leading-normal',
            '[&>a:hover]:text-primary [&>a]:underline [&>a]:underline-offset-4',
            className
        )}
        data-slot='item-description'
        {...props}
    />
)

const ItemActions = ({ className, ...props }: ComponentProps<'div'>) => (
    <div className={cn('flex items-center gap-2', className)} data-slot='item-actions' {...props} />
)

const ItemHeader = ({ className, ...props }: ComponentProps<'div'>) => (
    <div
        className={cn('flex basis-full items-center justify-between gap-2', className)}
        data-slot='item-header'
        {...props}
    />
)

const ItemFooter = ({ className, ...props }: ComponentProps<'div'>) => (
    <div
        className={cn('flex basis-full items-center justify-between gap-2', className)}
        data-slot='item-footer'
        {...props}
    />
)

Item.Media = ItemMedia
Item.Content = ItemContent
Item.Actions = ItemActions
Item.Group = ItemGroup
Item.Separator = ItemSeparator
Item.Title = ItemTitle
Item.Description = ItemDescription
Item.Header = ItemHeader
Item.Footer = ItemFooter

export {
    Item,
    ItemActions,
    ItemContent,
    ItemDescription,
    ItemFooter,
    ItemGroup,
    ItemHeader,
    ItemMedia,
    ItemSeparator,
    ItemTitle,
    itemMediaVariants,
    itemVariants
}

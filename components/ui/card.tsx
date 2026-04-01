import type { ComponentProps } from 'react'
import { cn } from '@/lib/utils'

const Card = ({ className, ...props }: ComponentProps<'div'>) => (
    <div
        className={cn(
            'group/card flex flex-col gap-(--gutter) rounded-lg border bg-card py-(--gutter) text-card-foreground shadow-xs [--gutter:--spacing(6)] has-[table]:overflow-hidden has-[table]:not-has-data-[slot=card-footer]:pb-0 **:data-[slot=table-header]:bg-muted/50 has-[table]:**:data-[slot=card-footer]:border-t **:[table]:overflow-hidden',
            className
        )}
        data-slot='card'
        {...props}
    />
)

const CardHeader = ({ className, ...props }: ComponentProps<'div'>) => (
    <div
        className={cn(
            '@container/card-header grid auto-rows-min grid-rows-[auto_auto] items-start gap-2 px-6 has-data-[slot=card-action]:grid-cols-[1fr_auto] [.border-b]:pb-6',
            className
        )}
        data-slot='card-header'
        {...props}
    />
)
const CardTitle = ({ className, ...props }: ComponentProps<'div'>) => (
    <div className={cn('font-semibold leading-none', className)} data-slot='card-title' {...props} />
)

const CardDescription = ({ className, ...props }: ComponentProps<'div'>) => (
    <div className={cn('text-muted-foreground text-sm', className)} data-slot='card-description' {...props} />
)

const CardAction = ({ className, ...props }: ComponentProps<'div'>) => (
    <div
        className={cn('col-start-2 row-span-2 row-start-1 self-start justify-self-end', className)}
        data-slot='card-action'
        {...props}
    />
)

const CardContent = ({ className, ...props }: ComponentProps<'div'>) => (
    <div className={cn('px-6', className)} data-slot='card-content' {...props} />
)

const CardFooter = ({ className, ...props }: ComponentProps<'div'>) => (
    <div className={cn('flex items-center px-6 [.border-t]:pt-6', className)} data-slot='card-footer' {...props} />
)

Card.Header = CardHeader
Card.Footer = CardFooter
Card.Title = CardTitle
Card.Description = CardDescription
Card.Action = CardAction
Card.Content = CardContent

export { Card, CardAction, CardContent, CardDescription, CardFooter, CardHeader, CardTitle }

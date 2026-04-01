'use client'

import type { ComponentPropsWithoutRef } from 'react'
import { Link, type LinkProps } from 'react-aria-components'
import { tv, type VariantProps } from 'tailwind-variants'
import { cn } from '@/lib/utils'

const badgeVariants = tv({
    base: 'inline-flex w-fit shrink-0 items-center justify-center gap-1 overflow-hidden whitespace-nowrap rounded-full border px-2 py-0.5 font-medium text-xs transition-[color,box-shadow] focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50 aria-invalid:border-destructive aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 [&>svg]:pointer-events-none [&>svg]:size-3',
    variants: {
        variant: {
            default: 'border-transparent bg-primary text-primary-foreground [a&]:hover:bg-primary/90',
            secondary: 'border-transparent bg-secondary text-secondary-foreground [a&]:hover:bg-secondary/90',
            destructive:
                'border-transparent bg-destructive text-white focus-visible:ring-destructive/20 dark:bg-destructive/60 dark:focus-visible:ring-destructive/40 [a&]:hover:bg-destructive/90',
            outline: 'text-foreground [a&]:hover:bg-accent [a&]:hover:text-accent-foreground'
        }
    },
    defaultVariants: {
        variant: 'default'
    }
})

const Badge = ({
    className,
    variant,
    ...props
}: Omit<LinkProps, 'className' | 'slot'> & ComponentPropsWithoutRef<'span'> & VariantProps<typeof badgeVariants>) => {
    const Comp = 'href' in props ? Link : 'span'

    return <Comp className={cn(badgeVariants({ variant }), className)} data-slot='badge' {...props} />
}

export { Badge, badgeVariants }

'use client'

import { composeRenderProps, ToggleButton, type ToggleButtonProps } from 'react-aria-components'
import { tv, type VariantProps } from 'tailwind-variants'
import { cn } from '@/lib/utils'

const toggleVariants = tv({
    base: [
        "group/toggle inline-flex items-center justify-center gap-1 whitespace-nowrap rounded-md font-medium text-sm outline-none transition-[color,box-shadow] hover:bg-muted hover:text-foreground focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50 aria-pressed:bg-muted aria-invalid:border-destructive aria-invalid:ring-destructive/20 data-disabled:pointer-events-none data-selected:bg-muted data-disabled:opacity-50 dark:aria-invalid:ring-destructive/40 [&_svg:not([class*='size-'])]:size-4 [&_svg]:pointer-events-none [&_svg]:shrink-0"
    ],
    variants: {
        variant: {
            default: 'bg-transparent',
            outline: 'border border-input bg-transparent shadow-xs hover:bg-muted'
        },
        size: {
            default: 'h-9 min-w-9 px-2',
            sm: 'h-8 min-w-8 px-1.5',
            lg: 'h-10 min-w-10 px-2.5'
        }
    },
    defaultVariants: {
        variant: 'default',
        size: 'default'
    }
})

export interface ToggleProps extends ToggleButtonProps, VariantProps<typeof toggleVariants> {
    ref?: React.Ref<HTMLButtonElement>
}

const Toggle = ({ className, variant, size, ref, ...props }: ToggleProps) => (
    <ToggleButton
        className={composeRenderProps(className, (className) => cn(toggleVariants({ variant, size }), className))}
        data-slot='toggle'
        ref={ref}
        {...props}
    />
)

export { Toggle, toggleVariants }

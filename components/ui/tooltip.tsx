'use client'

import type { ComponentProps, ReactNode } from 'react'
import {
    Button,
    composeRenderProps,
    OverlayArrow,
    Tooltip as RACTooltip,
    type TooltipProps as RACTooltipProps,
    TooltipTrigger as RACTooltipTrigger
} from 'react-aria-components'
import { cn } from '@/lib/utils'

const Tooltip = (props: ComponentProps<typeof RACTooltipTrigger>) => (
    <RACTooltipTrigger closeDelay={props.closeDelay ?? 100} delay={props.delay ?? 100} {...props} />
)

interface TooltipContentProps extends Omit<RACTooltipProps, 'children'> {
    showArrow?: boolean
    children: ReactNode
    isInverse?: boolean
}

const TooltipContent = ({
    offset = 10,
    showArrow = true,
    isInverse = true,
    className,
    children,
    ...props
}: TooltipContentProps) => {
    return (
        <RACTooltip
            {...props}
            className={composeRenderProps(className, (className) =>
                cn(
                    isInverse ? 'bg-popover-foreground text-popover' : 'bg-popover text-popover-foreground',
                    'group origin-(--trigger-anchor-point) rounded-lg border px-2.5 py-1.5 text-sm will-change-transform',
                    'data-entering:fade-in data-entering:zoom-in-95 data-entering:animate-in',
                    'data-exiting:fade-out data-exiting:zoom-out-95 data-exiting:animate-out',
                    'data-entering:data-[placement=top]:slide-in-from-bottom-2 data-exiting:data-[placement=top]:slide-out-to-bottom-2',
                    'data-entering:data-[placement=bottom]:slide-in-from-top-2 data-exiting:data-[placement=bottom]:slide-out-to-top-2',
                    'data-entering:data-[placement=left]:slide-in-from-right-2 data-exiting:data-[placement=left]:slide-out-to-right-2',
                    'data-entering:data-[placement=right]:slide-in-from-left-2 data-exiting:data-[placement=right]:slide-out-to-left-2',
                    className
                )
            )}
            data-slot='tooltip-content'
            offset={offset}
        >
            {showArrow && (
                <OverlayArrow className='group'>
                    <svg
                        className={cn(
                            'block group-data-[placement=bottom]:rotate-180 group-data-[placement=left]:-rotate-90 group-data-[placement=right]:rotate-90',
                            isInverse ? 'fill-popover-foreground' : 'fill-popover stroke-border'
                        )}
                        height={12}
                        viewBox='0 0 12 12'
                        width={12}
                    >
                        <path d='M0 0 L6 6 L12 0' />
                    </svg>
                </OverlayArrow>
            )}
            {children}
        </RACTooltip>
    )
}

const TooltipTrigger = Button
Tooltip.Trigger = TooltipTrigger
Tooltip.Content = TooltipContent

export { Tooltip, TooltipContent, TooltipTrigger }

'use client'

import {
    Button,
    type ButtonProps,
    DialogTrigger,
    type DialogTriggerProps,
    OverlayArrow,
    type PopoverProps,
    Popover as RACPopover
} from 'react-aria-components'
import { cn } from '@/lib/utils'

const Popover = (props: DialogTriggerProps) => <DialogTrigger data-slot='popover' {...props} />

const PopoverContent = ({ className, offset = 8, arrow = true, ...props }: PopoverProps & { arrow?: boolean }) => {
    return (
        <RACPopover
            className={cn(
                'data-exiting:fade-out-0 data-entering:fade-in-0 data-exiting:zoom-out-95 data-entering:zoom-in-95 data-[placement=bottom]:slide-in-from-top-2 data-[placement=left]:slide-in-from-right-2 data-[placement=right]:slide-in-from-left-2 data-[placement=top]:slide-in-from-bottom-2 z-50 w-72 rounded-md border bg-popover p-4 text-popover-foreground shadow-md outline-hidden data-entering:animate-in data-exiting:animate-out',
                className
            )}
            data-slot='popover-content'
            offset={offset}
            {...props}
        >
            {(values) => (
                <>
                    {arrow && (
                        <OverlayArrow className='group'>
                            <svg
                                className='block fill-popover stroke-border group-data-[placement=bottom]:rotate-180 group-data-[placement=left]:-rotate-90 group-data-[placement=right]:rotate-90'
                                height={12}
                                viewBox='0 0 12 12'
                                width={12}
                            >
                                <path d='M0 0 L6 6 L12 0' />
                            </svg>
                        </OverlayArrow>
                    )}
                    {typeof props.children === 'function' ? props.children(values) : props.children}
                </>
            )}
        </RACPopover>
    )
}

const PopoverTrigger = (props: ButtonProps) => <Button {...props} />

Popover.Trigger = PopoverTrigger
Popover.Content = PopoverContent

export { Popover, PopoverContent, PopoverTrigger }

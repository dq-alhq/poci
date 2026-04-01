'use client'

import { IconChevronDown } from '@tabler/icons-react'
import {
    Button,
    type ButtonProps,
    Disclosure,
    DisclosureGroup,
    type DisclosureGroupProps,
    DisclosurePanel,
    type DisclosurePanelProps,
    type DisclosureProps
} from 'react-aria-components'
import { cn } from '@/lib/utils'

const Accordion = ({ ...props }: DisclosureGroupProps) => {
    return <DisclosureGroup data-slot='accordion' {...props} />
}

const AccordionItem = ({ className, ...props }: DisclosureProps) => {
    return <Disclosure className={cn('border-b last:border-b-0', className)} data-slot='accordion-item' {...props} />
}

const AccordionTrigger = ({ className, children, ...props }: ButtonProps) => {
    return (
        <Button
            className={cn(
                'flex w-full flex-1 items-start justify-between gap-4 rounded-md py-4 text-left font-medium text-sm outline-none transition-all hover:underline focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50 disabled:pointer-events-none disabled:opacity-50 in-data-[expanded=true]:[&>svg]:rotate-180',
                className
            )}
            data-slot='accordion-trigger'
            slot='trigger'
            type='button'
            {...props}
        >
            {(values) => (
                <>
                    {typeof children === 'function' ? children(values) : children}
                    <IconChevronDown className='pointer-events-none size-4 shrink-0 translate-y-0.5 text-muted-foreground transition-transform duration-200' />
                </>
            )}
        </Button>
    )
}

const AccordionContent = ({ className, children, ...props }: DisclosurePanelProps) => {
    return (
        <DisclosurePanel
            className='h-(--disclosure-panel-height) overflow-hidden text-sm transition-[height] duration-200'
            data-slot='accordion-content'
            {...props}
        >
            <div className={cn('pt-0 pb-4', className)}>{children}</div>
        </DisclosurePanel>
    )
}

Accordion.Trigger = AccordionTrigger
Accordion.Item = AccordionItem
Accordion.Content = AccordionContent

export { Accordion, AccordionContent, AccordionItem, AccordionTrigger }

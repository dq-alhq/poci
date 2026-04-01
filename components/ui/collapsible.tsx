'use client'

import {
    Button,
    type ButtonProps,
    composeRenderProps,
    Disclosure,
    DisclosurePanel,
    type DisclosurePanelProps,
    type DisclosureProps
} from 'react-aria-components'
import { cn } from '@/lib/utils'

const Collapsible = ({ className, ...props }: DisclosureProps) => {
    return (
        <Disclosure
            className={composeRenderProps(className, (className) =>
                cn('group/collapsible data-disabled:**:text-muted-foreground', className)
            )}
            data-slot='collapsible'
            {...props}
        />
    )
}

const CollapsibleTrigger = ({ className, ...props }: ButtonProps) => {
    return (
        <Button
            className={composeRenderProps(className, (className) => cn('group/collapsible-trigger', className))}
            data-slot='collapsible-trigger'
            slot='trigger'
            type='button'
            {...props}
        />
    )
}

const CollapsibleContent = ({ className, ...props }: DisclosurePanelProps) => {
    return (
        <DisclosurePanel
            className={composeRenderProps(className, (className) =>
                cn(
                    'h-(--disclosure-panel-height) overflow-hidden duration-200 motion-safe:transition-[height]',
                    className
                )
            )}
            data-slot='collapsible-content'
            {...props}
        />
    )
}

Collapsible.Trigger = CollapsibleTrigger
Collapsible.Content = CollapsibleContent

export { Collapsible, CollapsibleContent, CollapsibleTrigger }

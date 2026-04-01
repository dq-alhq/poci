'use client'

import type { GridListItemProps, GridListProps, TextProps } from 'react-aria-components'
import { IconGripVertical } from '@tabler/icons-react'
import {
    Button,
    composeRenderProps,
    GridListHeader as GridListHeaderPrimitive,
    GridListItem as GridListItemPrimitive,
    GridList as GridListPrimitive,
    GridListSection as GridListSectionPrimitive,
    Text
} from 'react-aria-components'
import { cn } from '@/lib/utils'
import { Checkbox } from './checkbox'

const GridList = <T extends object>({ className, ...props }: GridListProps<T>) => (
    <GridListPrimitive
        className={composeRenderProps(className, (className) =>
            cn(
                'relative flex flex-col gap-y-1 has-data-[slot=grid-list-section]:gap-y-6 *:data-drop-target:border *:data-drop-target:border-accent sm:text-sm/6',
                className
            )
        )}
        data-slot='grid-list'
        {...props}
    />
)

const GridListSection = <T extends object>({
    className,
    ...props
}: React.ComponentProps<typeof GridListSectionPrimitive<T>>) => {
    return <GridListSectionPrimitive className={cn('space-y-1', className)} data-slot='grid-list-section' {...props} />
}

const GridListHeader = ({ className, ...props }: React.ComponentProps<typeof GridListHeaderPrimitive>) => {
    return (
        <GridListHeaderPrimitive
            className={cn('mb-2 font-semibold text-sm/6', className)}
            data-slot='grid-list-header'
            {...props}
        />
    )
}

const GridListItem = ({ className, children, ...props }: GridListItemProps) => {
    const textValue = typeof children === 'string' ? children : undefined
    return (
        <GridListItemPrimitive
            textValue={textValue}
            {...props}
            className={composeRenderProps(className, (className, { isHovered, isFocusVisible, isSelected }) =>
                cn(
                    '[--grid-list-item-bg-active:var(--color-accent)] [--grid-list-item-text-active:var(--color-accent-foreground)]',
                    'group inset-ring inset-ring-border rounded-lg px-3 py-2.5',
                    'relative min-w-0 outline-hidden [--mr-icon:--spacing(2)]',
                    'flex min-w-0 cursor-default items-center gap-2 sm:gap-2.5',
                    'dragging:cursor-grab dragging:opacity-70 dragging:**:[[slot=drag]]:text-(--grid-list-item-text-active)',
                    '**:data-[slot=icon]:size-5 **:data-[slot=icon]:shrink-0 **:data-[slot=icon]:text-muted-foreground sm:**:data-[slot=icon]:size-4',
                    (isSelected || isHovered || isFocusVisible) &&
                        'inset-ring-ring/70 bg-(--grid-list-item-bg-active) text-(--grid-list-item-text-active) **:[.text-muted-foreground]:text-(--grid-list-item-text-active)/60',
                    'href' in props && 'cursor-pointer',
                    className
                )
            )}
        >
            {(values) => (
                <>
                    {values.allowsDragging && (
                        <Button slot='drag'>
                            <IconGripVertical className='size-4' />
                        </Button>
                    )}
                    {values.selectionMode === 'multiple' && values.selectionBehavior === 'toggle' && (
                        <Checkbox
                            className='space-x-0 [--indicator-mt:0] *:gap-x-0 sm:[--indicator-mt:0]'
                            slot='selection'
                        />
                    )}
                    {typeof children === 'function' ? children(values) : children}
                </>
            )}
        </GridListItemPrimitive>
    )
}

const GridListEmptyState = ({ ref, className, ...props }: React.ComponentProps<'div'>) => (
    <div
        className={cn(
            'flex items-center justify-center gap-2 rounded-lg border border-dashed p-6 [&_svg:not([class*="size-"])]:size-4 [&_svg]:pointer-events-none [&_svg]:shrink-0',
            className
        )}
        ref={ref}
        {...props}
    />
)

const GridListSpacer = ({ className, ref, ...props }: React.ComponentProps<'div'>) => {
    return <div aria-hidden className={cn('-ml-4 flex-1', className)} ref={ref} {...props} />
}

const GridListStart = ({ className, ref, ...props }: React.ComponentProps<'div'>) => {
    return <div className={cn('relative flex items-center gap-x-2.5 sm:gap-x-3', className)} ref={ref} {...props} />
}

interface GridListTextProps extends TextProps {
    ref?: React.Ref<HTMLDivElement>
}

const GridListLabel = ({ className, ref, ...props }: GridListTextProps) => (
    <Text className={cn('font-medium', className)} ref={ref} {...props} />
)

const GridListDescription = ({ className, ref, ...props }: GridListTextProps) => (
    <Text
        className={cn('font-normal text-muted-foreground text-sm', className)}
        ref={ref}
        slot='description'
        {...props}
    />
)

GridList.Section = GridListSection
GridList.Header = GridListHeader
GridList.Start = GridListStart
GridList.Spacer = GridListSpacer
GridList.Item = GridListItem
GridList.EmptyState = GridListEmptyState
GridList.Label = GridListLabel
GridList.Description = GridListDescription

export type { GridListItemProps, GridListProps }
export {
    GridList,
    GridListDescription,
    GridListEmptyState,
    GridListHeader,
    GridListItem,
    GridListLabel,
    GridListSection,
    GridListSpacer,
    GridListStart
}

'use client'

import type {
    ListBoxItemProps,
    ListBoxProps,
    ListBoxSectionProps,
    SeparatorProps,
    TextProps
} from 'react-aria-components'
import {
    Collection,
    composeRenderProps,
    Header,
    ListBox as RACListBox,
    ListBoxItem as RACListBoxItem,
    ListBoxSection as RACListBoxSection,
    Separator,
    Text
} from 'react-aria-components'
import { cn } from '@/lib/utils'

const ListBox = <T extends object>({ className, ...props }: ListBoxProps<T>) => (
    <RACListBox
        {...props}
        className={composeRenderProps(className, (className) =>
            cn(
                'flex w-full flex-col gap-y-0.5 overflow-y-auto rounded-lg border p-1 outline-hidden **:data-drop-target:h-2 **:data-drop-target:rounded-lg **:data-drop-target:bg-primary/50',
                className
            )
        )}
        renderEmptyState={() => <div className='w-full p-4 text-center text-muted-foreground'>No results found</div>}
    />
)

const ListBoxItem = ({ children, className, ...props }: ListBoxItemProps) => {
    const textValue = typeof children === 'string' ? children : undefined

    return (
        <RACListBoxItem
            className={composeRenderProps(className, (className) =>
                cn(
                    "relative flex w-full cursor-default select-none items-center gap-2 rounded-sm px-2 py-1.5 text-sm outline-hidden data-disabled:pointer-events-none data-disabled:opacity-50 [&_svg:not([class*='size-'])]:size-4 [&_svg:not([class*='text-'])]:text-muted-foreground [&_svg]:pointer-events-none [&_svg]:shrink-0 *:[span]:last:flex *:[span]:last:items-center *:[span]:last:gap-2",
                    'focus:bg-accent focus:text-accent-foreground',
                    'data-selected:bg-primary data-selected:text-primary-foreground',
                    'data-dragging:cursor-grabbing data-dragging:outline data-dragging:outline-primary',
                    className
                )
            )}
            data-slot='select-item'
            textValue={textValue}
            {...props}
        >
            {(values) => (typeof children === 'function' ? children(values) : children)}
        </RACListBoxItem>
    )
}

const ListBoxSection = <T extends object>({ title, ...props }: ListBoxSectionProps<T> & { title?: string }) => (
    <RACListBoxSection className={cn('flex flex-col text-sm', props.className)} data-slot='list-box-section' {...props}>
        {title && (
            <Header className='pointer-events-none px-2 py-1 font-medium text-muted-foreground text-xs'>{title}</Header>
        )}
        <Collection items={props.items}>{props.children}</Collection>
    </RACListBoxSection>
)

interface ListBoxDetailsProps extends TextProps {
    description?: TextProps['children']
}

const ListBoxDetails = ({ title, description, ...props }: ListBoxDetailsProps) => {
    const { children, ...restProps } = props

    return (
        <div className='col-start-2 flex flex-col gap-y-1' data-slot='item-details' {...restProps}>
            {title && (
                <Text className='font-medium sm:text-sm' slot='label'>
                    {title}
                </Text>
            )}
            {description && (
                <Text className='text-muted-foreground text-xs' slot='description' {...restProps}>
                    {description}
                </Text>
            )}
            {!title && children}
        </div>
    )
}

const ListBoxSeparator = ({ className, ...props }: SeparatorProps) => (
    <Separator
        className={cn('col-span-full -mx-1 my-1 h-px bg-muted', className)}
        orientation='horizontal'
        {...props}
    />
)

ListBox.Section = ListBoxSection
ListBox.Details = ListBoxDetails
ListBox.Item = ListBoxItem
ListBox.Separator = ListBoxSeparator

export { ListBox, ListBoxDetails, ListBoxItem, ListBoxSection, ListBoxSeparator }

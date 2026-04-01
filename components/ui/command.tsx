'use client'

import type { ComponentProps } from 'react'
import { Collection } from '@react-aria/collections'
import { IconCheck, IconCircleFilled, IconLoader2, IconSearch } from '@tabler/icons-react'
import {
    type AutocompleteProps,
    Header,
    Input,
    Menu,
    MenuItem,
    type MenuItemProps,
    type MenuProps,
    MenuSection,
    type MenuSectionProps,
    SearchField,
    type SearchFieldProps,
    Separator,
    type SeparatorProps
} from 'react-aria-components'
import { cn } from '@/lib/utils'
import { Autocomplete } from './autocomplete'
import { Dialog, DialogDescription, DialogTitle } from './dialog'

const Command = ({
    className,
    isPending,
    ...props
}: AutocompleteProps & {
    className?: string
    isPending?: boolean
}) => (
    <Autocomplete data-slot='command' {...props}>
        <div
            className={cn(
                'group/command flex size-full flex-col overflow-hidden rounded-md bg-popover text-popover-foreground',
                className
            )}
            data-pending={isPending}
            data-slot='command'
        >
            {props.children}
        </div>
    </Autocomplete>
)

const CommandDialog = ({
    title = 'Command Palette',
    description = 'Search for a command to run...',
    children,
    className,
    showCloseButton = true,
    ...props
}: ComponentProps<typeof Dialog> & {
    title?: string
    description?: string
    className?: string
    showCloseButton?: boolean
}) => (
    <Dialog {...props}>
        <Dialog.Trigger className='sr-only' />
        <Dialog.Header className='sr-only'>
            <DialogTitle>{title}</DialogTitle>
            <DialogDescription>{description}</DialogDescription>
        </Dialog.Header>
        <Dialog.Content
            className={cn(
                'overflow-hidden p-0 *:space-y-0 **:data-[slot=command-input-wrapper]:h-12 [&_[data-slot=command-input-wrapper]_svg]:h-5 [&_[data-slot=command-input-wrapper]_svg]:w-5',
                className
            )}
            closeButton={showCloseButton}
        >
            <Command>{children}</Command>
        </Dialog.Content>
    </Dialog>
)

const CommandInput = ({
    className,
    placeholder = 'Type a command or search...',
    ...props
}: SearchFieldProps & { placeholder?: string }) => (
    <SearchField
        autoFocus
        {...props}
        aria-label='Filter'
        className={cn('flex h-10 items-center gap-2 border-b px-3', className)}
        data-slot='command-input-wrapper'
    >
        <IconSearch className='size-4 shrink-0 opacity-50 group-data-[pending=true]/command:hidden' />
        <IconLoader2 className='hidden size-4 shrink-0 animate-spin opacity-50 group-data-[pending=true]/command:block' />
        <Input
            className='flex w-full rounded-md bg-transparent py-3 text-sm outline-hidden placeholder:text-muted-foreground disabled:cursor-not-allowed disabled:opacity-50 [&::-webkit-search-cancel-button]:hidden'
            data-slot='command-input'
            placeholder={placeholder}
        />
    </SearchField>
)

const CommandList = <T extends object>({ className, ...props }: MenuProps<T>) => (
    <Menu
        className={cn(
            'max-h-75 scroll-py-1 overflow-y-auto overflow-x-hidden px-1 py-1 has-data-[slot=title]:py-0',
            '[&::-webkit-scrollbar-thumb]:cursor-pointer [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:bg-foreground/50 [&::-webkit-scrollbar-track]:rounded-full [&::-webkit-scrollbar-track]:bg-transparent [&::-webkit-scrollbar]:w-1',
            className
        )}
        data-slot='command-list'
        {...props}
    />
)

const CommandEmpty = ({ ...props }: ComponentProps<'div'>) => (
    <div className='py-6 text-center text-sm' data-slot='command-empty' {...props} />
)

const CommandGroup = <T extends object>({ className, title, ...props }: MenuSectionProps<T> & { title?: string }) => (
    <MenuSection className={cn('mt-2 flex flex-col text-sm', className)} data-slot='command-group'>
        {title && (
            <Header className='pointer-events-none p-1.5 font-medium text-muted-foreground text-xs' data-slot='title'>
                {title}
            </Header>
        )}
        <Collection items={props.items}>{props.children}</Collection>
    </MenuSection>
)

const CommandSeparator = ({ className, ...props }: SeparatorProps) => (
    <Separator className={cn('-mx-1 my-1 h-px bg-border', className)} data-slot='command-separator' {...props} />
)

const CommandItem = ({ className, ...props }: MenuItemProps) => (
    <MenuItem
        className={cn(
            'group relative flex items-center gap-2 outline-hidden',
            'select-none rounded-md px-2 py-1.5 text-base sm:text-sm/6',
            '[&_svg:not([class*="size-"])]:size-4 [&_svg]:pointer-events-none [&_svg]:mr-2 [&_svg]:shrink-0 has-data-[slot=item-details]:**:[svg]:my-1',
            'data-focused:bg-accent data-focused:text-accent-foreground data-focused:*:[.text-muted-foreground]:text-accent-foreground',
            'data-hovered:bg-accent/90 data-hovered:text-accent-foreground data-hovered:*:[.text-muted-foreground]:text-accent-foreground',
            'disabled:pointer-events-none disabled:opacity-50',
            className
        )}
        data-slot='command-item'
        {...props}
    >
        {(values) => (
            <>
                {typeof props.children === 'function' ? props.children(values) : props.children}
                {values.isSelected && (
                    <span
                        className={cn(
                            'group-has-data-[slot=avatar]:absolute group-has-data-[slot=avatar]:right-0',
                            'group-has-data-[slot=icon]:absolute group-has-data-[slot=icon]:right-0'
                        )}
                    >
                        {values.selectionMode === 'single' && (
                            <IconCircleFilled className='mx-1 size-2 text-current' data-slot='check-indicator' />
                        )}
                        {values.selectionMode === 'multiple' && (
                            <IconCheck className='size-4 text-current' data-slot='check-indicator' />
                        )}
                    </span>
                )}
            </>
        )}
    </MenuItem>
)

const CommandShortcut = ({ className, ...props }: ComponentProps<'span'>) => (
    <span
        className={cn('ml-auto text-muted-foreground text-xs tracking-widest', className)}
        data-slot='command-shortcut'
        {...props}
    />
)

Command.Dialog = CommandDialog
Command.Input = CommandInput
Command.List = CommandList
Command.Empty = CommandEmpty
Command.Group = CommandGroup
Command.Item = CommandItem
Command.Shortcut = CommandShortcut
Command.Separator = CommandSeparator

export {
    Command,
    CommandDialog,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
    CommandSeparator,
    CommandShortcut
}

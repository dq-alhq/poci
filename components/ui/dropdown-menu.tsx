'use client'

import type { ComponentProps } from 'react'
import { Collection } from '@react-aria/collections'
import { IconCheck, IconChevronRight, IconCircleFilled } from '@tabler/icons-react'
import {
    Button,
    type ButtonProps,
    composeRenderProps,
    Header,
    Menu,
    MenuItem,
    type MenuItemProps,
    type MenuProps,
    MenuSection,
    type MenuSectionProps,
    MenuTrigger,
    type MenuTriggerProps,
    Popover,
    type PopoverProps,
    Separator,
    type SeparatorProps,
    SubmenuTrigger,
    type SubmenuTriggerProps
} from 'react-aria-components'
import { cn } from '@/lib/utils'

const DropdownMenu = (props: MenuTriggerProps) => <MenuTrigger data-slot='dropdown-menu' {...props} />

const DropdownMenuTrigger = (props: ButtonProps) => <Button data-slot='dropdown-menu-trigger' {...props} />

const DropdownMenuContent = <T extends object>({
    className,
    placement = 'bottom',
    ...props
}: MenuProps<T> &
    Pick<PopoverProps, 'offset' | 'crossOffset' | 'placement' | 'isOpen' | 'onOpenChange' | 'triggerRef'>) => (
    <Popover
        className={cn(
            'data-exiting:fade-out-0 data-entering:fade-in-0 data-exiting:zoom-out-95 data-entering:zoom-in-95 data-[placement=bottom]:slide-in-from-top-2 data-[placement=left]:slide-in-from-right-2 data-[placement=right]:slide-in-from-left-2 data-[placement=top]:slide-in-from-bottom-2 z-50 min-w-32 overflow-y-auto overflow-x-hidden rounded-md border bg-popover text-popover-foreground shadow-md outline-hidden data-entering:animate-in data-exiting:animate-out',
            className
        )}
        crossOffset={props.crossOffset}
        isOpen={props.isOpen}
        offset={props.offset}
        onOpenChange={props.onOpenChange}
        placement={placement}
        triggerRef={props.triggerRef}
    >
        <Menu
            className='flex max-h-[calc(var(--visual-viewport-height)-10rem)] flex-col overflow-auto rounded-lg p-1 outline-hidden sm:max-h-[inherit] sm:min-w-40'
            data-slot='dropdown-menu-content'
            {...props}
        />
    </Popover>
)

const DropdownMenuGroup = <T extends object>({ title, ...props }: MenuSectionProps<T> & { title?: string }) => (
    <MenuSection className={cn('flex flex-col text-sm', props.className)} data-slot='command-group' {...props}>
        {title && (
            <Header className='pointer-events-none px-2 py-1 font-medium text-muted-foreground text-xs'>{title}</Header>
        )}
        <Collection items={props.items}>{props.children}</Collection>
    </MenuSection>
)

const DropdownMenuItem = ({
    className,
    inset,
    variant = 'default',
    ...props
}: MenuItemProps & {
    inset?: boolean
    variant?: 'default' | 'destructive'
}) => (
    <MenuItem
        className={composeRenderProps(className, (className) =>
            cn(
                "relative flex cursor-default select-none items-center gap-2 rounded-sm px-2 py-1.5 text-sm outline-hidden data-[variant=destructive]:data-focused:bg-destructive/10 data-[variant=destructive]:data-focused:text-destructive data-disabled:pointer-events-none data-focused:bg-accent data-open:bg-accent data-inset:pl-8 data-[variant=destructive]:text-destructive data-focused:text-accent-foreground data-open:text-accent-foreground data-disabled:opacity-50 dark:data-[variant=destructive]:data-focused:bg-destructive/20 [&_svg:not([class*='size-'])]:size-4 [&_svg:not([class*='text-'])]:text-muted-foreground [&_svg]:pointer-events-none [&_svg]:shrink-0 data-[variant=destructive]:*:[svg]:text-destructive!",
                className
            )
        )}
        data-inset={inset}
        data-slot='dropdown-menu-item'
        data-variant={variant}
        {...props}
    >
        {(values) => (
            <>
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

                {typeof props.children === 'function' ? props.children(values) : props.children}

                {values.hasSubmenu && <IconChevronRight className='absolute right-2 size-3.5' data-slot='chevron' />}
            </>
        )}
    </MenuItem>
)

const DropdownMenuLabel = ({
    className,
    inset,
    ...props
}: ComponentProps<typeof Header> & {
    inset?: boolean
}) => {
    return (
        <Header
            className={cn('px-2 py-1.5 font-medium text-sm data-inset:pl-8', className)}
            data-inset={inset}
            data-slot='dropdown-menu-label'
            {...props}
        />
    )
}

const DropdownMenuSeparator = ({ className, ...props }: SeparatorProps) => (
    <Separator className={cn('-mx-1 my-1 h-px bg-border', className)} data-slot='dropdown-menu-separator' {...props} />
)

function DropdownMenuShortcut({ className, ...props }: ComponentProps<'span'>) {
    return (
        <span
            className={cn('ml-auto text-muted-foreground text-xs tracking-widest', className)}
            data-slot='dropdown-menu-shortcut'
            {...props}
        />
    )
}

const DropdownMenuSub = (props: SubmenuTriggerProps) => <SubmenuTrigger data-slot='dropdown-menu-sub' {...props} />

const DropdownMenuSubTrigger = DropdownMenuItem

const DropdownMenuSubContent = DropdownMenuContent

DropdownMenu.Trigger = DropdownMenuTrigger
DropdownMenu.Content = DropdownMenuContent
DropdownMenu.Group = DropdownMenuGroup
DropdownMenu.Label = DropdownMenuLabel
DropdownMenu.Item = DropdownMenuItem
DropdownMenu.Separator = DropdownMenuSeparator
DropdownMenu.Shortcut = DropdownMenuShortcut
DropdownMenu.Sub = DropdownMenuSub
DropdownMenu.SubTrigger = DropdownMenuSubTrigger
DropdownMenu.SubContent = DropdownMenuSubContent

export {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuShortcut,
    DropdownMenuSub,
    DropdownMenuSubContent,
    DropdownMenuSubTrigger,
    DropdownMenuTrigger
}

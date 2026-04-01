'use client'

import type { VariantProps } from 'tailwind-variants'
import { IconCheck, IconSearch, IconSelector } from '@tabler/icons-react'
import {
    Autocomplete,
    Button,
    type ButtonProps,
    Collection,
    composeRenderProps,
    Group,
    type GroupProps,
    Header,
    Input,
    Label,
    ListBox,
    ListBoxItem,
    type ListBoxItemProps,
    type ListBoxProps,
    ListBoxSection,
    type ListBoxSectionProps,
    Popover,
    type PopoverProps,
    Select as RACSelect,
    SelectValue as RACSelectValue,
    SearchField,
    SelectContext,
    type SelectProps,
    type SelectValueProps,
    Separator,
    type SeparatorProps,
    useSlottedContext
} from 'react-aria-components'
import { cn } from '@/lib/utils'
import { fieldVariants } from './field'

const Select = <T extends object, M extends 'single' | 'multiple' = 'single'>({
    className,
    orientation,
    ...props
}: SelectProps<T, M> & VariantProps<typeof fieldVariants>) => {
    return (
        <RACSelect
            className={composeRenderProps(className, (className) => cn(fieldVariants({ orientation }), className))}
            data-orientation={orientation}
            data-slot='field'
            {...props}
        >
            {(values) => (typeof props.children === 'function' ? props.children(values) : props.children)}
        </RACSelect>
    )
}

const SelectValue = <T extends object>(props: SelectValueProps<T>) => (
    <RACSelectValue data-slot='select-value' {...props} />
)

const SelectTrigger = ({
    className,
    size = 'default',
    children,
    ...props
}: Omit<ButtonProps, 'style'> & {
    size?: 'sm' | 'default'
    children: Pick<ButtonProps, 'children'> | Pick<GroupProps, 'children'>
}) => {
    const context = useSlottedContext(SelectContext)!
    if (!context) return null

    return context.selectionMode === 'multiple' ? (
        <Group
            className={cn(
                "relative flex w-full items-center justify-between gap-2 overflow-hidden whitespace-nowrap rounded-md border border-input bg-transparent py-1 pr-9 pl-3 text-sm shadow-xs outline-none transition-[color,box-shadow,border] focus-within:border-ring focus-within:ring-[3px] focus-within:ring-ring/50 hover:border-ring disabled:cursor-not-allowed disabled:opacity-50 group-hover/field:border-ring has-aria-expanded:border-ring has-data-[slot=tag]:pl-1 has-aria-expanded:ring-[3px] has-aria-expanded:ring-ring/50 data-[size=default]:min-h-9 data-[size=sm]:min-h-8 *:data-[slot=select-value]:line-clamp-1 *:data-[slot=select-value]:flex *:data-[slot=select-value]:items-center *:data-[slot=select-value]:gap-2 *:data-placeholder:text-muted-foreground group-data-invalid/field:border-destructive group-data-invalid/field:ring-destructive/20 dark:bg-input/30 dark:group-data-invalid/field:ring-destructive/40 dark:hover:bg-input/50 [&_svg:not([class*='size-'])]:size-4 [&_svg:not([class*='text-'])]:text-muted-foreground [&_svg]:pointer-events-none [&_svg]:shrink-0",
                className
            )}
            data-size={size}
            data-slot='select-trigger'
            onClick={(e) => {
                const triggerButton: HTMLButtonElement | null | undefined =
                    e.currentTarget.parentElement?.querySelector('button[data-slot="select-trigger-button"]')
                if (triggerButton) triggerButton.click()
            }}
        >
            {() => (
                <>
                    {children}
                    <Button
                        data-slot='select-trigger-button'
                        {...props}
                        className='absolute right-0 flex size-full cursor-default items-center justify-end pr-3 outline-hidden'
                    >
                        <div>
                            <IconSelector className='transition group-data-open/field:rotate-180' />
                        </div>
                    </Button>
                </>
            )}
        </Group>
    ) : (
        <Button
            className={cn(
                "flex w-full items-center justify-between gap-2 whitespace-nowrap rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-xs outline-none transition-[color,box-shadow,border] hover:border-ring focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50 disabled:cursor-not-allowed disabled:opacity-50 group-hover/field:border-ring aria-expanded:border-ring aria-expanded:ring-[3px] aria-expanded:ring-ring/50 data-[size=default]:h-9 data-[size=sm]:h-8 *:data-[slot=select-value]:line-clamp-1 *:data-[slot=select-value]:flex *:data-[slot=select-value]:items-center *:data-[slot=select-value]:gap-2 *:data-placeholder:text-muted-foreground group-data-invalid/field:border-destructive group-data-invalid/field:ring-destructive/20 dark:bg-input/30 dark:group-data-invalid/field:ring-destructive/40 dark:hover:bg-input/50 [&_svg:not([class*='size-'])]:size-4 [&_svg:not([class*='text-'])]:text-muted-foreground [&_svg]:pointer-events-none [&_svg]:shrink-0",
                className
            )}
            data-size={size}
            data-slot='select-trigger'
            type='button'
            {...props}
        >
            {(values) => (
                <>
                    {typeof children === 'function' ? children(values) : children}
                    <IconSelector className='size-4 text-muted-foreground transition group-data-open/field:rotate-180' />
                </>
            )}
        </Button>
    )
}

const SelectContent = <T extends object>({
    className,
    offset = 4,
    side = 'bottom',
    isSearchable,
    ...props
}: ListBoxProps<T> & Pick<PopoverProps, 'offset'> & { side?: 'bottom' | 'top'; isSearchable?: boolean }) => {
    const renderContent = () => (
        <ListBox
            className='flex max-h-[calc(var(--visual-viewport-height)-10rem)] flex-col overflow-auto rounded-lg p-1 outline-hidden sm:max-h-[inherit]'
            data-slot='select-content'
            layout='stack'
            orientation='vertical'
            renderEmptyState={() => (
                <div className='w-full p-4 text-center text-muted-foreground'>No results found</div>
            )}
            {...props}
        />
    )
    return (
        <Popover
            className={cn(
                'data-exiting:fade-out-0 data-entering:fade-in-0 data-exiting:zoom-out-95 data-entering:zoom-in-95 data-[placement=bottom]:slide-in-from-top-2 data-[placement=left]:slide-in-from-right-2 data-[placement=right]:slide-in-from-left-2 data-[placement=top]:slide-in-from-bottom-2 z-50 w-auto min-w-(--trigger-width) overflow-hidden rounded-md border bg-popover text-popover-foreground shadow-md outline-hidden data-entering:animate-in data-exiting:animate-out',
                className
            )}
            offset={offset}
            placement={side}
            style={{
                width: 'var(--trigger-width)'
                // width: 'auto'
            }}
            trigger='focus'
        >
            {isSearchable ? (
                <Autocomplete
                    filter={(textValue, inputValue) => {
                        if (inputValue.length === 0) return true
                        if (textValue.length === 0) return false
                        let textIndex = 0
                        let inputIndex = 0
                        while (textIndex < textValue.length && inputIndex < inputValue.length) {
                            if (textValue.toLowerCase()[textIndex] === inputValue.toLowerCase()[inputIndex]) {
                                inputIndex++
                            }
                            textIndex++
                        }
                        return inputIndex === inputValue.length
                    }}
                >
                    <SearchField aria-label='Search' autoFocus className='relative'>
                        <Label>
                            <IconSearch className='absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground' />
                        </Label>
                        <Input
                            className='h-9 w-full appearance-none border-b px-3 py-1 pl-9 text-sm outline-hidden [&::-webkit-search-cancel-button]:hidden'
                            placeholder='Search'
                        />
                    </SearchField>
                    {renderContent()}
                </Autocomplete>
            ) : (
                renderContent()
            )}
        </Popover>
    )
}

const SelectGroup = <T extends object>({ title, ...props }: ListBoxSectionProps<T> & { title?: string }) => (
    <ListBoxSection className={cn('flex flex-col text-sm', props.className)} data-slot='select-group' {...props}>
        {title && (
            <Header className='pointer-events-none px-2 py-1 font-medium text-muted-foreground text-xs'>{title}</Header>
        )}
        <Collection items={props.items}>{props.children}</Collection>
    </ListBoxSection>
)

const SelectItem = ({ className, children, ...props }: ListBoxItemProps) => {
    const textValue = typeof children === 'string' ? children : undefined

    return (
        <ListBoxItem
            className={cn(
                "relative flex w-full cursor-default select-none items-center gap-2 rounded-sm py-1.5 pr-8 pl-2 text-sm outline-hidden data-disabled:pointer-events-none data-focused:bg-accent data-focused:text-accent-foreground data-disabled:opacity-50 [&_svg:not([class*='size-'])]:size-4 [&_svg:not([class*='text-'])]:text-muted-foreground [&_svg]:pointer-events-none [&_svg]:shrink-0 *:[span]:last:flex *:[span]:last:items-center *:[span]:last:gap-2",
                className
            )}
            data-slot='select-item'
            textValue={textValue}
            {...props}
        >
            {(values) => (
                <>
                    {typeof children === 'function' ? children(values) : children}
                    {values.isSelected && (
                        <span className='absolute right-2 flex size-3.5 items-center justify-center'>
                            <IconCheck className='size-4' />
                        </span>
                    )}
                </>
            )}
        </ListBoxItem>
    )
}

const SelectSeparator = ({ className, ...props }: SeparatorProps) => (
    <Separator
        className={cn('pointer-events-none -mx-1 my-1 h-px bg-border', className)}
        data-slot='select-separator'
        {...props}
    />
)

Select.Content = SelectContent
Select.Group = SelectGroup
Select.Item = SelectItem
Select.Separator = SelectSeparator
Select.Trigger = SelectTrigger
Select.Value = SelectValue

export { Select, SelectContent, SelectGroup, SelectItem, SelectSeparator, SelectTrigger, SelectValue }

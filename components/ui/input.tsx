'use client'

import type { ComponentProps } from 'react'
import {
    composeRenderProps,
    Group,
    type GroupProps,
    type InputProps,
    Input as RACInput,
    TextArea,
    type TextAreaProps
} from 'react-aria-components'
import { tv, type VariantProps } from 'tailwind-variants'
import { cn } from '@/lib/utils'
import { Button } from './button'

const Input = ({ className, ...props }: InputProps) => (
    <RACInput
        className={composeRenderProps(className, (className) =>
            cn(
                'h-9 w-full min-w-0 rounded-lg border border-input bg-transparent px-3 py-1 text-base outline-none transition-[color,box-shadow,border] file:inline-flex file:h-7 file:border-0 file:bg-transparent file:font-medium file:text-foreground file:text-sm placeholder:text-muted-foreground md:text-sm',
                'focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 group-hover/field:border-ring data-hovered:border-ring',
                'aria-invalid:border-destructive aria-invalid:ring-3 aria-invalid:ring-destructive/20',
                'dark:bg-input/30 dark:aria-invalid:border-destructive/50 dark:aria-invalid:ring-destructive/40 dark:disabled:bg-input/80',
                'disabled:pointer-events-none disabled:cursor-not-allowed disabled:bg-input/50 disabled:opacity-50',
                className
            )
        )}
        data-slot='input'
        {...props}
    />
)

const Textarea = ({ className, ...props }: TextAreaProps) => (
    <TextArea
        className={composeRenderProps(className, (className) =>
            cn(
                'field-sizing-content flex min-h-16 w-full rounded-lg border border-input bg-transparent px-3 py-2 text-base outline-none transition-[color,box-shadow,border] placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 disabled:cursor-not-allowed disabled:bg-input/50 disabled:opacity-50 group-hover/field:border-ring aria-invalid:border-destructive aria-invalid:ring-3 aria-invalid:ring-destructive/20 data-hovered:border-ring md:text-sm dark:bg-input/30 dark:aria-invalid:border-destructive/50 dark:aria-invalid:ring-destructive/40 dark:disabled:bg-input/80',
                '[&::-webkit-scrollbar-thumb]:cursor-pointer [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:bg-foreground/50 [&::-webkit-scrollbar-track]:rounded-full [&::-webkit-scrollbar-track]:bg-transparent [&::-webkit-scrollbar]:w-1',
                className
            )
        )}
        data-slot='textarea'
        {...props}
    />
)

const InputGroup = ({ className, ...props }: GroupProps) => (
    <Group
        className={composeRenderProps(className, (className) =>
            cn(
                'group/input-group relative flex w-full items-center rounded-md border border-input shadow-xs outline-none transition-[color,box-shadow,border] dark:bg-input/30',
                'h-9 min-w-0 hover:border-ring group-hover/field:border-ring has-[>textarea]:h-auto',

                // Variants based on alignment.
                'has-[>[data-align=inline-start]]:[&>input]:pl-2',
                'has-[>[data-align=inline-end]]:[&>input]:pr-2',
                'has-[>[data-align=block-start]]:h-auto has-[>[data-align=block-start]]:flex-col has-[>[data-align=block-start]]:[&>input]:pb-3',
                'has-[>[data-align=block-end]]:h-auto has-[>[data-align=block-end]]:flex-col has-[>[data-align=block-end]]:[&>input]:pt-3',

                // Focus state.
                'has-[[data-slot=input-group-control]:focus-visible]:border-ring has-[[data-slot=input-group-control]:focus-visible]:ring-[3px] has-[[data-slot=input-group-control]:focus-visible]:ring-ring/50',

                // Error state.
                'has-[[data-slot][aria-invalid=true]]:border-destructive has-[[data-slot][aria-invalid=true]]:ring-destructive/20 dark:has-[[data-slot][aria-invalid=true]]:ring-destructive/40',
                className
            )
        )}
        data-slot='input-group'
        role='group'
        {...props}
    />
)

const inputGroupAddonVariants = tv({
    base: "flex h-auto cursor-text select-none items-center justify-center gap-2 py-1.5 font-medium text-muted-foreground text-sm group-data-[disabled=true]/input-group:opacity-50 [&>kbd]:rounded-[calc(var(--radius)-5px)] [&>svg:not([class*='size-'])]:size-4",
    variants: {
        align: {
            'inline-start': 'order-first pl-3 has-[>button]:ml-[-0.45rem] has-[>kbd]:ml-[-0.35rem]',
            'inline-end': 'order-last pr-3 has-[>button]:mr-[-0.45rem] has-[>kbd]:mr-[-0.35rem]',
            'block-start':
                'order-first w-full justify-start px-3 pt-3 group-has-[>input]/input-group:pt-2.5 [.border-b]:pb-3',
            'block-end':
                'order-last w-full justify-start px-3 pb-3 group-has-[>input]/input-group:pb-2.5 [.border-t]:pt-3'
        }
    },
    defaultVariants: {
        align: 'inline-start'
    }
})

const InputGroupAddon = ({
    className,
    align = 'inline-start',
    ...props
}: ComponentProps<'div'> & VariantProps<typeof inputGroupAddonVariants>) => (
    <div
        className={cn(inputGroupAddonVariants({ align }), className)}
        data-align={align}
        data-slot='input-group-addon'
        onClick={(e) => {
            if ((e.target as HTMLElement).closest('button')) {
                return
            }
            e.currentTarget.parentElement?.querySelector('input')?.focus()
        }}
        onKeyDown={(e) => {
            if ((e.target as HTMLElement).closest('button')) {
                return
            }
            e.currentTarget.parentElement?.querySelector('input')?.focus()
        }}
        role='group'
        {...props}
    />
)

const inputGroupButtonVariants = tv({
    base: 'flex items-center gap-2 text-sm shadow-none',
    variants: {
        size: {
            xs: "h-6 gap-1 rounded-[calc(var(--radius)-3px)] px-1.5 [&>svg:not([class*='size-'])]:size-3.5",
            sm: '',
            'icon-xs': 'size-6 rounded-[calc(var(--radius)-3px)] p-0 has-[>svg]:p-0',
            'icon-sm': 'size-8 p-0 has-[>svg]:p-0'
        }
    },
    defaultVariants: {
        size: 'xs'
    }
})

const InputGroupButton = ({
    className,
    type = 'button',
    variant = 'ghost',
    size = 'icon-xs',
    ...props
}: Omit<ComponentProps<typeof Button>, 'size'> & VariantProps<typeof inputGroupButtonVariants>) => (
    <Button
        className={cn(inputGroupButtonVariants({ size }), className)}
        data-size={size}
        type={type}
        variant={variant}
        {...props}
    />
)

const InputGroupText = ({ className, ...props }: ComponentProps<'span'>) => (
    <span
        className={cn(
            "flex items-center gap-2 text-muted-foreground text-sm [&_svg:not([class*='size-'])]:size-4 [&_svg]:pointer-events-none",
            className
        )}
        {...props}
    />
)

const InputGroupInput = ({ className, ...props }: ComponentProps<typeof Input>) => (
    <Input
        className={cn(
            'flex-1 rounded-none border-0 bg-transparent shadow-none ring-0 focus-visible:ring-0 disabled:bg-transparent aria-invalid:ring-0 dark:bg-transparent dark:disabled:bg-transparent',
            className
        )}
        data-slot='input-group-control'
        {...props}
    />
)

const InputGroupTextarea = ({ className, ...props }: TextAreaProps) => (
    <Textarea
        className={cn(
            'flex-1 resize-none rounded-none border-0 bg-transparent py-2 shadow-none ring-0 focus-visible:ring-0 disabled:bg-transparent aria-invalid:ring-0 dark:bg-transparent dark:disabled:bg-transparent',
            className
        )}
        data-slot='input-group-control'
        {...props}
    />
)

InputGroup.Addon = InputGroupAddon
InputGroup.Button = InputGroupButton
InputGroup.Text = InputGroupText
InputGroup.Input = InputGroupInput
InputGroup.Textarea = InputGroupTextarea

export {
    Input,
    InputGroup,
    InputGroupAddon,
    InputGroupButton,
    InputGroupInput,
    InputGroupText,
    InputGroupTextarea,
    Textarea
}

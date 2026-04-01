'use client'

import type { ComponentProps, ComponentPropsWithRef } from 'react'
import { IconX } from '@tabler/icons-react'
import {
    Button,
    type ButtonProps,
    composeRenderProps,
    type DialogProps,
    type DialogTriggerProps,
    Heading,
    type ModalOverlayProps,
    Dialog as RACDialog,
    DialogTrigger as RACDialogTrigger,
    type HeadingProps as RACHeadingProps,
    Modal as RACModal,
    ModalOverlay as RACModalOverlay,
    Text,
    type TextProps
} from 'react-aria-components'
import { cn } from '@/lib/utils'

const Sheet = (props: DialogTriggerProps) => <RACDialogTrigger {...props} />

const SheetOverlay = ({ className, isDismissable = true, ...props }: ModalOverlayProps) => (
    <RACModalOverlay
        className={composeRenderProps(className, (className) =>
            cn(
                'fixed inset-0 isolate z-50 bg-black/50 duration-200 [--visual-viewport-vertical-padding:32px]',
                'data-entering:fade-in data-entering:animate-in data-entering:ease-out',
                'data-exiting:fade-out data-exiting:animate-out data-exiting:ease-in',
                className
            )
        )}
        data-slot='overlay'
        isDismissable={isDismissable}
        isKeyboardDismissDisabled={!isDismissable}
        {...props}
    />
)

interface DialogContentProps
    extends Omit<ComponentProps<typeof RACModal>, 'children'>,
        Omit<ModalOverlayProps, 'className' | 'children'> {
    'aria-label'?: DialogProps['aria-label']
    'aria-labelledby'?: DialogProps['aria-labelledby']
    role?: DialogProps['role']
    closeButton?: boolean
    side?: 'bottom' | 'top' | 'left' | 'right'
    children?: DialogProps['children']
    className?: DialogProps['className']
    overlayClassName?: ModalOverlayProps['className']
}

const SheetContent = ({
    role = 'dialog',
    side = 'right',
    closeButton = true,
    className,
    overlayClassName,
    children,
    ...props
}: DialogContentProps) => {
    const isDismissable = role !== 'alertdialog'
    return (
        <SheetOverlay className={overlayClassName} isDismissable={isDismissable} {...props}>
            <RACModal
                className={composeRenderProps(className, (className) =>
                    cn(
                        side === 'top' &&
                            'data-entering:slide-in-from-top data-exiting:slide-out-to-top inset-x-0 top-0 rounded-b-lg border-b',
                        side === 'bottom' &&
                            'data-entering:slide-in-from-bottom data-exiting:slide-out-to-bottom inset-x-0 bottom-0 rounded-t-lg border-t',
                        side === 'left' &&
                            'data-entering:slide-in-from-left data-exiting:slide-out-to-left inset-y-0 left-0 h-full w-3/4 rounded-r-lg border-r sm:max-w-sm',
                        side === 'right' &&
                            'data-entering:slide-in-from-right data-exiting:slide-out-to-right inset-y-0 right-0 h-full w-3/4 rounded-l-lg border-l sm:max-w-sm',
                        'fixed z-50 bg-background shadow-lg transition',
                        'data-entering:animate-in data-entering:duration-300 data-entering:ease-out',
                        'data-exiting:animate-out data-exiting:duration-200 data-exiting:ease-in',
                        className
                    )
                )}
                isDismissable={isDismissable}
                {...props}
            >
                <RACDialog
                    aria-label='Dialog'
                    className={cn(
                        'relative flex flex-col overflow-hidden outline-hidden',
                        side === 'top' || side === 'bottom'
                            ? 'max-h-[calc(var(--visual-viewport-height)-var(--visual-viewport-vertical-padding))]'
                            : 'h-full max-h-screen'
                    )}
                    role={role}
                    slot='dialog'
                >
                    {(values) => (
                        <>
                            {typeof children === 'function' ? children(values) : children}
                            {closeButton && isDismissable && <SheetX />}
                        </>
                    )}
                </RACDialog>
            </RACModal>
        </SheetOverlay>
    )
}

const SheetHeader = ({ className, ...props }: ComponentPropsWithRef<'div'>) => {
    return (
        <div
            className={cn('flex flex-col gap-2 p-6 pb-0 text-center sm:text-left', className)}
            slot='header'
            {...props}
        />
    )
}

const SheetTitle = ({ className, ...props }: RACHeadingProps) => (
    <Heading className={cn('font-semibold text-lg leading-none', className)} slot='title' {...props} />
)

const SheetDescription = ({ className, ...props }: TextProps) => (
    <Text className={cn('text-muted-foreground text-sm', className)} slot='description' {...props} />
)

const SheetBody = ({ className, ...props }: ComponentPropsWithRef<'div'>) => (
    <div
        className={cn(
            'isolate flex max-h-[calc(var(--visual-viewport-height)-var(--visual-viewport-vertical-padding))] flex-col overflow-auto px-6 py-4 will-change-scroll',
            '[&::-webkit-scrollbar-thumb]:cursor-pointer [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:bg-foreground/50 [&::-webkit-scrollbar-track]:rounded-full [&::-webkit-scrollbar-track]:bg-transparent [&::-webkit-scrollbar]:w-1',
            className
        )}
        slot='body'
        {...props}
    />
)

const SheetFooter = ({ className, ...props }: ComponentPropsWithRef<'div'>) => {
    return (
        <div
            className={cn('flex flex-col-reverse gap-2 p-6 pt-0 sm:flex-row sm:justify-end', className)}
            slot='footer'
            {...props}
        />
    )
}

const SheetX = (props: ButtonProps) => (
    <Button
        aria-label='Close'
        className='absolute top-2 right-2 inline-flex size-8 shrink-0 cursor-pointer items-center justify-center rounded-md bg-background text-muted-foreground outline-hidden hover:bg-muted/40 focus-visible:ring-4 focus-visible:ring-ring data-pressed:bg-muted/50'
        slot='close'
        {...props}
    >
        <IconX size={16} />
    </Button>
)

const SheetTrigger = (props: ButtonProps) => <Button {...props} />

Sheet.Trigger = SheetTrigger
Sheet.Content = SheetContent
Sheet.Body = SheetBody
Sheet.Footer = SheetFooter
Sheet.Header = SheetHeader
Sheet.Overlay = SheetOverlay
Sheet.Title = SheetTitle
Sheet.Description = SheetDescription
Sheet.X = SheetX

export {
    Sheet,
    SheetBody,
    SheetContent,
    SheetDescription,
    SheetFooter,
    SheetHeader,
    SheetOverlay,
    SheetTitle,
    SheetTrigger,
    SheetX
}

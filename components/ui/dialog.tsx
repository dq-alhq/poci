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

const Dialog = (props: DialogTriggerProps) => <RACDialogTrigger {...props} />

const DialogOverlay = ({ className, isDismissable = true, ...props }: ModalOverlayProps) => (
    <RACModalOverlay
        className={composeRenderProps(className, (className) =>
            cn(
                'fixed inset-0 isolate z-50 bg-black/40 [--visual-viewport-vertical-padding:32px] supports-backdrop-filter:backdrop-blur-xs',
                'data-entering:fade-in-0 data-entering:animate-in',
                'data-exiting:fade-out-0 data-exiting:animate-out data-exiting:duration-150',
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
    extends Omit<ComponentProps<typeof RACModal>, 'children' | 'isDismissable'>,
        Omit<ModalOverlayProps, 'className' | 'children' | 'isDismissable'> {
    'aria-label'?: DialogProps['aria-label']
    'aria-labelledby'?: DialogProps['aria-labelledby']
    role?: DialogProps['role']
    closeButton?: boolean
    children?: DialogProps['children']
    className?: DialogProps['className']
    overlayClassName?: ModalOverlayProps['className']
}

const DialogContent = ({
    role = 'dialog',
    closeButton = true,
    className,
    children,
    overlayClassName,
    ...props
}: DialogContentProps) => {
    const isDismissable = role !== 'alertdialog'
    return (
        <DialogOverlay className={overlayClassName} isDismissable={isDismissable} {...props}>
            <RACModal
                className={composeRenderProps(className, (className) =>
                    cn(
                        'fixed top-1/2 bottom-0 left-[50vw] z-50 h-fit w-full max-w-[calc(100%-2rem)] -translate-x-1/2 -translate-y-1/2 rounded-lg border bg-background shadow-lg transition sm:max-w-lg',
                        'data-entering:fade-in data-entering:zoom-in-95 data-entering:slide-in-from-bottom sm:data-entering:slide-in-from-bottom-0 data-entering:animate-in data-entering:duration-200 data-entering:ease-out',
                        'data-exiting:fade-out data-exiting:zoom-out-95 data-exiting:slide-out-to-bottom sm:data-exiting:slide-out-to-bottom-0 data-exiting:animate-out data-exiting:duration-150 data-exiting:ease-in',
                        className
                    )
                )}
                data-slot='modal'
                isDismissable={isDismissable}
                {...props}
            >
                <RACDialog
                    aria-label='Dialog'
                    className='relative flex max-h-[calc(var(--visual-viewport-height)-var(--visual-viewport-vertical-padding))] flex-col space-y-4 overflow-hidden outline-hidden has-data-[slot=body]:space-y-0'
                    role={role}
                    slot='dialog'
                >
                    {(values) => (
                        <>
                            {typeof children === 'function' ? children(values) : children}
                            {closeButton && isDismissable && <DialogX />}
                        </>
                    )}
                </RACDialog>
            </RACModal>
        </DialogOverlay>
    )
}

const DialogHeader = ({ className, ...props }: ComponentPropsWithRef<'div'>) => {
    return (
        <div
            className={cn('flex flex-col gap-2 p-6 pb-0 text-center sm:text-left', className)}
            data-slot='header'
            {...props}
        />
    )
}

const DialogTitle = ({ className, ...props }: RACHeadingProps) => (
    <Heading className={cn('font-semibold text-lg', className)} data-slot='title' {...props} />
)

const DialogDescription = ({ className, ...props }: TextProps) => (
    <Text className={cn('text-muted-foreground text-sm', className)} data-slot='description' {...props} />
)

const DialogBody = ({ className, ...props }: ComponentPropsWithRef<'div'>) => (
    <div
        className={cn(
            'isolate flex max-h-[calc(var(--visual-viewport-height)-var(--visual-viewport-vertical-padding))] flex-col overflow-auto px-6 py-4 will-change-scroll',
            '[&::-webkit-scrollbar-thumb]:cursor-pointer [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:bg-foreground/50 [&::-webkit-scrollbar-track]:rounded-full [&::-webkit-scrollbar-track]:bg-transparent [&::-webkit-scrollbar]:w-1',
            className
        )}
        data-slot='body'
        {...props}
    />
)

const DialogFooter = ({ className, ...props }: ComponentPropsWithRef<'div'>) => {
    return (
        <div
            className={cn('flex flex-col-reverse gap-2 p-6 pt-0 sm:flex-row sm:justify-end', className)}
            data-slot='footer'
            {...props}
        />
    )
}

const DialogX = (props: ButtonProps) => (
    <Button
        aria-label='Close'
        className='absolute top-2 right-2 inline-flex size-8 shrink-0 cursor-pointer items-center justify-center rounded-md bg-transparent text-muted-foreground outline-hidden hover:bg-muted/40 focus-visible:ring-4 focus-visible:ring-ring data-pressed:bg-muted/50'
        slot='close'
        {...props}
    >
        <IconX size={16} />
    </Button>
)

const DialogTrigger = (props: ButtonProps) => <Button {...props} />

Dialog.Trigger = DialogTrigger
Dialog.Content = DialogContent
Dialog.Body = DialogBody
Dialog.Footer = DialogFooter
Dialog.Header = DialogHeader
Dialog.Overlay = DialogOverlay
Dialog.Title = DialogTitle
Dialog.Description = DialogDescription
Dialog.X = DialogX

export {
    Dialog,
    DialogBody,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogOverlay,
    DialogTitle,
    DialogTrigger,
    DialogX
}

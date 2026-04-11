'use client'

import type {
    ButtonProps,
    DialogProps,
    DialogTriggerProps,
    ModalOverlayProps,
    HeadingProps as RACHeadingProps,
    TextProps
} from 'react-aria-components'
import { AnimatePresence, motion } from 'motion/react'
import { type ComponentPropsWithRef, use } from 'react'
import {
    Button,
    Dialog,
    DialogTrigger,
    Heading,
    ModalOverlay,
    OverlayTriggerStateContext,
    Modal as RACModal,
    Text
} from 'react-aria-components'
import { cn } from '@/lib/utils'

const DrawerRoot = motion.create(RACModal)
const DrawerOverlay = motion.create(ModalOverlay)

const Drawer = (props: DialogTriggerProps) => <DialogTrigger {...props} />

interface DrawerContentProps
    extends Omit<ModalOverlayProps, 'className' | 'children' | 'isDismissable'>,
        Pick<DialogProps, 'aria-label' | 'aria-labelledby' | 'role' | 'children' | 'className'> {
    isBlurred?: boolean
    className?: string
    side?: 'top' | 'bottom' | 'left' | 'right'
    notch?: boolean
}

const DrawerContent = ({
    side = 'bottom',
    isBlurred = true,
    notch = true,
    children,
    className,
    ...props
}: DrawerContentProps) => {
    const state = use(OverlayTriggerStateContext)!

    return (
        <AnimatePresence>
            {(props?.isOpen || state?.isOpen) && (
                <DrawerOverlay
                    animate={{ backgroundColor: 'rgba(0, 0, 0, 0.2)' }}
                    className={cn(
                        'fixed inset-0 z-50 will-change-auto [--visual-viewport-vertical-padding:32px]',
                        isBlurred && 'backdrop-blur-[1px] backdrop-filter'
                    )}
                    exit={{ backgroundColor: 'rgba(0, 0, 0, 0)' }}
                    isDismissable
                    isOpen={props?.isOpen || state?.isOpen}
                    onOpenChange={props?.onOpenChange || state?.setOpen}
                >
                    {({ state }) => (
                        <DrawerRoot
                            animate={{ x: 0, y: 0 }}
                            className={cn(
                                'fixed max-h-full touch-none overflow-hidden bg-background align-middle text-foreground ring ring-input will-change-transform',
                                side === 'top' && 'inset-x-0 top-0 rounded-b-2xl',
                                side === 'right' &&
                                    [
                                        'w-full max-w-xs overflow-y-auto',
                                        '**:[[slot=header]]:text-start',
                                        'inset-y-0 right-0 h-auto'
                                    ].join(' '),
                                side === 'bottom' && 'inset-x-0 bottom-0 rounded-t-2xl',
                                side === 'left' &&
                                    [
                                        'w-full max-w-xs overflow-y-auto',
                                        '**:[[slot=header]]:text-start',
                                        'inset-y-0 left-0 h-auto'
                                    ].join(' '),
                                className
                            )}
                            drag={side === 'left' || side === 'right' ? 'x' : 'y'}
                            dragConstraints={{
                                top: 0,
                                bottom: 0,
                                left: 0,
                                right: 0
                            }}
                            dragElastic={{
                                top: side === 'top' ? 1 : 0,
                                bottom: side === 'bottom' ? 1 : 0,
                                left: side === 'left' ? 1 : 0,
                                right: side === 'right' ? 1 : 0
                            }}
                            dragPropagation
                            dragTransition={{
                                bounceStiffness: 600,
                                bounceDamping: 20
                            }}
                            exit={{
                                x: side === 'left' ? '-100%' : side === 'right' ? '100%' : 0,
                                y: side === 'top' ? '-100%' : side === 'bottom' ? '100%' : 0
                            }}
                            initial={{
                                x: side === 'left' ? '-100%' : side === 'right' ? '100%' : 0,
                                y: side === 'top' ? '-100%' : side === 'bottom' ? '100%' : 0
                            }}
                            onDragEnd={(_, { offset, velocity }) => {
                                if (side === 'bottom' && (velocity.y > 150 || offset.y > screen.height * 0.25)) {
                                    state.close()
                                }
                                if (side === 'top' && (velocity.y < -150 || offset.y < screen.height * 0.25)) {
                                    state.close()
                                }
                                if (side === 'left' && velocity.x < -150) {
                                    state.close()
                                }
                                if (side === 'right' && velocity.x > 150) {
                                    state.close()
                                }
                            }}
                            transition={{ duration: 0.15, ease: 'easeInOut' }}
                            whileDrag={{ cursor: 'grabbing' }}
                        >
                            <Dialog
                                aria-label='Drawer'
                                className={cn(
                                    'relative flex flex-col overflow-hidden outline-hidden will-change-auto',
                                    side === 'top' || side === 'bottom'
                                        ? 'mx-auto max-h-[calc(var(--visual-viewport-height)-var(--visual-viewport-vertical-padding))] min-h-[calc(var(--visual-viewport-height)-var(--visual-viewport-vertical-padding))] max-w-lg'
                                        : 'h-full max-h-screen'
                                )}
                                role='dialog'
                            >
                                {notch && side === 'bottom' && (
                                    <div className='notch sticky top-0 mx-auto mt-2.5 h-1.5 w-10 shrink-0 touch-pan-y rounded-full bg-foreground/20' />
                                )}
                                {children as React.ReactNode}
                                {notch && side === 'top' && (
                                    <div className='notch sticky bottom-0 mx-auto mb-2.5 h-1.5 w-10 shrink-0 touch-pan-y rounded-full bg-foreground/20' />
                                )}
                            </Dialog>
                        </DrawerRoot>
                    )}
                </DrawerOverlay>
            )}
        </AnimatePresence>
    )
}

const DrawerHeader = ({ className, ...props }: ComponentPropsWithRef<'div'>) => {
    return (
        <div
            className={cn('flex flex-col gap-2 p-6 pb-0 text-center sm:text-left', className)}
            slot='header'
            {...props}
        />
    )
}

const DrawerTitle = ({ className, ...props }: RACHeadingProps) => (
    <Heading className={cn('font-semibold text-lg leading-none', className)} slot='title' {...props} />
)

const DrawerDescription = ({ className, ...props }: TextProps) => (
    <Text className={cn('text-muted-foreground text-sm', className)} slot='description' {...props} />
)

const DrawerBody = ({ className, ...props }: ComponentPropsWithRef<'div'>) => (
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

const DrawerFooter = ({ className, ...props }: ComponentPropsWithRef<'div'>) => {
    return (
        <div
            className={cn('flex flex-col-reverse gap-2 p-6 pt-0 sm:flex-row sm:justify-end', className)}
            slot='footer'
            {...props}
        />
    )
}

const DrawerTrigger = (props: ButtonProps) => <Button {...props} />

Drawer.Trigger = DrawerTrigger
Drawer.Content = DrawerContent
Drawer.Body = DrawerBody
Drawer.Footer = DrawerFooter
Drawer.Header = DrawerHeader
Drawer.Title = DrawerTitle
Drawer.Description = DrawerDescription

export type { DrawerContentProps }
export { Drawer, DrawerBody, DrawerContent, DrawerDescription, DrawerFooter, DrawerHeader, DrawerTitle, DrawerTrigger }

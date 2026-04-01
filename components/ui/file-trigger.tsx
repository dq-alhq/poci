'use client'

import type { ReactNode, RefObject } from 'react'
import type { VariantProps } from 'tailwind-variants'
import { FileTrigger as RACFileTrigger, type FileTriggerProps as RACFileTriggerProps } from 'react-aria-components'
import { Button, type buttonVariants } from './button'

interface FileTriggerProps extends RACFileTriggerProps, VariantProps<typeof buttonVariants> {
    isDisabled?: boolean
    ref?: RefObject<HTMLInputElement>
}

const FileTrigger = ({
    variant,
    size,
    ref,
    isDisabled,
    isPending,
    children,
    ...props
}: Omit<FileTriggerProps, 'children'> & { children: ReactNode }) => {
    return (
        <RACFileTrigger ref={ref} {...props}>
            <Button isDisabled={isDisabled} isPending={isPending} size={size} variant={variant}>
                {children}
            </Button>
        </RACFileTrigger>
    )
}

export type { FileTriggerProps }
export { FileTrigger }

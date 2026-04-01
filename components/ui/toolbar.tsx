'use client'

import type { ToolbarProps as RACToolbarProps, SeparatorProps, ToggleButtonGroupProps } from 'react-aria-components'
import { createContext, use, useContext } from 'react'
import {
    composeRenderProps,
    Toolbar as RACToolbar,
    ToggleButtonGroup,
    ToggleButtonGroupContext,
    useSlottedContext
} from 'react-aria-components'
import { cn } from '@/lib/utils'
import { Separator } from './separator'
import { Toggle, type ToggleProps } from './toggle'

const ToolbarContext = createContext<ToolbarProps>({
    orientation: 'horizontal',
    isCircle: false
})

interface ToolbarProps extends RACToolbarProps {
    isCircle?: boolean
}

const Toolbar = ({ orientation = 'horizontal', isCircle, className, ...props }: ToolbarProps) => {
    return (
        <ToolbarContext.Provider value={{ orientation, isCircle }}>
            <RACToolbar
                orientation={orientation}
                {...props}
                className={composeRenderProps(className, (className, { orientation }) =>
                    cn(
                        'group inset-ring inset-ring-border inline-flex flex-row gap-1.5 bg-overlay p-1.5 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden',
                        isCircle ? 'rounded-full' : 'rounded-lg',
                        orientation === 'horizontal'
                            ? 'flex-row items-center [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden'
                            : 'flex-col items-start',
                        className
                    )
                )}
            />
        </ToolbarContext.Provider>
    )
}

const ToolbarGroup = ({ className, ...props }: ToggleButtonGroupProps) => {
    return (
        <ToggleButtonGroupContext.Provider value={{ isDisabled: props.isDisabled }}>
            <ToggleButtonGroup
                className='flex gap-1.5 group-data-[orientation=vertical]:flex-col group-data-[orientation=vertical]:items-start group-data-[orientation=horizontal]:items-center'
                {...props}
            />
        </ToggleButtonGroupContext.Provider>
    )
}

const ToolbarItem = ({ size = 'sm', variant = 'outline', ref, className, ...props }: ToggleProps) => {
    const { isCircle } = use(ToolbarContext)
    const groupContext = useSlottedContext(ToggleButtonGroupContext)
    const isDisabled = groupContext?.isDisabled || props.isDisabled
    return (
        <Toggle
            className={composeRenderProps(className, (className) =>
                cn(isCircle ? 'rounded-full' : 'rounded-[calc(var(--radius-lg)-1px)]', className)
            )}
            data-slot='toolbar-item'
            isDisabled={isDisabled}
            ref={ref}
            size={size}
            variant={variant}
            {...props}
        />
    )
}

const ToolbarSeparator = ({ className, ...props }: SeparatorProps) => {
    const { orientation } = useContext(ToolbarContext)
    const reverseOrientation = orientation === 'vertical' ? 'horizontal' : 'vertical'
    return (
        <Separator
            className={cn(reverseOrientation === 'vertical' ? 'mx-0.5 h-8' : 'my-0.5 w-8', className)}
            orientation={reverseOrientation}
            {...props}
        />
    )
}

export type { ToolbarProps }
export { Toolbar, ToolbarGroup, ToolbarItem, ToolbarSeparator }

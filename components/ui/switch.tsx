'use client'

import type { RefObject } from 'react'
import {
    composeRenderProps,
    Label,
    Switch as RACSwitch,
    type SwitchProps as RACSwitchProps
} from 'react-aria-components'
import { cn } from '@/lib/utils'

interface SwitchProps extends RACSwitchProps {
    ref?: RefObject<HTMLLabelElement>
}

const Switch = ({ children, className, ref, ...props }: SwitchProps) => {
    return (
        <RACSwitch
            className={composeRenderProps(className, (className) =>
                cn('group/switch inline-flex touch-none items-center space-x-2 sm:text-sm', className)
            )}
            ref={ref}
            {...props}
        >
            {(values) => (
                <>
                    <div
                        className={cn(
                            'inline-flex h-[1.15rem] w-8 items-center rounded-full border border-transparent shadow-xs transition',
                            'group-data-focus-visible/switch:border-ring group-data-focus-visible/switch:ring-[3px] group-data-focus-visible/switch:ring-ring/50 group-data-focus-visible/switch:ring-offset-2',
                            'bg-input group-hover/switch:border-ring group-data-selected/switch:bg-primary dark:bg-input/80 dark:group-data-selected/switch:bg-primary',
                            'cursor-pointer group-data-disabled/switch:cursor-default group-data-disabled/switch:opacity-50'
                        )}
                        data-slot='switch'
                    >
                        <span
                            className='size-4 translate-x-0 rounded-full border bg-background transition-transform group-data-selected/switch:translate-x-[calc(100%-2px)] group-data-selected/switch:bg-primary-foreground dark:bg-foreground dark:group-data-selected/switch:bg-primary-foreground'
                            data-slot='switch-thumb'
                        />
                    </div>
                    {typeof children === 'function' ? (
                        children(values)
                    ) : typeof children === 'string' ? (
                        <Label
                            className='text-sm transition group-has-invalid/switch:text-destructive'
                            elementType='span'
                        >
                            {children}
                        </Label>
                    ) : (
                        children
                    )}
                </>
            )}
        </RACSwitch>
    )
}

export { Switch }

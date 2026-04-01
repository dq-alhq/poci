'use client'

import type { VariantProps } from 'tailwind-variants'
import { IconCheck, IconMinus } from '@tabler/icons-react'
import {
    type CheckboxGroupProps,
    type CheckboxProps,
    composeRenderProps,
    Label,
    Checkbox as RACCheckbox,
    CheckboxGroup as RACCheckboxGroup
} from 'react-aria-components'
import { cn } from '@/lib/utils'
import { fieldVariants } from './field'

const CheckboxGroup = ({
    className,
    orientation = 'vertical',
    ...props
}: CheckboxGroupProps & VariantProps<typeof fieldVariants>) => {
    return (
        <RACCheckboxGroup
            {...props}
            className={composeRenderProps(className, (className) =>
                cn(fieldVariants({ orientation }), 'w-fit', className)
            )}
            data-orientation={orientation}
            data-slot='field'
        />
    )
}

const Checkbox = ({ className, children, ...props }: CheckboxProps) => {
    return (
        <RACCheckbox
            className={composeRenderProps(className, (className) =>
                cn(
                    'group/checkbox peer flex items-center space-x-3 has-[&_p]:items-start **:[p]:mt-2 **:[p]:text-muted-foreground **:[p]:text-sm',
                    className
                )
            )}
            data-slot='checkbox'
            {...props}
        >
            {(values) => (
                <>
                    <div
                        className={cn(
                            'relative flex size-4 shrink-0 items-center justify-center rounded-[4px] border bg-transparent shadow-xs transition dark:bg-input/30',
                            'border-input group-hover/checkbox:border-ring group-data-invalid/checkbox:border-destructive/70',
                            'group-data-selected/checkbox:group-data-has-invalid/checkbox:border-destructive/70 group-data-selected/checkbox:border-primary group-data-selected/checkbox:bg-primary group-data-selected/checkbox:text-primary-foreground group-data-selected/checkbox:group-has-invalid/checkbox:border-destructive/70 group-data-selected/checkbox:group-has-invalid/checkbox:bg-destructive group-data-selected/checkbox:group-has-invalid/checkbox:text-destructive-foreground dark:group-data-selected/checkbox:bg-primary',
                            'group-data-focus/checkbox:border-primary group-data-focus/checkbox:group-has-invalid/checkbox:border-destructive/70',
                            'group-data-focus-visible/checkbox:border-primary/70 group-data-focus-visible/checkbox:ring-[3px] group-data-focus-visible/checkbox:ring-ring/50 group-data-focus-visible/checkbox:group-has-invalid/checkbox:border-destructive/70 group-data-focus-visible/checkbox:group-has-invalid/checkbox:ring-destructive/20',
                            'group-data-indeterminate/checkbox:border-primary group-data-indeterminate/checkbox:bg-primary group-data-indeterminate/checkbox:text-primary-foreground dark:group-data-indeterminate/checkbox:bg-primary',
                            className
                        )}
                        data-slot='box'
                    >
                        <div
                            className='flex items-center justify-center text-current transition-none'
                            data-slot='checkbox-indicator'
                        >
                            <IconMinus className='hidden size-3.5 group-data-indeterminate/checkbox:block group-data-selected/checkbox:hidden' />
                            <IconCheck className='hidden size-3.5 group-data-selected/checkbox:block group-data-indeterminate/checkbox:hidden' />
                        </div>
                    </div>
                    {typeof children === 'function' ? (
                        children(values)
                    ) : (
                        <Label
                            className='text-sm transition group-data-invalid/checkbox:text-destructive'
                            elementType='span'
                        >
                            {children}
                        </Label>
                    )}
                </>
            )}
        </RACCheckbox>
    )
}

export { Checkbox, CheckboxGroup }

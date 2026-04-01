'use client'

import type { VariantProps } from 'tailwind-variants'
import { IconCircleFilled } from '@tabler/icons-react'
import {
    composeRenderProps,
    Label,
    Radio as RACRadio,
    RadioGroup as RACRadioGroup,
    type RadioGroupProps,
    type RadioProps
} from 'react-aria-components'
import { cn } from '@/lib/utils'
import { fieldVariants } from './field'

const RadioGroup = ({
    className,
    orientation = 'vertical',
    ...props
}: RadioGroupProps & VariantProps<typeof fieldVariants>) => {
    return (
        <RACRadioGroup
            {...props}
            className={composeRenderProps(className, (className) =>
                cn(fieldVariants({ orientation }), 'w-fit', className)
            )}
            data-orientation={orientation}
            data-slot='field'
        />
    )
}

const Radio = ({ className, ...props }: RadioProps) => {
    return (
        <RACRadio
            className={composeRenderProps(className, (className) =>
                cn(
                    'group/radio flex items-center space-x-3 has-[&_p]:items-start **:[p]:mt-2 **:[p]:text-muted-foreground **:[p]:text-sm',
                    className
                )
            )}
            {...props}
        >
            {(values) => (
                <>
                    <div
                        className={cn(
                            'relative flex size-4 shrink-0 items-center justify-center rounded-full border bg-transparent shadow-xs transition dark:bg-input/30',
                            'border-input group-hover/radio:border-ring group-has-invalid/radio:border-destructive/70',
                            'group-data-selected/radio:group-data-has-invalid/radio:border-destructive/70 group-data-selected/radio:border-primary group-data-selected/radio:bg-primary group-data-selected/radio:text-primary-foreground group-data-selected/radio:group-has-invalid/radio:border-destructive/70 group-data-selected/radio:group-has-invalid/radio:bg-destructive group-data-selected/radio:group-has-invalid/radio:text-destructive-foreground dark:group-data-selected/radio:bg-primary',
                            'group-data-focus/radio:border-primary group-data-focus/radio:group-has-invalid/radio:border-destructive/70',
                            'group-data-focus-visible/radio:border-primary/70 group-data-focus-visible/radio:ring-[3px] group-data-focus-visible/radio:ring-ring/50 group-data-focus-visible/radio:group-has-invalid/radio:border-destructive/70 group-data-focus-visible/radio:group-has-invalid/radio:ring-destructive/20',
                            className
                        )}
                        data-slot='box'
                    >
                        {values.isSelected ? <IconCircleFilled className='size-2' /> : null}
                    </div>
                    {typeof props.children === 'function' ? (
                        props.children(values)
                    ) : (
                        <Label
                            className='not-last:text-sm/4 text-sm transition group-has-invalid/radio:text-destructive'
                            elementType='span'
                        >
                            {props.children}
                        </Label>
                    )}
                </>
            )}
        </RACRadio>
    )
}

export { Radio, RadioGroup }

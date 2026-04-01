'use client'

import type { VariantProps } from 'tailwind-variants'
import { IconChevronDown, IconChevronUp } from '@tabler/icons-react'
import {
    Button,
    composeRenderProps,
    type InputProps,
    type NumberFieldProps,
    NumberField as RACNumberField
} from 'react-aria-components'
import { cn } from '@/lib/utils'
import { fieldVariants } from './field'
import { InputGroup, InputGroupInput } from './input'

const NumberField = ({
    className,
    orientation = 'vertical',
    ...props
}: NumberFieldProps & VariantProps<typeof fieldVariants>) => (
    <RACNumberField
        className={composeRenderProps(className, (className) => cn(fieldVariants({ orientation }), className))}
        data-orientation={orientation}
        data-slot='field'
        {...props}
    />
)

const NumberInput = ({ className, ...props }: Omit<InputProps, 'type'>) => (
    <InputGroup className='relative inline-flex h-9 w-full min-w-0 items-center overflow-hidden whitespace-nowrap rounded-md border border-input bg-transparent text-base shadow-xs outline-hidden transition-[color,box-shadow] data-disabled:pointer-events-none data-disabled:cursor-not-allowed data-focus-within:border-ring data-disabled:opacity-50 data-focus-within:ring-[3px] data-focus-within:ring-ring/50 data-focus-within:has-aria-invalid:border-destructive data-focus-within:has-aria-invalid:ring-destructive/20 md:text-sm dark:bg-input/30 dark:data-focus-within:has-aria-invalid:ring-destructive/40'>
        <InputGroupInput
            {...props}
            className='w-full grow px-3 py-2 text-center tabular-nums outline-none selection:bg-primary selection:text-primary-foreground'
        />
        <div className='flex h-[calc(100%+2px)] flex-col'>
            <Button
                className='-me-px flex h-1/2 w-6 flex-1 items-center justify-center border border-input bg-background text-muted-foreground text-sm transition-[color,box-shadow] hover:bg-accent hover:text-foreground disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50'
                slot='increment'
            >
                <IconChevronUp className='size-3' />
                <span className='sr-only'>Increment</span>
            </Button>
            <Button
                className='-me-px -mt-px flex h-1/2 w-6 flex-1 items-center justify-center border border-input bg-background text-muted-foreground text-sm transition-[color,box-shadow] hover:bg-accent hover:text-foreground disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50'
                slot='decrement'
            >
                <IconChevronDown className='size-3' />
                <span className='sr-only'>Decrement</span>
            </Button>
        </div>
    </InputGroup>
)

export { NumberField, NumberInput }

'use client'

import type { VariantProps } from 'tailwind-variants'
import { IconLoader2, IconSearch, IconX } from '@tabler/icons-react'
import {
    composeRenderProps,
    type InputProps,
    SearchField as RACSearchField,
    type SearchFieldProps
} from 'react-aria-components'
import { cn } from '@/lib/utils'
import { fieldVariants } from './field'
import { InputGroup, InputGroupAddon, InputGroupButton, InputGroupInput } from './input'

const SearchField = ({
    className,
    isPending = false,
    orientation = 'vertical',
    ...props
}: SearchFieldProps & VariantProps<typeof fieldVariants> & { isPending?: boolean }) => (
    <RACSearchField
        className={composeRenderProps(className, (className) => cn(fieldVariants({ orientation }), className))}
        data-orientation={orientation}
        data-pending={isPending}
        data-slot='field'
        {...props}
    />
)

const SearchInput = ({ className, ...props }: Omit<InputProps, 'type'>) => (
    <InputGroup>
        <InputGroupAddon>
            <IconLoader2 className='in-data-[pending=true]:block hidden animate-spin' />
            <IconSearch className='in-data-[pending=true]:hidden' />
        </InputGroupAddon>
        <InputGroupInput className='[&::-webkit-search-cancel-button]:hidden' {...props} />
        <InputGroupAddon align='inline-end' className='group-data-empty/field:hidden'>
            <InputGroupButton>
                <IconX />
            </InputGroupButton>
        </InputGroupAddon>
    </InputGroup>
)

export { SearchField, SearchInput }

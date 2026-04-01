'use client'

import type { VariantProps } from 'tailwind-variants'
import { IconEye, IconEyeClosed } from '@tabler/icons-react'
import { useState } from 'react'
import {
    composeRenderProps,
    type InputProps,
    TextField as RACTextField,
    type TextFieldProps
} from 'react-aria-components'
import { cn } from '@/lib/utils'
import { fieldVariants } from './field'
import { InputGroup, InputGroupAddon, InputGroupButton, InputGroupInput } from './input'

const TextField = ({
    className,
    orientation = 'vertical',
    ...props
}: TextFieldProps & VariantProps<typeof fieldVariants>) => (
    <RACTextField
        className={composeRenderProps(className, (className) => cn(fieldVariants({ orientation }), className))}
        data-orientation={orientation}
        data-slot='field'
        {...props}
    />
)

const PasswordInput = ({ className, ...props }: Omit<InputProps, 'type'>) => {
    const [isVisible, setIsVisible] = useState<boolean>(false)
    return (
        <InputGroup>
            <InputGroupInput type={isVisible ? 'text' : 'password'} {...props} />
            <InputGroupAddon align='inline-end'>
                <InputGroupButton excludeFromTabOrder onPress={() => setIsVisible(!isVisible)}>
                    <IconEye
                        className={cn('size-5 transition-transform sm:size-4', isVisible ? 'scale-0' : 'scale-100')}
                    />
                    <IconEyeClosed
                        className={cn(
                            'absolute size-5 transition-transform sm:size-4',
                            isVisible ? 'scale-100' : 'scale-0'
                        )}
                    />
                </InputGroupButton>
            </InputGroupAddon>
        </InputGroup>
    )
}

export { PasswordInput, TextField }

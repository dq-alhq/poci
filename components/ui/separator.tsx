'use client'

import { Separator as RACSeparator, type SeparatorProps } from 'react-aria-components'
import { cn } from '@/lib/utils'

const Separator = ({ className, orientation = 'horizontal', ...props }: SeparatorProps) => (
    <RACSeparator
        className={cn('shrink-0 bg-muted', orientation === 'horizontal' ? 'h-px w-full' : 'h-full w-px', className)}
        data-slot='separator'
        orientation={orientation}
        {...props}
    />
)

export { Separator, type SeparatorProps }

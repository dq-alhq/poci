'use client'

import { type LabelProps, Label as RACLabel } from 'react-aria-components'
import { cn } from '@/lib/utils'

function Label({ className, ...props }: LabelProps) {
    return (
        <RACLabel
            className={cn(
                'flex select-none items-center gap-2 font-medium in-data-invalid:text-destructive text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-50 group-data-[disabled=true]:pointer-events-none group-data-[disabled=true]:opacity-50',
                className
            )}
            data-slot='label'
            {...props}
        />
    )
}

export { Label }

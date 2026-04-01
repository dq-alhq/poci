import { type HTMLAttributes, useId } from 'react'
import { cn } from '@/lib/utils'

interface SkeletonProps extends HTMLAttributes<HTMLDivElement> {
    shape?: 'square' | 'circle'
}

const Skeleton = ({ shape, className, ...props }: SkeletonProps) => {
    const patternId = useId()
    return (
        <div
            className={cn(
                'relative shrink-0 animate-pulse overflow-hidden border',
                shape === 'circle' ? 'rounded-full' : 'rounded-sm',
                className
            )}
            style={{ opacity: 0.9 }}
            {...props}
        >
            <svg className='absolute inset-0 size-full stroke-muted' fill='none'>
                <defs>
                    <pattern height='10' id={patternId} patternUnits='userSpaceOnUse' width='10' x='0' y='0'>
                        <path d='M-3 13 15-5M-5 5l18-18M-1 21 17 3' />
                    </pattern>
                </defs>
                <rect fill={`url(#${patternId})`} height='100%' stroke='none' width='100%' />
            </svg>
        </div>
    )
}

export { Skeleton }

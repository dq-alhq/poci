'use client'

import type { ProgressBarProps, ProgressBarRenderProps } from 'react-aria-components'
import { type ComponentProps, createContext, use } from 'react'
import { composeRenderProps, ProgressBar } from 'react-aria-components'
import { cn } from '@/lib/utils'

const ProgressContext = createContext<ProgressBarRenderProps | null>(null)

const Progress = ({ className, children, ...props }: ProgressBarProps) => (
    <ProgressBar
        className={composeRenderProps(className, (className) =>
            cn(
                'w-full',
                '[&>[data-slot=progress-bar-header]+[data-slot=progress-bar-track]]:mt-2',
                '[&>[data-slot=progress-bar-header]+[data-slot=progress-bar-track]]:mt-2',
                "[&>[data-slot=progress-bar-header]+[slot='description']]:mt-1",
                "[&>[slot='description']+[data-slot=progress-bar-track]]:mt-2",
                '[&>[data-slot=progress-bar-track]+[slot=description]]:mt-2',
                '[&>[data-slot=progress-bar-track]+[slot=errorMessage]]:mt-2',
                '*:data-[slot=progress-bar-header]:font-medium',
                className
            )
        )}
        data-slot='control'
        {...props}
    >
        {(values) => (
            <ProgressContext value={{ ...values }}>
                {typeof children === 'function' ? children(values) : children}
            </ProgressContext>
        )}
    </ProgressBar>
)

const ProgressHeader = ({ className, ...props }: ComponentProps<'div'>) => (
    <div className={cn('flex items-center justify-between', className)} data-slot='progress-bar-header' {...props} />
)

const ProgressValue = ({ className, ...props }: Omit<ComponentProps<'span'>, 'children'>) => {
    const { valueText } = use(ProgressContext)!
    return (
        <span className={cn('text-base/6 sm:text-sm/6', className)} {...props}>
            {valueText}
        </span>
    )
}

const ProgressTrack = ({ className, ref, ...props }: ComponentProps<'div'>) => {
    const { isIndeterminate, percentage } = use(ProgressContext)!
    return (
        <span className='relative block w-full' data-slot='progress-bar-track'>
            <style>{`
        @keyframes progress-slide {
          0% { left: 0% }
          50% { left: 100% }
          100% { left: 0% }
        }
      `}</style>
            <div className='flex w-full items-center gap-x-2' ref={ref} {...props}>
                <div
                    className={cn(
                        'relative h-1.5 w-full min-w-52 overflow-hidden rounded-full bg-secondary outline-1 outline-transparent -outline-offset-1 will-change-transform',
                        className
                    )}
                    data-slot='track'
                >
                    {!isIndeterminate ? (
                        <div
                            className='absolute top-0 left-0 h-full rounded-full bg-primary transition-[width] duration-200 ease-linear will-change-[width] motion-reduce:transition-none'
                            data-slot='bar'
                            style={{ width: `${percentage}%` }}
                        />
                    ) : (
                        <div
                            className='absolute top-0 h-full animate-[progress-slide_2000ms_ease-in-out_infinite] rounded-full bg-primary'
                            data-slot='bar'
                            style={{ width: '40%' }}
                        />
                    )}
                </div>
            </div>
        </span>
    )
}

Progress.Header = ProgressHeader
Progress.Value = ProgressValue
Progress.Track = ProgressTrack

export { Progress, ProgressHeader, ProgressTrack, ProgressValue }

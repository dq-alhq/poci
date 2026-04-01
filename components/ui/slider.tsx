'use client'

import { use } from 'react'
import {
    composeRenderProps,
    Slider as RACSlider,
    SliderOutput as RACSliderOutput,
    SliderThumb as RACSliderThumb,
    SliderTrack as RACSliderTrack,
    type SliderProps,
    SliderStateContext
} from 'react-aria-components'
import { cn } from '@/lib/utils'

export function SliderGroup({ className, ...props }: React.ComponentProps<'div'>) {
    return <div className='flex items-center gap-x-3 *:data-[slot=icon]:size-5' {...props} />
}

export function Slider({ className, ...props }: SliderProps) {
    return (
        <RACSlider
            className={composeRenderProps(className, (className) =>
                cn(
                    'group relative flex touch-none select-none flex-col data-disabled:opacity-50',
                    'data-[orientation=horizontal]:w-full data-[orientation=horizontal]:min-w-fit data-[orientation=horizontal]:gap-y-2',
                    'data-[orientation=vertical]:h-full data-[orientation=vertical]:min-h-fit data-[orientation=vertical]:w-1.5 data-[orientation=vertical]:items-center data-[orientation=vertical]:gap-y-2',
                    className
                )
            )}
            data-slot='control'
            {...props}
        />
    )
}

export function SliderOutput({ className, ...props }: React.ComponentProps<typeof RACSliderOutput>) {
    return (
        <RACSliderOutput
            className={composeRenderProps(className, (className) =>
                cn('font-medium text-base/6 sm:text-sm/6', className)
            )}
            {...props}
        />
    )
}

export function SliderThumb({ className, ...props }: React.ComponentProps<typeof RACSliderThumb>) {
    return (
        <RACSliderThumb
            className={composeRenderProps(className, (className) =>
                cn(
                    'top-[50%] left-[50%] size-5 rounded-full border border-foreground/10 bg-white outline-hidden ring-black transition-[width,height]',
                    className
                )
            )}
            {...props}
        />
    )
}

export function SliderTrack({ className, children, ...props }: React.ComponentProps<typeof RACSliderTrack>) {
    return (
        <RACSliderTrack
            className={composeRenderProps(className, (className) =>
                cn(
                    'bg-(--slider-track-bg,var(--color-secondary))',
                    'group/track relative cursor-default rounded-full',
                    'grow group-data-[orientation=horizontal]:h-1.5 group-data-[orientation=horizontal]:w-full group-data-[orientation=vertical]:w-1.5 group-data-[orientation=vertical]:flex-1',
                    'data-disabled:cursor-default data-disabled:opacity-60',
                    className
                )
            )}
            {...props}
        >
            {(values) => (
                <>
                    {typeof children === 'function'
                        ? children(values)
                        : (children ?? (
                              <>
                                  <SliderFill />
                                  <SliderThumb />
                              </>
                          ))}
                </>
            )}
        </RACSliderTrack>
    )
}

export function SliderFill({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
    const state = use(SliderStateContext)
    const { orientation, getThumbPercent, values } = state || {}

    const getStyle = () => {
        const percent0 = getThumbPercent ? getThumbPercent(0) * 100 : 0
        const percent1 = getThumbPercent ? getThumbPercent(1) * 100 : 0

        if (values?.length === 1) {
            return orientation === 'horizontal' ? { width: `${percent0}%` } : { height: `${percent0}%` }
        }

        return orientation === 'horizontal'
            ? {
                  left: `${percent0}%`,
                  width: `${Math.abs(percent0 - percent1)}%`
              }
            : {
                  bottom: `${percent0}%`,
                  height: `${Math.abs(percent0 - percent1)}%`
              }
    }

    return (
        <div
            {...props}
            className={cn(
                'group-data-[orientation=horizontal]/top-0 pointer-events-none absolute rounded-full bg-primary group-data-[orientation=vertical]/track:bottom-0 group-data-[orientation=horizontal]/track:h-full group-data-[orientation=vertical]/track:w-full group-data-disabled/track:opacity-60',
                className
            )}
            style={getStyle()}
        />
    )
}

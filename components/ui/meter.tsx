'use client'

import { createContext, use } from 'react'
import {
    composeRenderProps,
    Meter as RACMeter,
    type MeterProps as RACMeterProps,
    type MeterRenderProps as RACMeterRenderProps
} from 'react-aria-components'
import { cn } from '@/lib/utils'

interface MeterRenderProps extends RACMeterRenderProps {
    color?: string
}

const MeterContext = createContext<MeterRenderProps | null>(null)

interface MeterProps extends RACMeterProps, Pick<MeterRenderProps, 'color'> {}

const Meter = ({ className, children, color, ...props }: MeterProps) => (
    <RACMeter
        data-slot='meter'
        {...props}
        className={composeRenderProps(className, (className) =>
            cn(
                'w-full',
                '[&>[data-slot=meter-header]+[data-slot=track]]:mt-2',
                '[&>[data-slot=meter-header]+[data-slot=track]]:mt-2',
                "[&>[data-slot=meter-header]+[slot='description']]:mt-1",
                "[&>[slot='description']+[data-slot=track]]:mt-2",
                '[&>[data-slot=track]+[slot=description]]:mt-2',
                '[&>[data-slot=track]+[slot=errorMessage]]:mt-2',
                '*:data-[slot=meter-header]:font-medium',
                className
            )
        )}
    >
        {(values) => (
            <MeterContext value={{ ...values, color }}>
                {typeof children === 'function' ? children(values) : children}
            </MeterContext>
        )}
    </RACMeter>
)

const MeterTrack = ({ className, ...props }: React.ComponentProps<'div'>) => {
    const { percentage, color } = use(MeterContext)!
    return (
        <div
            className={cn(
                '[--meter-height:--spacing(1.5)]',
                'relative h-(--meter-height) w-full overflow-hidden rounded-full bg-secondary outline outline-transparent -outline-offset-1',
                className
            )}
            data-slot='track'
            {...props}
        >
            <div
                className='absolute top-0 left-0 h-full rounded-full transition-[width] duration-200 ease-linear will-change-[width] motion-reduce:transition-none'
                data-slot='bar'
                style={{ width: `${percentage}%`, backgroundColor: color ?? getMeterColor(percentage) }}
            />
        </div>
    )
}

const MeterValue = ({ className, ...props }: Omit<React.ComponentProps<'span'>, 'children'>) => {
    const { valueText } = use(MeterContext)!
    return (
        <span className={cn('text-base/6 sm:text-sm/6', className)} data-slot='meter-value' {...props}>
            {valueText}
        </span>
    )
}

const MeterHeader = ({ className, ...props }: React.ComponentProps<'div'>) => (
    <div className={cn('flex items-center justify-between', className)} data-slot='meter-header' {...props} />
)

function getMeterColor(value: number): string {
    if (value < 50) return '#00ff00'
    if (value < 80) return '#ffff00'
    return '#ff0000'
}

Meter.Header = MeterHeader
Meter.Track = MeterTrack
Meter.Value = MeterValue

export { Meter, MeterHeader, MeterTrack, MeterValue }

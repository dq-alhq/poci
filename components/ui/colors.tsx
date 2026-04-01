'use client'

import type { VariantProps } from 'tailwind-variants'
import {
    type ColorAreaProps,
    type ColorFieldProps,
    type ColorSliderProps,
    type ColorSwatchPickerItemProps,
    type ColorSwatchPickerProps,
    type ColorSwatchProps,
    type ColorThumbProps,
    type ColorWheelProps,
    ColorWheelTrack,
    composeRenderProps,
    ColorArea as RACColorArea,
    ColorField as RACColorField,
    ColorPicker as RACColorPicker,
    ColorSlider as RACColorSlider,
    ColorSwatch as RACColorSwatch,
    ColorSwatchPicker as RACColorSwatchPicker,
    ColorSwatchPickerItem as RACColorSwatchPickerItem,
    ColorThumb as RACColorThumb,
    ColorWheel as RACColorWheel,
    SliderOutput as RACSliderOutput,
    SliderTrack as RACSliderTrack,
    type SliderOutputProps,
    type SliderTrackProps
} from 'react-aria-components'
import { cn } from '@/lib/utils'
import { fieldVariants } from './field'

const ColorPicker = RACColorPicker

const ColorField = ({
    className,
    orientation = 'vertical',
    ...props
}: ColorFieldProps & VariantProps<typeof fieldVariants>) => (
    <RACColorField
        {...props}
        aria-label={props['aria-label'] ?? 'Color field'}
        className={composeRenderProps(className, (className) => cn(fieldVariants({ orientation }), className))}
        data-orientation={orientation}
        data-slot='field'
    />
)

const ColorWheel = ({
    className,
    outerRadius = 100,
    innerRadius = 74,
    ...props
}: Omit<ColorWheelProps, 'innerRadius' | 'outerRadius'> & { innerRadius?: number; outerRadius?: number }) => (
    <RACColorWheel
        className={composeRenderProps(className, (className) => cn('relative', className))}
        innerRadius={innerRadius}
        outerRadius={outerRadius}
        {...props}
    >
        <ColorWheelTrack className='data-disabled:opacity-50 data-disabled:grayscale-50' />
        <ColorThumb />
    </RACColorWheel>
)

const ColorArea = ({ className, ...props }: ColorAreaProps) => (
    <RACColorArea
        className={composeRenderProps(className, (className) =>
            cn('size-48 shrink-0 rounded-md shadow-md data-disabled:opacity-50 data-disabled:grayscale-50', className)
        )}
        {...props}
    >
        <ColorThumb />
    </RACColorArea>
)

const ColorSlider = ({ className, ...props }: ColorSliderProps) => (
    <RACColorSlider
        className={composeRenderProps(className, (className) =>
            cn(
                'grid-cols-[1fr_auto] flex-col items-center gap-2 data-[orientation=vertical]:flex data-[orientation=horizontal]:grid data-[orientation=horizontal]:w-full',
                className
            )
        )}
        data-slot='color-slider'
        {...props}
    />
)

const ColorSliderTrack = ({ className, ...props }: SliderTrackProps) => (
    <RACSliderTrack
        className={composeRenderProps(className, (className) =>
            cn(
                'group col-span-2 in-data-[orientation=horizontal]:h-6 in-data-[orientation=horizontal]:w-full rounded-md border border-border shadow-md',
                'in-data-[orientation=vertical]:ml-[50%] in-data-[orientation=vertical]:h-56 in-data-[orientation=vertical]:w-6 in-data-[orientation=vertical]:-translate-x-[50%]',
                'data-disabled:opacity-50 data-disabled:grayscale-50',
                'bg-muted-foreground disabled:opacity-50',
                className
            )
        )}
        data-slot='color-slider-track'
        {...props}
    />
)

const ColorSliderOutput = ({ className, ...props }: SliderOutputProps) => (
    <RACSliderOutput
        className={composeRenderProps(className, (className) =>
            cn('in-data-[orientation=vertical]:hidden font-medium text-base/6 sm:text-sm/6', className)
        )}
        {...props}
    />
)

const ColorThumb = ({ className, ...props }: ColorThumbProps) => (
    <RACColorThumb
        className={composeRenderProps(className, (className) =>
            cn(
                'top-[50%] left-[50%] size-5 rounded-full border-2 border-white [box-shadow:0_0_0_1px_black,inset_0_0_0_1px_black]',
                'data-dragging:size-6 data-focus-visible:size-6 data-dragging:bg-muted-foreground data-disabled:opacity-50',
                className
            )
        )}
        {...props}
    />
)

const ColorSwatchPicker = ({ className, ...props }: ColorSwatchPickerProps) => (
    <RACColorSwatchPicker
        className={composeRenderProps(className, (className) => cn('flex flex-wrap gap-2', className))}
        {...props}
    />
)

const ColorSwatchPickerItem = ({ className, children, ...props }: ColorSwatchPickerItemProps) => (
    <RACColorSwatchPickerItem
        className={composeRenderProps(className, (className) =>
            cn(
                'relative rounded-md outline-hidden',
                'data-selected:ring-3 data-selected:ring-ring/20 data-selected:*:inset-ring-current/40',
                'data-focus-visible:opacity-80 data-focus-visible:ring-ring/20 data-focus-visible:*:inset-ring-current/40',
                'data-hovered:opacity-90',
                'data-disabled:opacity-50 data-disabled:grayscale-50',
                className
            )
        )}
        {...props}
    >
        {(values) => (
            <>
                {values.isSelected && (
                    <span className='absolute top-0 left-0 box-border size-full rounded-md border-2 border-black outline-2 outline-white -outline-offset-4 dark:border-white dark:outline-black' />
                )}
                {typeof children === 'function' ? children(values) : children}
            </>
        )}
    </RACColorSwatchPickerItem>
)

const ColorSwatch = ({ className, ...props }: ColorSwatchProps) => (
    <RACColorSwatch
        className={composeRenderProps(className, (className) =>
            cn('inset-ring-1 inset-ring-current/20 size-6 shrink-0 rounded-md', className)
        )}
        data-slot='color-swatch'
        {...props}
    />
)

export {
    ColorArea,
    ColorField,
    ColorPicker,
    ColorSlider,
    ColorSliderOutput,
    ColorSliderTrack,
    ColorSwatch,
    ColorSwatchPicker,
    ColorSwatchPickerItem,
    ColorThumb,
    ColorWheel,
    type ColorWheelTrack
}

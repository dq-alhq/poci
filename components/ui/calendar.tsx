'use client'

import { type CalendarDate, getLocalTimeZone, today } from '@internationalized/date'
import { useDateFormatter } from '@react-aria/i18n'
import { IconChevronDown, IconChevronLeft, IconChevronRight } from '@tabler/icons-react'
import { type ComponentPropsWithRef, use } from 'react'
import {
    CalendarCell,
    CalendarGrid,
    CalendarGridBody,
    CalendarHeaderCell,
    type CalendarProps,
    CalendarStateContext,
    composeRenderProps,
    type DateValue,
    Heading,
    Calendar as RACCalendar,
    CalendarGridHeader as RACCalendarGridHeader,
    RangeCalendar as RACRangeCalendar,
    type RangeCalendarProps,
    RangeCalendarStateContext
} from 'react-aria-components'
import { cn } from '@/lib/utils'
import { Button } from './button'

const Calendar = <T extends DateValue>(props: CalendarProps<T>) => {
    const now = today(getLocalTimeZone())
    const renderCalendarDate = (
        <>
            <CalendarGridHeader />
            <CalendarGridBody>
                {(date) => (
                    <CalendarCell
                        className={cn([
                            'relative flex size-(--cell-size) shrink-0 cursor-pointer items-center justify-center rounded-lg p-1 outside-month:text-muted-foreground text-sm outline-hidden hover:bg-accent/90 hover:text-accent-foreground data-pressed:bg-accent data-pressed:text-accent-foreground',
                            'data-selected:data-invalid:bg-destructive data-selected:data-invalid:text-destructive-foreground data-selected:bg-primary data-selected:text-primary-foreground',
                            'focus-visible:ring-2 focus-visible:ring-ring/50',
                            'aria-disabled:pointer-events-none aria-disabled:opacity-50 data-outside-month:pointer-events-none data-outside-month:opacity-50',
                            date.compare(now) === 0 &&
                                'after:pointer-events-none after:absolute after:start-1/2 after:bottom-1 after:z-10 after:size-1 after:-translate-x-1/2 after:rounded-full after:bg-primary data-selected:after:bg-primary-foreground'
                        ])}
                        date={date}
                    />
                )}
            </CalendarGridBody>
        </>
    )

    return (
        <RACCalendar
            pageBehavior='single'
            {...props}
            className={composeRenderProps(props.className, (className) =>
                cn(
                    'group/calendar grid w-fit bg-background in-data-[slot=card-content]:bg-transparent in-data-[slot=popover-content]:bg-transparent p-3 [--cell-size:--spacing(8)]',
                    className
                )
            )}
        >
            <CalendarHeader isRange={Number(props?.visibleDuration?.months) > 1} />
            {Number(props?.visibleDuration?.months) > 1 ? (
                <div className='grid gap-2 overflow-auto md:flex'>
                    {Array.from({ length: props.visibleDuration?.months ?? 1 }).map((_, index) => {
                        const id = index + 1
                        return (
                            <CalendarGrid
                                className='**:[[role=gridcell]]:p-0.75'
                                key={index}
                                offset={id >= 2 ? { months: id - 1 } : undefined}
                            >
                                {renderCalendarDate}
                            </CalendarGrid>
                        )
                    })}
                </div>
            ) : (
                <CalendarGrid className='**:[[role=gridcell]]:p-0.75'>{renderCalendarDate}</CalendarGrid>
            )}
        </RACCalendar>
    )
}

const RangeCalendar = <T extends DateValue>({ visibleDuration = { months: 1 }, ...props }: RangeCalendarProps<T>) => {
    const now = today(getLocalTimeZone())
    return (
        <RACRangeCalendar
            visibleDuration={visibleDuration}
            {...props}
            className={composeRenderProps(props.className, (className) =>
                cn(
                    'group/calendar w-fit bg-background in-data-[slot=card-content]:bg-transparent in-data-[slot=popover-content]:bg-transparent p-3 [--cell-size:--spacing(8)]',
                    className
                )
            )}
        >
            <CalendarHeader isRange />
            <div className='grid gap-2 overflow-auto md:flex'>
                {Array.from({ length: visibleDuration?.months ?? 1 }).map((_, index) => {
                    const id = index + 1
                    return (
                        <CalendarGrid
                            className='**:[[role=gridcell]]:py-0.75 **:[[role=gridcell]]:first:*:rounded-s-lg **:[[role=gridcell]]:last:*:rounded-e-lg'
                            key={index}
                            offset={id >= 2 ? { months: id - 1 } : undefined}
                        >
                            <CalendarGridHeader />
                            <CalendarGridBody>
                                {(date) => (
                                    <CalendarCell
                                        className={cn([
                                            'relative flex size-(--cell-size) shrink-0 cursor-pointer items-center justify-center rounded-lg outside-month:text-muted-foreground text-sm outline-hidden hover:bg-accent/90 hover:text-accent-foreground data-pressed:bg-accent data-pressed:text-accent-foreground',
                                            'data-selection-start:data-invalid:bg-destructive data-selection-start:data-invalid:text-destructive-foreground data-selection-start:bg-primary data-selection-start:text-primary-foreground',
                                            'data-selection-end:data-invalid:bg-destructive data-selection-end:data-invalid:text-destructive-foreground data-selection-end:bg-primary data-selection-end:text-primary-foreground',
                                            'data-selected:data-selection-end:rounded-r-lg data-selected:data-selection-start:rounded-l-lg data-selected:rounded-none data-selected:bg-accent data-selected:text-accent-foreground',
                                            'focus-visible:ring-2 focus-visible:ring-ring/50',
                                            'disabled:pointer-events-none disabled:opacity-50 aria-disabled:pointer-events-none aria-disabled:opacity-50',
                                            date.compare(now) === 0 &&
                                                'after:pointer-events-none after:absolute after:start-1/2 after:bottom-1 after:mt-1 after:size-1 after:-translate-x-1/2 after:rounded after:bg-primary data-selected:data-selection-end:after:bg-primary-foreground data-selected:data-selection-start:after:bg-primary-foreground'
                                        ])}
                                        date={date}
                                    />
                                )}
                            </CalendarGridBody>
                        </CalendarGrid>
                    )
                })}
            </div>
        </RACRangeCalendar>
    )
}

const CalendarHeader = ({ className, isRange, ...props }: ComponentPropsWithRef<'header'> & { isRange?: boolean }) => {
    return (
        <header
            className={cn(
                'flex w-full items-center justify-between gap-1.5 pt-1 pr-1 pb-5 pl-1.5 sm:pb-4',
                'ltr:flex-row rtl:flex-row-reverse',
                className
            )}
            slot='calendar-header'
            {...props}
        >
            <Button className='size-(--cell-size)' slot='previous' variant='ghost'>
                <IconChevronLeft />
            </Button>
            {isRange ? (
                <Heading className='font-normal text-sm' />
            ) : (
                <div className='flex items-center gap-1'>
                    <SelectMonth />
                    <SelectYear />
                </div>
            )}
            <Button className='size-(--cell-size)' slot='next' variant='ghost'>
                <IconChevronRight />
            </Button>
        </header>
    )
}

const CalendarGridHeader = () => {
    return (
        <RACCalendarGridHeader>
            {(day) => (
                <CalendarHeaderCell className='pb-2 text-center font-semibold text-muted-foreground text-sm sm:px-0 sm:py-0.5 lg:text-xs'>
                    {day}
                </CalendarHeaderCell>
            )}
        </RACCalendarGridHeader>
    )
}

interface SelectionItem {
    id: number
    date: CalendarDate
    formatted: string
}

const SelectMonth = () => {
    const calendarState = use(CalendarStateContext)
    const rangeCalendarState = use(RangeCalendarStateContext)
    const state = calendarState || rangeCalendarState!
    const formatter = useDateFormatter({
        month: 'short',
        timeZone: state.timeZone
    })

    const months: SelectionItem[] = []
    const numMonths = state.focusedDate.calendar.getMonthsInYear(state.focusedDate)
    for (let i = 1; i <= numMonths; i++) {
        const date = state.focusedDate.set({ month: i })
        months.push({
            id: i,
            date,
            formatted: formatter.format(date.toDate(state.timeZone))
        })
    }

    return (
        <div className='relative w-fit has-[select:disabled]:opacity-50'>
            <select
                aria-label='Select month'
                className={cn(
                    'h-9 w-full min-w-0 appearance-none rounded-md border border-input bg-transparent px-3 py-2 pr-9 text-sm shadow-xs outline-none transition-[color,box-shadow] selection:bg-primary selection:text-primary-foreground placeholder:text-muted-foreground disabled:pointer-events-none disabled:cursor-not-allowed dark:bg-input/30 dark:hover:bg-input/50',
                    'focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50',
                    'aria-data-invalid:border-destructive aria-data-invalid:ring-destructive/20 dark:aria-data-invalid:ring-destructive/40'
                )}
                onChange={(e) => state.setFocusedDate(months[Number(e.target.value) - 1].date)}
                value={state.focusedDate.month}
            >
                {months.map((month, i) => (
                    <option key={i} value={month.id}>
                        {month.formatted}
                    </option>
                ))}
            </select>
            <IconChevronDown
                aria-hidden='true'
                className='pointer-events-none absolute top-1/2 right-3.5 size-4 -translate-y-1/2 select-none text-muted-foreground opacity-50'
            />
        </div>
    )
}

const SelectYear = () => {
    const calendarState = use(CalendarStateContext)
    const rangeCalendarState = use(RangeCalendarStateContext)
    const state = calendarState || rangeCalendarState!
    const formatter = useDateFormatter({
        year: 'numeric',
        timeZone: state.timeZone
    })

    const years: SelectionItem[] = []
    for (let i = -20; i <= 20; i++) {
        const date = state.focusedDate.add({ years: i })
        years.push({
            id: years.length,
            date,
            formatted: formatter.format(date.toDate(state.timeZone))
        })
    }
    return (
        <div className='relative w-fit has-[select:disabled]:opacity-50'>
            <select
                aria-label='Select Year'
                className={cn(
                    'h-9 w-full min-w-0 appearance-none rounded-md border border-input bg-transparent px-3 py-2 pr-9 text-sm shadow-xs outline-none transition-[color,box-shadow] selection:bg-primary selection:text-primary-foreground placeholder:text-muted-foreground disabled:pointer-events-none disabled:cursor-not-allowed dark:bg-input/30 dark:hover:bg-input/50',
                    'focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50',
                    'aria-data-invalid:border-destructive aria-data-invalid:ring-destructive/20 dark:aria-data-invalid:ring-destructive/40'
                )}
                onChange={(e) => state.setFocusedDate(years[Number(e.target.value)].date)}
                value={20}
            >
                {years.map((year) => (
                    <option key={year.id} value={year.id}>
                        {year.formatted}
                    </option>
                ))}
            </select>
            <IconChevronDown
                aria-hidden='true'
                className='pointer-events-none absolute top-1/2 right-3.5 size-4 -translate-y-1/2 select-none text-muted-foreground opacity-50'
            />
        </div>
    )
}

export { Calendar, RangeCalendar }

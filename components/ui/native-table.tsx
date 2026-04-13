import type { ComponentProps } from 'react'
import { cn } from '@/lib/utils'

const Table = (props: ComponentProps<'table'>) => (
    <div className='relative flow-root overflow-x-auto whitespace-nowrap [--gutter-y:--spacing(1.5)] [--table-selected-bg:var(--color-primary)]'>
        <table
            className={cn('w-full min-w-full caption-bottom text-sm/6 outline-hidden', props.className)}
            {...props}
        />
    </div>
)

const TableBody = (props: ComponentProps<'tbody'>) => <tbody data-slot='table-body' {...props} />

const TableHead = (props: ComponentProps<'th'>) => (
    <th
        data-slot='table-column'
        {...props}
        className={cn(
            'relative border-l border-l-border px-4 py-(--gutter-y) text-left font-medium in-data-[slot=card]:text-muted-foreground text-primary-foreground outline-hidden first:border-l-0 first:pl-(--gutter,--spacing(2)) last:pr-(--gutter,--spacing(2))',
            props.className
        )}
    />
)

const TableHeader = (props: ComponentProps<'thead'>) => (
    <thead className={cn('border-b bg-primary', props.className)} data-slot='table-header' {...props} />
)

const TableRow = (props: ComponentProps<'tr'>) => (
    <tr
        data-slot='table-row'
        {...props}
        className={cn(
            'group relative cursor-default text-muted-foreground outline outline-transparent **:[td]:border-b last:**:[td]:border-b-0',
            'hover:bg-(--table-selected-bg)/10 hover:text-foreground',
            props.className
        )}
    />
)

const TableCell = (props: ComponentProps<'td'>) => (
    <td
        data-slot='table-cell'
        {...props}
        className={cn(
            'group shrink-0 border-l px-4 py-(--gutter-y) align-middle outline-hidden first:border-l-0 first:pl-(--gutter,--spacing(2)) last:pr-(--gutter,--spacing(2))',
            props.className
        )}
    />
)

Table.Header = TableHeader
Table.Body = TableBody
Table.Head = TableHead
Table.Cell = TableCell
Table.Row = TableRow

export { Table, TableBody, TableCell, TableHead, TableHeader, TableRow }

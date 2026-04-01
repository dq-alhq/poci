'use client'

import {
    composeRenderProps,
    Tab as RACTab,
    TabList as RACTabList,
    TabPanel as RACTabPanel,
    TabPanels as RACTabPanels,
    Tabs as RACTabs,
    SelectionIndicator,
    type TabListProps,
    type TabPanelProps,
    type TabPanelsProps,
    type TabProps,
    type TabsProps
} from 'react-aria-components'
import { tv, type VariantProps } from 'tailwind-variants'
import { cn } from '@/lib/utils'

const Tabs = ({ className, ...props }: TabsProps) => (
    <RACTabs
        className={composeRenderProps(className, (className) =>
            cn('group/tabs flex max-w-full gap-2 data-[orientation=horizontal]:flex-col', className)
        )}
        data-slot='tabs'
        {...props}
    />
)

const tabsListVariants = tv({
    base: 'group/tabs-list isolate inline-flex w-fit items-center justify-center rounded-lg p-[3px] text-muted-foreground [scrollbar-width:none] data-[variant=line]:rounded-none group-data-[orientation=horizontal]/tabs:h-9 group-data-[orientation=vertical]/tabs:h-fit group-data-[orientation=vertical]/tabs:flex-col',
    variants: {
        variant: {
            default: 'bg-muted',
            line: 'gap-1 bg-transparent'
        }
    },
    defaultVariants: {
        variant: 'default'
    }
})

const TabsList = <T extends object>({
    className,
    variant,
    ...props
}: TabListProps<T> & VariantProps<typeof tabsListVariants>) => (
    <RACTabList
        className={composeRenderProps(className, (className) => cn(tabsListVariants({ variant }), className))}
        data-slot='tabs-list'
        data-variant={variant}
        {...props}
    />
)

const TabsTrigger = ({ className, ...props }: TabProps) => (
    <RACTab
        className={composeRenderProps(className, (className) =>
            cn(
                "group/tab relative isolate flex h-[calc(100%-1px)] flex-1 items-center justify-center gap-1 whitespace-nowrap rounded-md px-2.5 py-1 font-medium text-foreground/60 text-sm outline-hidden transition-all hover:text-foreground data-disabled:pointer-events-none data-disabled:opacity-50 group-data-[orientation=vertical]/tabs:w-full group-data-[orientation=vertical]/tabs:justify-start dark:text-muted-foreground dark:hover:text-foreground [&_svg:not([class*='size-'])]:size-4 [&_svg]:pointer-events-none [&_svg]:shrink-0",
                'data-selected:text-foreground group-data-[variant=line]/tabs-list:bg-transparent dark:data-selected:text-foreground',
                'href' in props ? 'cursor-pointer' : 'cursor-default',
                className
            )
        )}
        data-slot='tabs-trigger'
        {...props}
    >
        {(values) => (
            <>
                {typeof props.children === 'function' ? props.children(values) : props.children}
                <SelectionIndicator
                    className={cn(
                        'absolute left-0 -z-1 size-full rounded-md border motion-safe:transition-[translate,width,color]',
                        'bg-background dark:border-input dark:bg-input/30',
                        'group-focus-visible/tab:border-ring group-focus-visible/tab:outline-1 group-focus-visible/tab:outline-ring group-focus-visible/tab:ring-[3px] group-focus-visible/tab:ring-ring/50',
                        'group-data-[variant=line]/tabs-list:border-transparent group-data-[variant=line]/tabs-list:bg-transparent dark:group-data-[variant=line]/tabs-list:border-transparent dark:group-data-[variant=line]/tabs-list:bg-transparent',
                        'group-data-[variant=default]/tabs-list:shadow-sm group-data-[variant=line]/tabs-list:shadow-none',
                        'after:absolute after:bg-foreground after:opacity-0 after:transition-opacity group-data-[orientation=horizontal]/tabs:after:inset-x-0 group-data-[orientation=vertical]/tabs:after:inset-y-0 group-data-[orientation=vertical]/tabs:after:-right-1 group-data-[orientation=horizontal]/tabs:after:-bottom-1.25 group-data-[orientation=horizontal]/tabs:after:h-0.5 group-data-[orientation=vertical]/tabs:after:w-0.5 group-data-[variant=line]/tabs-list:after:opacity-100'
                    )}
                    data-slot='selected-indicator'
                />
            </>
        )}
    </RACTab>
)

const TabsContents = <T extends object>(props: TabPanelsProps<T>) => (
    <RACTabPanels
        {...props}
        className={cn('relative h-(--tab-panel-height) motion-safe:transition-[height]', props.className)}
    />
)

const TabsContent = ({ className, ...props }: TabPanelProps) => (
    <RACTabPanel
        className={composeRenderProps(className, (className) => cn('flex-1 text-sm outline-none', className))}
        data-slot='tabs-content'
        {...props}
    />
)

Tabs.List = TabsList
Tabs.Trigger = TabsTrigger
Tabs.Contents = TabsContents
Tabs.Content = TabsContent

export { Tabs, TabsContent, TabsContents, TabsList, TabsTrigger }

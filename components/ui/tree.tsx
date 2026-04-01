'use client'

import type { ReactNode } from 'react'
import type { TreeItemContentProps, TreeItemProps, TreeProps } from 'react-aria-components'
import { IconChevronRight, IconFile } from '@tabler/icons-react'
import {
    Button,
    composeRenderProps,
    Tree as RACTree,
    TreeItem as RACTreeItem,
    TreeItemContent
} from 'react-aria-components'
import { cn } from '@/lib/utils'
import { Checkbox } from './checkbox'

const Tree = <T extends object>({ className, ...props }: TreeProps<T>) => (
    <RACTree
        className={composeRenderProps(className, (className) =>
            cn(
                'flex flex-col gap-0.5 text-sm outline-hidden',
                "[&_svg:not([class*='size-'])]:size-4 [&_svg]:pointer-events-none [&_svg]:shrink-0",
                className
            )
        )}
        data-slot='tree'
        {...props}
    />
)

const TreeItem = <T extends object>({ className, ...props }: TreeItemProps<T>) => (
    <RACTreeItem
        className={composeRenderProps(className, (className) =>
            cn(
                'relative flex cursor-default items-center gap-1 rounded-lg border border-transparent text-sm outline-hidden transition',
                'pr-2 **:data-[slot=tree-item]:py-1.5',
                'focus-visible:border-border focus-visible:ring-[3px] focus-visible:ring-ring/50',
                'hover:bg-accent hover:text-accent-foreground',
                'data-selected:bg-accent data-selected:text-accent-foreground',
                'data-disabled:opacity-50',
                className
            )
        )}
        data-slot='tree-item'
        {...props}
    />
)

interface TreeItemLabelProps extends TreeItemContentProps {
    icon?: ReactNode | boolean
    iconExpanded?: ReactNode
}

const TreeItemLabel = ({ children, icon, iconExpanded, ...props }: TreeItemLabelProps) => (
    <TreeItemContent {...props}>
        {(values) => (
            <>
                <div className='relative w-[calc(calc(var(--tree-item-level)-1)*calc(var(--spacing)*5.5))] shrink-0' />
                {values.selectionMode === 'multiple' && values.selectionBehavior === 'toggle' && (
                    <Checkbox className='mr-0.5' slot='selection' />
                )}
                {values.hasChildItems ? (
                    <Button
                        className='inline-flex w-full items-center justify-start gap-1 outline-hidden'
                        data-slot='tree-item'
                        slot='chevron'
                    >
                        <IconChevronRight
                            className={cn('transition-transform', values.isExpanded && 'rotate-90')}
                            data-slot='indicator'
                        />
                        {!values.isExpanded && (typeof icon === 'boolean' ? <IconFile /> : icon)}
                        {values.hasChildItems && values.isExpanded && (iconExpanded ?? icon)}
                        {typeof children === 'function' ? children(values) : children}
                    </Button>
                ) : (
                    <span
                        className='inline-flex w-full items-center justify-start gap-1 outline-hidden'
                        data-slot='tree-item'
                    >
                        {typeof icon === 'boolean' ? <IconFile /> : icon}
                        {typeof children === 'function' ? children(values) : children}
                    </span>
                )}
            </>
        )}
    </TreeItemContent>
)

Tree.Item = TreeItem
Tree.ItemLabel = TreeItemLabel

export type { TreeItemProps, TreeProps }
export { Tree, TreeItem, TreeItemLabel }

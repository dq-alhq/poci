'use client'

import { IconChevronRight } from '@tabler/icons-react'
import { createContext, type ReactNode, use } from 'react'
import {
    type BreadcrumbProps,
    type BreadcrumbsProps,
    composeRenderProps,
    Link,
    type LinkProps,
    Breadcrumb as RACBreadcrumb,
    Breadcrumbs as RACBreadcrumbs
} from 'react-aria-components'
import { cn } from '@/lib/utils'

type BreadcrumbsContextProps = { separator?: ReactNode }
const BreadcrumbsProvider = createContext<BreadcrumbsContextProps>({})

const Breadcrumb = <T extends object>({
    className,
    separator = <IconChevronRight size={16} />,
    ...props
}: BreadcrumbsProps<T> & BreadcrumbsContextProps) => {
    return (
        <BreadcrumbsProvider value={{ separator }}>
            <RACBreadcrumbs {...props} className={cn('flex items-center gap-2', className)} />
        </BreadcrumbsProvider>
    )
}

interface BreadcrumbsItemProps extends BreadcrumbProps, BreadcrumbsContextProps {
    href?: string
}

const BreadcrumbItem = ({
    href,
    className,
    ...props
}: BreadcrumbsItemProps & Partial<Omit<LinkProps, 'className'>>) => {
    const { separator } = use(BreadcrumbsProvider)

    return (
        <RACBreadcrumb
            className={composeRenderProps(className, (className, { isCurrent }) =>
                cn(
                    "flex items-center gap-2 font-normal text-sm **:transition-colors [&_svg:not([class*='size-'])]:size-4 [&_svg]:pointer-events-none [&_svg]:shrink-0",
                    isCurrent ? 'text-foreground' : 'text-muted-foreground hover:*:[a]:text-foreground',
                    className
                )
            )}
            data-slot='breadcrumb-item'
            {...props}
        >
            {({ isCurrent }) => (
                <>
                    <Link className='flex items-center gap-2' href={href} {...props} />
                    {!isCurrent && separator}
                </>
            )}
        </RACBreadcrumb>
    )
}

Breadcrumb.Item = BreadcrumbItem

export { Breadcrumb, BreadcrumbItem }

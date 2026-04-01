'use client'

import { composeRenderProps, Link as RACLink, type LinkProps as RACLinkProps } from 'react-aria-components'
import { cn } from '@/lib/utils'

interface LinkProps extends RACLinkProps {
    ref?: React.RefObject<HTMLAnchorElement>
}

const Link = ({ className, ref, ...props }: LinkProps) => {
    return (
        <RACLink
            className={composeRenderProps(className, (className) =>
                cn(
                    [
                        'rounded outline-0 outline-offset-2 focus-visible:outline-2 focus-visible:outline-ring',
                        'disabled:cursor-default disabled:text-muted-foreground',
                        'href' in props && 'cursor-pointer'
                    ],
                    className
                )
            )}
            ref={ref}
            {...props}
        />
    )
}

export type { LinkProps }
export { Link }

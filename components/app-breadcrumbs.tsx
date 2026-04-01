'use client'
import { usePathname } from 'next/navigation'
import { useIsMobile } from '@/hooks/use-mobile'
import { strlimit } from '@/lib/utils'
import { Breadcrumb } from './ui/breadcrumb'

export const AppBreadcrumbs = () => {
    const paths = usePathname()
    const pathnames = paths.split('/').filter((path) => path)
    const isMobile = useIsMobile()
    return (
        <Breadcrumb>
            {isMobile ? (
                <Breadcrumb.Item className='capitalize'>{strlimit(pathnames.pop()!, 15)}</Breadcrumb.Item>
            ) : (
                pathnames.map((link, index) => {
                    const href = `/${pathnames.slice(0, index + 1).join('/')}`
                    const isLast = index === pathnames.length - 1
                    const name = link.charAt(0).toUpperCase() + link.slice(1)

                    return (
                        <Breadcrumb.Item href={isLast ? '#' : href} key={index}>
                            {name}
                        </Breadcrumb.Item>
                    )
                })
            )}
        </Breadcrumb>
    )
}

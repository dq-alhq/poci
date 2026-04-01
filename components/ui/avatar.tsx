'use client'

import { IconUser } from '@tabler/icons-react'
import { type HTMLAttributes, type ReactNode, useCallback, useState } from 'react'
import { cn } from '@/lib/utils'

interface AvatarProps extends HTMLAttributes<HTMLDivElement> {
    src?: string | null
    alt?: string
    fallback?: ReactNode
    imgClassName?: string
    fallbackClassName?: string
}

const Avatar = ({ src, alt, fallback = null, className, imgClassName, fallbackClassName, ...props }: AvatarProps) => {
    const [hasError, setHasError] = useState(false)
    const [loaded, setLoaded] = useState(false)

    const handleError = useCallback(() => {
        setHasError(true)
    }, [])

    const handleLoad = useCallback(() => {
        setLoaded(true)
    }, [])

    return (
        <div
            className={cn('relative flex size-8 shrink-0 overflow-hidden rounded-full bg-muted', className)}
            data-slot='avatar'
            {...props}
        >
            {src && !hasError ? (
                <img
                    alt={alt ?? ''}
                    className={cn('aspect-square size-full', imgClassName)}
                    data-slot='avatar-image'
                    onError={handleError}
                    onLoad={handleLoad}
                    src={src}
                />
            ) : null}
            {(!src || hasError || (src && !loaded && false)) && (
                <div
                    aria-hidden={!!src && !hasError ? 'true' : 'false'}
                    className={cn(
                        'flex size-full items-center justify-center rounded-full bg-muted text-muted-foreground',
                        fallbackClassName
                    )}
                    data-slot='avatar-fallback'
                >
                    {fallback ?? <IconUser />}
                </div>
            )}
        </div>
    )
}

export { Avatar }

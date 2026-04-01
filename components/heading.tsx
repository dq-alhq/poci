import type { PropsWithChildren } from 'react'

interface Props extends PropsWithChildren {
    title: string
    description?: string
    variant?: 'default' | 'small'
}
export default function Heading({ title, description, variant = 'default', children }: Props) {
    return (
        <div className='flex w-full flex-wrap justify-between gap-4'>
            <header className={variant === 'small' ? '' : 'space-y-0.5'}>
                <h2
                    className={
                        variant === 'small' ? 'mb-0.5 font-medium text-base' : 'font-semibold text-xl tracking-tight'
                    }
                >
                    {title}
                </h2>
                {description && <p className='text-muted-foreground text-sm'>{description}</p>}
            </header>
            {children}
        </div>
    )
}

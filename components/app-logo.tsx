import type { ComponentProps } from 'react'
import Image from 'next/image'
import { cn } from '@/lib/utils'

export const AppLogo = (props: ComponentProps<'div'>) => (
    <div {...props} className={cn('overflow-hidden object-cover', props.className)}>
        <Image alt='Logo' className='size-full' height={531} placeholder='blur' src='/poci.svg' width={703} />
    </div>
)

'use client'

import { IconMoon, IconSun } from '@tabler/icons-react'
import { useTheme } from 'next-themes'
import { Button } from '@/components/ui/button'

export function ModeToggle({ variant = 'outline' }: { variant?: 'outline' | 'ghost' }) {
    const { resolvedTheme, setTheme } = useTheme()

    return (
        <Button
            aria-label={`Switch to ${resolvedTheme}` === 'light' ? 'dark' : 'light' + 'mode'}
            onPress={() => setTheme(resolvedTheme === 'light' ? 'dark' : 'light')}
            size='icon'
            variant={variant}
        >
            <IconSun aria-hidden className='rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0' />
            <IconMoon aria-hidden className='absolute rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100' />
        </Button>
    )
}

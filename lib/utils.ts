import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs))
}

export const slugify = (value: string): string =>
    value
        .toLowerCase()
        .trim()
        .replace(/\s+/g, '_') // spaces → dashes
        .replace(/[^\w-]+/g, '') // remove non-word chars
        .replace(/--+/g, '_') // collapse multiple dashes

export const strlimit = (text: string, max: number): string =>
    text.length <= max ? text : `${text.slice(0, max - 3)}...`

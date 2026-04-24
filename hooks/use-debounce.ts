import { useCallback, useEffect, useRef } from 'react'

/**
 * Custom hook to debounce a callback function in TypeScript
 * @param callback The function to debounce
 * @param delay Delay in milliseconds
 */
export function useDebounceCallback<T extends (...args: any[]) => any>(callback: T, delay: number) {
    const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null)

    // Clear timeout on unmount to prevent memory leaks
    useEffect(() => {
        return () => {
            if (timeoutRef.current) clearTimeout(timeoutRef.current)
        }
    }, [])

    return useCallback(
        (...args: Parameters<T>) => {
            if (timeoutRef.current) {
                clearTimeout(timeoutRef.current)
            }

            timeoutRef.current = setTimeout(() => {
                callback(...args)
            }, delay)
        },
        [callback, delay]
    )
}

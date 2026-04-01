'use client'

import { useRouter } from 'next/navigation'
import React from 'react'
import { Sheet } from '@/components/ui/sheet'

export function InterceptModal({
    title,
    description,
    children
}: {
    title: string
    description?: string
    children: React.ReactNode
}) {
    const router = useRouter()

    const [open, setOpen] = React.useState(true)

    function onClose() {
        setOpen(false)
        setTimeout(() => router.back(), 200)
    }

    return (
        <Sheet isOpen={open} onOpenChange={onClose}>
            <Sheet.Trigger className='sr-only' />
            <Sheet.Content>
                <Sheet.Header>
                    <Sheet.Title>{title}</Sheet.Title>
                    {description && <Sheet.Description>{description}</Sheet.Description>}
                </Sheet.Header>
                <Sheet.Body>{children}</Sheet.Body>
            </Sheet.Content>
        </Sheet>
    )
}

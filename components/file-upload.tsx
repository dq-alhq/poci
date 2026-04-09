'use client'

import type { DropEvent } from '@react-types/shared'
import { IconX } from '@tabler/icons-react'
import { useRef, useState } from 'react'
import { isFileDropItem } from 'react-aria-components'
import { Button } from '@/components/ui/button'
import { DropZone } from '@/components/ui/drop-zone'
import { FileTrigger } from '@/components/ui/file-trigger'

export const FileUpload = () => {
    const [droppedImage, setDroppedImage] = useState<string | undefined>(undefined)
    const inputFileRef = useRef<HTMLInputElement>(null)

    const onDropHandler = async (e: DropEvent) => {
        const item = e.items
            .filter(isFileDropItem)
            .find((item) => item.type === 'image/jpeg' || item.type === 'image/png')
        if (item) {
            const file = await item.getFile()
            setDroppedImage(URL.createObjectURL(file))
        }
    }

    const onSelectHandler = async (e: any) => {
        if (e) {
            const files = Array.from([...e])
            const item = files[0]

            if (item) {
                setDroppedImage(URL.createObjectURL(item))
            }
        }
    }

    const onClearHandler = () => {
        setDroppedImage(undefined)
    }

    return (
        <DropZone
            className='relative size-full max-h-none object-cover p-0 lg:w-72'
            getDropOperation={(types) => (types.has('image/jpeg') || types.has('image/png') ? 'copy' : 'cancel')}
            onDrop={onDropHandler}
        >
            {droppedImage ? (
                <>
                    <div className='absolute top-2 right-2 z-50'>
                        <Button onPress={onClearHandler} variant='destructive'>
                            <IconX />
                        </Button>
                    </div>
                    <img alt='' className='size-full object-cover' src={droppedImage} />
                </>
            ) : (
                <div className='grid space-y-3'>
                    <div className='flex justify-center'>
                        <FileTrigger
                            acceptedFileTypes={['image/png', 'image/jpeg']}
                            allowsMultiple={false}
                            onSelect={onSelectHandler}
                        >
                            Upload gambar
                        </FileTrigger>
                    </div>
                    <p className='text-center text-muted-foreground text-xs'>atau seret gambar kesini</p>
                </div>
            )}
            <input name='image' ref={inputFileRef} type='hidden' value={droppedImage} />
        </DropZone>
    )
}

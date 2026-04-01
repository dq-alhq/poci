'use client'

import type { Key, Selection, TagGroupProps, TagListProps, TagProps, TextFieldProps } from 'react-aria-components'
import { IconX } from '@tabler/icons-react'
import { type KeyboardEvent, useEffect, useMemo, useRef, useState } from 'react'
import {
    Button,
    composeRenderProps,
    Tag as RACTag,
    TagGroup as RACTagGroup,
    TagList as RACTagList
} from 'react-aria-components'
import { cn } from '@/lib/utils'
import { FieldError, fieldVariants } from './field'
import { TextField } from './text-field'

const TagGroup = ({ className, ...props }: TagGroupProps) => (
    <RACTagGroup className={cn(fieldVariants(), className)} data-slot='control' {...props} />
)

const TagList = <T extends object>({ className, ...props }: TagListProps<T>) => (
    <RACTagList
        className={composeRenderProps(className, (className) =>
            cn('group/tag-list flex flex-wrap gap-1 outline-hidden', className)
        )}
        data-slot='tag-list'
        {...props}
    />
)

const Tag = ({ children, className, ...props }: TagProps) => {
    const textValue = typeof children === 'string' ? children : undefined

    return (
        <RACTag
            className={composeRenderProps(className, (className) =>
                cn(
                    'inset-ring inset-ring-input outline-hidden transition dark:bg-input/30',
                    'inline-flex items-center gap-x-1.5 py-0.5 font-medium text-xs/5',
                    '[&_svg:not([class*="size-"])]:size-3 [&_svg]:pointer-events-none [&_svg]:shrink-0',
                    'rounded-md px-2',
                    'data-focus-visible:ring-[3px] data-focus-visible:ring-ring/50',
                    'data-selected:inset-ring-ring/70 data-selected:bg-primary data-selected:text-primary-foreground dark:data-selected:bg-primary',
                    'data-disabled:opacity-50',
                    'href' in props ? 'cursor-pointer' : 'cursor-default',
                    'aria-invalid:border-destructive aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40',
                    className
                )
            )}
            data-slot='tag'
            textValue={textValue}
            {...props}
        >
            {({ allowsRemoving }) => (
                <>
                    {children}
                    {allowsRemoving && (
                        <Button
                            className='z-10 rounded-full p-0.5 transition-colors hover:bg-destructive/20'
                            slot='remove'
                        >
                            <IconX className='size-3' />
                        </Button>
                    )}
                </>
            )}
        </RACTag>
    )
}

interface TagInputProps extends Pick<TextFieldProps, 'children' | 'aria-label' | 'aria-labelledby'> {
    value?: Selection
    onChange?: (next: Selection) => void
    defaultValue?: string[]
    splitPattern?: RegExp
    className?: string
    inputValue?: string
    onInputValueChange?: (v: string) => void
    isRequired?: boolean
    requiredMessage?: string
    name?: string
}

const TagField = ({
    value,
    onChange,
    defaultValue = [],
    splitPattern = /[,;]/,
    className,
    inputValue: controlledInput,
    onInputValueChange,
    isRequired,
    requiredMessage,
    name = 'tags',
    children,
    ...props
}: TagInputProps) => {
    const [internalSelection, setInternalSelection] = useState<Selection>(new Set(defaultValue))
    const [uncontrolledInput, setUncontrolledInput] = useState('')
    const [touched, setTouched] = useState(false)
    const hiddenRef = useRef<HTMLInputElement>(null)

    const selection: Selection = value ?? internalSelection
    const inputValue = controlledInput ?? uncontrolledInput
    const setInputValue = onInputValueChange ?? setUncontrolledInput
    const applySelection = (next: Selection) => (onChange ?? setInternalSelection)(next as Selection)

    const list = useMemo(() => {
        return selection === 'all' ? [] : Array.from(selection).map((v) => String(v))
    }, [selection])

    const isInvalid = Boolean(isRequired && list.length === 0 && touched)
    const errorText = requiredMessage ?? 'At least one item is required'

    useEffect(() => {
        const input = hiddenRef.current
        const form = input?.form
        if (!form || !input) return
        const onSubmit = (e: Event) => {
            if (isRequired && list.length === 0) {
                e.preventDefault()
                setTouched(true)
                input.setCustomValidity(errorText)
                form.reportValidity()
            } else {
                input.setCustomValidity('')
            }
        }
        form.addEventListener('submit', onSubmit)
        return () => form.removeEventListener('submit', onSubmit)
    }, [isRequired, list.length, errorText])

    function handleKeyDown(e: KeyboardEvent) {
        if (e.key === 'Enter' || e.key === ',' || e.key === ';') {
            e.preventDefault()
            addTag()
        }
    }

    function addTag() {
        if (selection === 'all') return
        const next = new Set<Key>(Array.from(selection))
        inputValue.split(splitPattern).forEach((raw) => {
            const formatted = raw
                .trim()
                .replace(/\s\s+/g, ' ')
                .replace(/\t|\\t|\r|\\r|\n|\\n/g, '')
            if (formatted === '') return
            const exists = Array.from(next).some(
                (id) => String(id).toLocaleLowerCase() === formatted.toLocaleLowerCase()
            )
            if (!exists) next.add(formatted)
        })
        applySelection(next)
        setInputValue('')
        setTouched(true)
    }

    function removeKeys(keys: Selection) {
        if (selection === 'all') return
        const next = new Set<Key>(Array.from(selection))
        if (keys !== 'all') {
            for (const k of keys) next.delete(k)
        }
        applySelection(next)
        setTouched(true)
    }

    return (
        <div className={cn('flex flex-col gap-y-1', className)}>
            <TextField
                isInvalid={isInvalid}
                onBlur={() => setTouched(true)}
                onChange={setInputValue}
                onKeyDown={handleKeyDown}
                value={inputValue}
                {...props}
            >
                {(values) => (
                    <>
                        {typeof children === 'function' ? children(values) : children}
                        <FieldError>{isInvalid ? errorText : undefined}</FieldError>
                    </>
                )}
            </TextField>
            {selection ? (
                <TagGroup aria-label='Selected tags' className='mt-1' onRemove={removeKeys}>
                    <TagList>
                        {list.map((id) => (
                            <Tag id={id} key={id}>
                                {id}
                            </Tag>
                        ))}
                    </TagList>
                </TagGroup>
            ) : null}
            <input
                aria-hidden='true'
                className='sr-only absolute -z-10 size-0 opacity-0'
                name={name}
                readOnly
                ref={hiddenRef}
                required={Boolean(isRequired)}
                tabIndex={-1}
                value={list.join(',')}
            />
        </div>
    )
}

export { Tag, TagField, TagGroup, TagList }

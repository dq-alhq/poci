'use client'

import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { useCallback } from 'react'
import { useDebouncedCallback } from 'use-debounce'
import { cn } from '@/lib/utils'
import { FieldDescription, FieldLabel } from './ui/field'
import { Pagination } from './ui/pagination'
import { SearchField, SearchInput } from './ui/search-field'
import { Select } from './ui/select'

export function Search({ className }: { className?: string }) {
    const searchParams = useSearchParams()
    const pathname = usePathname()
    const { replace } = useRouter()
    const handleSearch = useDebouncedCallback((term) => {
        const params = new URLSearchParams(searchParams)
        if (term) {
            params.set('search', term)
        } else {
            params.delete('search')
        }
        replace(`${pathname}?${params.toString()}`)
    }, 300)

    return (
        <SearchField
            aria-label='Search'
            className={cn('relative w-full max-w-lg', className)}
            defaultValue={searchParams.get('search')?.toString()}
            onChange={handleSearch}
        >
            <SearchInput placeholder='Cari...' />
        </SearchField>
    )
}

export function Paginator({ total }: { total: number }) {
    const searchParams = useSearchParams()
    const pathname = usePathname()
    const { replace } = useRouter()
    const handlePerPage = useDebouncedCallback((term) => {
        const params = new URLSearchParams(searchParams)
        if (term) {
            params.set('show', term)
        } else {
            params.delete('show')
        }
        replace(`${pathname}?${params.toString()}`)
    }, 300)

    const handlePage = useCallback(
        (value: number) => {
            const params = new URLSearchParams(searchParams.toString())
            params.set('page', value.toString())

            return params.toString()
        },
        [searchParams]
    )

    const lastPage = Math.ceil(total / Number(searchParams.get('show') ?? 10))

    return (
        <div className='flex flex-col-reverse items-center justify-between gap-3 lg:flex-row'>
            <FieldDescription>Total {total} data</FieldDescription>
            <div className='flex items-center gap-2'>
                <Select
                    aria-label='Per Page'
                    className='w-fit'
                    defaultValue={searchParams.get('show')?.toString()}
                    onChange={handlePerPage}
                    orientation='horizontal'
                    placeholder='10'
                >
                    <FieldLabel>Show</FieldLabel>
                    <Select.Trigger size='sm'>
                        <Select.Value />
                    </Select.Trigger>
                    <Select.Content>
                        <Select.Item id={'10'}>10</Select.Item>
                        <Select.Item id={'25'}>25</Select.Item>
                        <Select.Item id={'40'}>40</Select.Item>
                        <Select.Item id={'100'}>100</Select.Item>
                    </Select.Content>
                </Select>
                <Pagination>
                    <Pagination.Content>
                        <Pagination.Item>
                            <Pagination.First
                                href={`${pathname}?${handlePage(1)}`}
                                isDisabled={Number(searchParams.get('page')) <= 1}
                            />
                        </Pagination.Item>
                        <Pagination.Item>
                            <Pagination.Previous
                                href={
                                    searchParams.get('page')
                                        ? `${pathname}?${handlePage(Number(searchParams.get('page')) - 1)}`
                                        : '#'
                                }
                                isDisabled={Number(searchParams.get('page')) <= 1}
                            />
                        </Pagination.Item>
                        <Pagination.Item>
                            <Pagination.Link isActive>{searchParams.get('page') ?? '1'}</Pagination.Link>
                        </Pagination.Item>
                        <Pagination.Item>
                            <Pagination.Next
                                href={`${pathname}?${handlePage(Number(searchParams.get('page') ?? 1) + 1)}`}
                                isDisabled={Number(searchParams.get('page')) >= lastPage}
                            />
                        </Pagination.Item>
                        <Pagination.Item>
                            <Pagination.Last
                                href={`${pathname}?${handlePage(lastPage)}`}
                                isDisabled={Number(searchParams.get('page')) >= lastPage}
                            />
                        </Pagination.Item>
                    </Pagination.Content>
                </Pagination>
            </div>
        </div>
    )
}

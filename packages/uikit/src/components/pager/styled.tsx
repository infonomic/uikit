'use client'
// TODO: Implement general purpose pager
import type * as React from 'react'

import { CheckIcon, ChevronDownIcon, ChevronUpIcon } from '@radix-ui/react-icons'
import cx from 'classnames'
import { Select as SelectPrimitive } from 'radix-ui'
import { twMerge } from 'tailwind-merge'

interface PageSizeValue {
  label: string
  value: string
}

const pageSizeValues: PageSizeValue[] = [
  {
    label: '10',
    value: '10',
  },
  {
    label: '20',
    value: '20',
  },
  {
    label: '30',
    value: '30',
  },
  {
    label: '50',
    value: '50',
  },
]

type PagerButtonProps = React.JSX.IntrinsicElements['button']

const PagerButton = function PagerButton({
  ref,
  children,
  ...props
}: PagerButtonProps & {
  ref?: React.RefObject<HTMLButtonElement>
}) {
  return (
    <button
      ref={ref}
      {...props}
      className={cx(
        'inline-flex select-none items-center justify-center text-sm font-medium',
        'rounded-md border border-canvas-300 px-4 py-2 dark:border-canvas-700',
        'bg-white text-gray-700 hover:bg-canvas-50 dark:bg-canvas-800 dark:text-gray-100 dark:hover:bg-canvas-900',
        'hover:bg-canvas-50',
        'focus:outline-none focus-visible:ring focus-visible:ring-primary-500 focus-visible:ring-opacity-75',
        // Register all radix states
        'group',
        'radix-state-open:bg-canvas-50 dark:radix-state-open:bg-canvas-900',
        'radix-state-on:bg-canvas-50 dark:radix-state-on:bg-canvas-900',
        'radix-state-delayed-open:bg-canvas-50 radix-state-instant-open:bg-canvas-50'
      )}
    >
      {children}
    </button>
  )
}

interface SelectProps {
  data: any
  onPageSizeChange?: (value: string) => void
  values: PageSizeValue[]
}

function Select({ data, values, onPageSizeChange }: SelectProps): React.JSX.Element {
  return (
    <SelectPrimitive.Root
      onValueChange={onPageSizeChange}
      defaultValue={data?.meta?.pageSize.toString()}
    >
      <SelectPrimitive.Trigger asChild aria-label="Page Size">
        <PagerButton>
          <SelectPrimitive.Value />
          <SelectPrimitive.Icon className="ml-2">
            <ChevronDownIcon />
          </SelectPrimitive.Icon>
        </PagerButton>
      </SelectPrimitive.Trigger>
      <SelectPrimitive.Content>
        <SelectPrimitive.ScrollUpButton className="flex items-center justify-center text-gray-700 dark:text-gray-300">
          <ChevronUpIcon />
        </SelectPrimitive.ScrollUpButton>
        <SelectPrimitive.Viewport className="rounded-lg border border-canvas-300 bg-white p-1 shadow-lg dark:border-canvas-700 dark:bg-canvas-800">
          <SelectPrimitive.Group>
            {values.map((item) => (
              <SelectPrimitive.Item
                key={item.value}
                value={item.value}
                className={cx(
                  'relative flex items-center rounded-md px-6 py-2 text-sm font-medium text-gray-700 dark:text-gray-300',
                  'focus:bg-canvas-100 radix-disabled:opacity-50 dark:focus:bg-canvas-900',
                  'select-none focus:outline-none'
                )}
              >
                <SelectPrimitive.ItemText>{item.label}</SelectPrimitive.ItemText>
                <SelectPrimitive.ItemIndicator className="absolute left-1 inline-flex items-center">
                  <CheckIcon />
                </SelectPrimitive.ItemIndicator>
              </SelectPrimitive.Item>
            ))}
          </SelectPrimitive.Group>
        </SelectPrimitive.Viewport>
        <SelectPrimitive.ScrollDownButton className="flex items-center justify-center text-gray-700 dark:text-gray-300">
          <ChevronDownIcon />
        </SelectPrimitive.ScrollDownButton>
      </SelectPrimitive.Content>
    </SelectPrimitive.Root>
  )
}

export interface PagerProps {
  data: any
  onPageChange: (value: number) => void
  onPageSizeChange: (value: string) => void
  className?: string
}

export const Pager = function Pager({
  ref,
  className,
  data,
  onPageChange,
  onPageSizeChange,
}: PagerProps & {
  ref?: React.RefObject<HTMLElement>
}) {
  const first = data?.meta?.currentPage * data?.meta?.pageSize - (data?.meta?.pageSize - 1)
  const last = first + (data?.meta?.pageSize - 1)

  const classes = twMerge(
    'flex flex-col md:flex-row md:gap-4 items-start md:items-center py-4 px-1',
    className
  )

  return (
    <nav ref={ref} className={classes} aria-label="Page navigation">
      <div className="mb-3 mr-auto text-sm font-normal text-gray-500 dark:text-gray-400 md:mb-0">
        Showing
        <span className="font-semibold text-gray-900 dark:text-white">
          {' '}
          {first}-{last < data?.meta?.total ? last : data?.meta?.total}{' '}
        </span>
        of <span className="font-semibold text-gray-900 dark:text-white">{data?.meta?.total}</span>
      </div>

      <div className="mb-3 md:mb-0">
        <Select data={data} values={pageSizeValues} onPageSizeChange={onPageSizeChange} />
      </div>

      <ul className="flex items-center -space-x-px">
        <li className="flex">
          <button
            type="button"
            className="ml-0 flex rounded-l-md border border-canvas-300 bg-white px-2 py-2 leading-tight text-gray-500 hover:bg-canvas-100 hover:text-gray-700 dark:border-canvas-700 dark:bg-canvas-800 dark:text-gray-400 dark:hover:bg-canvas-700 dark:hover:text-white"
            onClick={() => {
              onPageChange(1)
            }}
            disabled={data.meta.currentPage === first}
          >
            <span className="sr-only">First</span>
            <svg
              className="h-5 w-5"
              aria-hidden="true"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
                clipRule="evenodd"
              />
            </svg>
            <svg
              className="-ml-2 h-5 w-5"
              aria-hidden="true"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
                clipRule="evenodd"
              />
            </svg>
          </button>
        </li>
        <li className="flex">
          <button
            type="button"
            className="border border-canvas-300 bg-white px-3 py-2 leading-tight text-gray-500 hover:bg-canvas-100 hover:text-gray-700 dark:border-canvas-700 dark:bg-canvas-800 dark:text-gray-400 dark:hover:bg-canvas-700 dark:hover:text-white"
            onClick={() => {
              onPageChange(data.meta.currentPage - 1)
            }}
            disabled={data.meta.currentPage === first}
          >
            <span className="sr-only">Previous</span>
            <svg
              className="h-5 w-5"
              aria-hidden="true"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
                clipRule="evenodd"
              />
            </svg>
          </button>
        </li>
        <li className="flex">
          <button
            type="button"
            className="border border-canvas-300 bg-white px-3 py-2 leading-tight text-gray-500 hover:bg-canvas-100 hover:text-gray-700 dark:border-canvas-700 dark:bg-canvas-800 dark:text-gray-400 dark:hover:bg-canvas-700 dark:hover:text-white"
          >
            1
          </button>
        </li>
        <li className="flex">
          <button
            type="button"
            className="border border-canvas-300 bg-white px-3 py-2 leading-tight text-gray-500 hover:bg-canvas-100 hover:text-gray-700 dark:border-canvas-700 dark:bg-canvas-800 dark:text-gray-400 dark:hover:bg-canvas-700 dark:hover:text-white"
          >
            2
          </button>
        </li>
        <li className="flex">
          <button
            type="button"
            aria-current="page"
            className="z-10 border border-canvas-300 bg-canvas-100 px-3 py-2 leading-tight text-gray-600 hover:bg-canvas-200 hover:text-gray-700 dark:border-canvas-700 dark:bg-canvas-700 dark:text-white"
          >
            3
          </button>
        </li>
        <li className="flex">
          <button
            type="button"
            className="border border-canvas-300 bg-white px-3 py-2 leading-tight text-gray-500 hover:bg-canvas-100 hover:text-gray-700 dark:border-canvas-700 dark:bg-canvas-800 dark:text-gray-400 dark:hover:bg-canvas-700 dark:hover:text-white"
          >
            ...
          </button>
        </li>
        <li className="flex">
          <button
            type="button"
            className="border border-canvas-300 bg-white px-3 py-2 leading-tight text-gray-500 hover:bg-canvas-100 hover:text-gray-700 dark:border-canvas-700 dark:bg-canvas-800 dark:text-gray-400 dark:hover:bg-canvas-700 dark:hover:text-white"
          >
            100
          </button>
        </li>
        <li className="flex">
          <button
            type="button"
            className="border border-canvas-300 bg-white px-3 py-2 leading-tight text-gray-500 hover:bg-canvas-100 hover:text-gray-700 dark:border-canvas-700 dark:bg-canvas-800 dark:text-gray-400 dark:hover:bg-canvas-700 dark:hover:text-white"
            onClick={() => {
              onPageChange((data.meta.currentPage as number) + 1)
            }}
            disabled={data.meta.currentPage === last}
          >
            <span className="sr-only">Next</span>
            <svg
              className="h-5 w-5"
              aria-hidden="true"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                clipRule="evenodd"
              />
            </svg>
          </button>
        </li>
        <li className="flex">
          <button
            type="button"
            className="flex rounded-r-md border border-canvas-300 bg-white px-2 py-2 leading-tight text-gray-500 hover:bg-canvas-100 hover:text-gray-700 dark:border-canvas-700 dark:bg-canvas-800 dark:text-gray-400 dark:hover:bg-canvas-700 dark:hover:text-white"
            onClick={() => {
              onPageChange(last)
            }}
            disabled={data.meta.currentPage === last}
          >
            <span className="sr-only">Last</span>
            <svg
              className="-mr-2 h-5 w-5"
              aria-hidden="true"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                clipRule="evenodd"
              />
            </svg>
            <svg
              className="h-5 w-5"
              aria-hidden="true"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                clipRule="evenodd"
              />
            </svg>
          </button>
        </li>
      </ul>
    </nav>
  )
}

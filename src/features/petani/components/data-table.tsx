import { useState } from 'react'
import { Link } from '@tanstack/react-router'
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  SortingState,
  useReactTable,
} from '@tanstack/react-table'
import {
  IconSortAscending,
  IconSortAZ,
  IconSortDescending,
} from '@tabler/icons-react'
import { Route } from '@/routes/_authenticated/petani'
import { useFilters } from '@/hooks/useFilters'
import { Button } from '@/components/ui/button'
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
} from '@/components/ui/pagination'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import DebouncedInput from './DebouncedInput'
import { stateToSortBy } from '@/lib/utils'

export const DEFAULT_PAGE_INDEX = 0
export const DEFAULT_PAGE_SIZE = 10

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[]
  data: TData[]
  total: number
}

export function DataTable<TData, TValue>({
  columns,
  data,
  total,
}: DataTableProps<TData, TValue>) {
  const { filters, setFilters } = useFilters(Route.id)
  const [row, setRow] = useState<string>('10')
  const [localSorting, setLocalSorting] = useState<SortingState>([])

  const table = useReactTable({
    data,
    columns,
    manualFiltering: true,
    manualSorting: true,
    state: {
      sorting: localSorting,
    },
    onSortingChange: (updater) => {
      // Method 1: Get the new sorting state
      const newSorting =
        typeof updater === 'function' ? updater(localSorting) : updater
      setLocalSorting(newSorting)

      setFilters({ sortBy: stateToSortBy(newSorting) })
    },
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
  })

  // on change row
  const handleChangeRow = (val: string) => {
    setRow(val)
    setFilters({
      limit: Number(val),
    })
  }

  return (
    <div>
      {/* Header Table */}
      <DebouncedInput
        value={filters.search || ''}
        placeholder='Cari..'
        onChange={(val) => setFilters({ search: val })}
      />

      {/* Table */}
      <div className='rounded-md border'>
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead
                      key={header.id}
                      className={
                        header.column.getCanSort()
                          ? 'cursor-pointer select-none'
                          : ''
                      }
                      onClick={
                        header.column.getCanSort()
                          ? header.column.getToggleSortingHandler()
                          : undefined
                      }
                    >
                      <div className='flex items-center gap-1'>
                        {header.isPlaceholder
                          ? null
                          : flexRender(
                              header.column.columnDef.header,
                              header.getContext()
                            )}

                        {header.column.getCanSort() &&
                          (() => {
                            const sorted = header.column.getIsSorted()
                            if (sorted === 'asc') return <IconSortAscending />
                            if (sorted === 'desc') return <IconSortDescending />
                            return <IconSortAZ />
                          })()}
                      </div>
                    </TableHead>
                  )
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && 'selected'}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className='h-24 text-center'
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      {/* Pagination */}
      <div className='mt-7 mb-5 flex justify-between'>
        <div className='flex w-full items-center gap-2 text-sm lg:w-1/3'>
          <p>Items</p>
          <Select
            value={row}
            defaultValue='10'
            onValueChange={(e) => handleChangeRow(e)}
          >
            <SelectTrigger className='w-fit'>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value='10' defaultChecked>
                10
              </SelectItem>
              <SelectItem value='20'>20</SelectItem>
              <SelectItem value='50'>50</SelectItem>
            </SelectContent>
            <p>per Page</p>
          </Select>
        </div>
        <div className='flex w-full items-center justify-center text-sm lg:w-1/3'>
          {total} items total
        </div>
        <Pagination className='w-full justify-end lg:w-1/3'>
          <PaginationContent>
            {/* <PaginationItem>
                  <PaginationPrevious
                    href='#'
                    onClick={() => handleChangePage(currentPage - 1)}
                  />
                </PaginationItem> */}

            {Array.from({ length: total }).map((_, i) => {
              if (i < 5)
                return (
                  <PaginationItem key={i}>
                    <Link
                      to='/petani'
                      search={(prev) => ({
                        ...prev,
                        page: i + 1,
                      })}
                    >
                      <Button
                        size={'icon'}
                        variant={
                          filters?.page
                            ? filters.page == i + 1
                              ? 'default'
                              : 'outline'
                            : i + 1 == 1
                              ? 'default'
                              : 'outline'
                        }
                      >
                        {i + 1}
                      </Button>
                    </Link>
                  </PaginationItem>
                )
            })}

            <PaginationEllipsis />

            {/* <PaginationItem>
                  <PaginationNext
                    href='#'
                    onClick={() => handleChangePage(currentPage + 1)}
                  />
                </PaginationItem> */}
          </PaginationContent>
        </Pagination>
      </div>
    </div>
  )
}

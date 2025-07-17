import React from 'react'
import { Skeleton } from '@/components/ui/skeleton'
import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
} from '@/components/ui/table'

const SkeletonPage: React.FC = () => {
  return (
    <div className='-mx-4 flex-1 overflow-x-hidden px-4 py-1 lg:flex-row lg:space-y-0 lg:space-x-12'>
      <Table>
        <TableHeader>
          <TableRow>
            <TableCell className='w-[70px]'>
              <Skeleton className='bg-secondary h-[35px]' />
            </TableCell>
            <TableCell className='w-[200px]'>
              <Skeleton className='bg-secondary h-[35px]' />
            </TableCell>
            <TableCell>
              <Skeleton className='bg-secondary h-[35px]' />
            </TableCell>
            <TableCell className='w-[250px]'>
              <Skeleton className='bg-secondary h-[35px]' />
            </TableCell>
          </TableRow>
        </TableHeader>
        <TableBody>
          {Array.from({ length: 8 }).map((_, i) => (
            <TableRow key={i}>
              <TableCell className=''>
                <Skeleton className='bg-secondary h-[35px]' />
              </TableCell>
              <TableCell className='w-[200px]'>
                <Skeleton className='bg-secondary h-[35px]' />
              </TableCell>
              <TableCell>
                <Skeleton className='bg-secondary h-[35px]' />
              </TableCell>
              <TableCell>
                <Skeleton className='bg-secondary h-[35px]' />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <div className='my-4 grid w-full grid-cols-2 gap-3 lg:grid-cols-5'></div>
      <div className='flex w-full justify-between'>
        <Skeleton className='h-[35px] w-[200px]' />
        <Skeleton className='h-[35px] w-[200px]' />
      </div>
    </div>
  )
}

export default SkeletonPage

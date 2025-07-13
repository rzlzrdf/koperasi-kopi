import { Link } from '@tanstack/react-router'
import { Route } from '@/routes/_authenticated/petani'
import { useFilters } from '@/hooks/useFilters'
import { Button } from '@/components/ui/button'
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  // PaginationNext,
  // PaginationPrevious,
} from '@/components/ui/pagination'
import { Header } from '@/components/layout/header'
import { Main } from '@/components/layout/main'
import { Search } from '@/components/search'
import { ThemeSwitch } from '@/components/theme-switch'
import SkeletonPage from './components/SkeletonPage'
import PetaniProvider from './context/petani-context'
import { usePetanis } from './hooks'

export default function Users() {
  const { filters } = useFilters(Route.id)

  // custom hooks for get all petani
  const { data, isLoading, isError } = usePetanis(filters)

  if (isLoading) return <SkeletonPage />

  return (
    <PetaniProvider>
      <Header fixed>
        <Search />
        <div className='ml-auto flex items-center space-x-4'>
          <ThemeSwitch />
          {/* <ProfileDropdown /> */}
        </div>
      </Header>

      <Main>
        <div className='mb-2 flex flex-wrap items-center justify-between space-y-2'>
          <div>
            <h2 className='text-2xl font-bold tracking-tight'>Petani</h2>
            <p className='text-muted-foreground'>
              Manage your users and their roles here.
            </p>
          </div>
        </div>
        <div className='-mx-4 flex-1 overflow-auto px-4 py-1 lg:flex-row lg:space-y-0 lg:space-x-12'>
          {!isError ? (
            data?.users.map((item) => <p key={item.id}>{item.firstName}</p>)
          ) : (
            <p>Data belum ada</p>
          )}
        </div>
        <div className=''>
          {
            <Pagination className='justify-end'>
              <PaginationContent>
                {/* <PaginationItem>
                  <PaginationPrevious
                    href='#'
                    onClick={() => handleChangePage(currentPage - 1)}
                  />
                </PaginationItem> */}

                {Array.from({ length: data?.total || 1 }).map((_, i) => {
                  if (i < 5)
                    return (
                      <PaginationItem key={i}>
                        <Button
                          size={'icon'}
                          variant={
                            filters?.page
                              ? filters.page == i + 1
                                ? 'default'
                                : 'outline'
                              : i+1 == 1
                                ? 'default'
                                : 'outline'
                          }
                        >
                          <Link
                            to='/petani'
                            search={(prev) => ({
                              ...prev,
                              page: i + 1,
                            })}
                          >
                            {i + 1}
                          </Link>
                        </Button>
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
          }
        </div>
      </Main>
    </PetaniProvider>
  )
}

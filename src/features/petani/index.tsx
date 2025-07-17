import { Route } from '@/routes/_authenticated/petani'
import { useFilters } from '@/hooks/useFilters'
import { Header } from '@/components/layout/header'
import { Main } from '@/components/layout/main'
import { Search } from '@/components/search'
import { ThemeSwitch } from '@/components/theme-switch'
import SkeletonPage from './components/SkeletonPage'
import { columns } from './components/column'
import { DataTable } from './components/data-table'
import PetaniProvider from './context/petani-context'
import { usePetanis } from './hooks'

export default function Users() {
  const { filters } = useFilters(Route.id)

  // custom hooks for get all petani
  const { data, isLoading } = usePetanis(filters)

  return (
    <PetaniProvider>
      <Header fixed>
        <Search />
        <div className='ml-auto flex items-center space-x-4'>
          <ThemeSwitch />
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
        {isLoading ? (
          <SkeletonPage />
        ) : (
          <DataTable
            columns={columns}
            data={data?.users || []}
            total={data?.total || 0}
          />
        )}
      </Main>
    </PetaniProvider>
  )
}

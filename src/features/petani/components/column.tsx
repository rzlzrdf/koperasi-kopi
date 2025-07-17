import { ColumnDef } from '@tanstack/react-table'
import { Checkbox } from '@/components/ui/checkbox'

export interface Petani {
  id: number
  firstName: string
  lastName: string
  maidenName: string
  age: number
  gender: string
  email: string
  phone: string
  username: string
  image: string
  bloodGroup: string
  height: 193.31
  address: {
    address: string
    city: string
    state: 'Pennsylvania'
    stateCode: string
    postalCode: string
    coordinates: {
      lat: number
      lng: number
    }
    country: string
  }
}

export const columns: ColumnDef<Petani>[] = [
  {
    id: 'actoin',
    enableSorting: false,
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomeColumnsPinned() && 'indeterminate')
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label='select-all'
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(val) => row.toggleSelected(!!val)}
      />
    ),
  },
  {
    accessorKey: 'id',
    header: 'No.',
    enableSorting: false
  },
  {
    accessorKey: 'firstName',
    header: 'Name',
    enableSorting: true,
    cell: ({ row }) => {
      const { firstName, lastName } = row.original
      return (
        <div>
          {firstName} {lastName}
        </div>
      )
    },
  },
  {
    accessorKey: 'address',
    enableSorting: false,
    header: 'Lahan',
    cell: ({ row }) => {
      const { address, city, country } = row.original.address
      return (
        <div>
          📍 {address} {city} {country}
        </div>
      )
    },
  },
  {
    accessorKey: 'phone',
    enableSorting: false,
    header: 'Telepon',
    cell: ({ row }) => {
      const { phone } = row.original
      return <div>📞 {phone}</div>
    },
  },
]

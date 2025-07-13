import { keepPreviousData, useQuery } from '@tanstack/react-query'
import { getAllPetani, Petani } from '@/lib/masters/petani'
import { PaginatedResponse } from '@/lib/utils'

export type Parameter = {
  page?: number
  limit?: number
}

export const usePetanis = (filters: Parameter) => {
  return useQuery<PaginatedResponse<Petani>>({
    queryKey: ['petanis', filters],
    queryFn: () => getAllPetani(filters),
    placeholderData: keepPreviousData,
  })
}

import { keepPreviousData, useQuery } from '@tanstack/react-query'
import { getAllPetani } from '@/lib/masters/petani'
import { PaginatedResponse } from '@/lib/utils'
import { Petani } from '../components/column'

export type Parameter = {
  page?: number
  limit?: number
  search?: string;
}

export const usePetanis = (filters: Parameter) => {
  return useQuery<PaginatedResponse<Petani>>({
    queryKey: ['petanis', filters],
    queryFn: () => getAllPetani(filters),
    placeholderData: keepPreviousData,
  })
}

import { SortingState } from '@tanstack/react-table'
import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

export const DEFAULT_PAGE_INDEX = 1,
  DEFAULT_PAGE_SIZE = 10

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export async function fetchWithAuth(url: string, token?: string) {
  const res = await fetch(url, {
    headers: token ? { Authorization: `Bearer ${token}` } : {},
  })
  if (!res.ok) throw new Error('Network response was not ok')
  return res.json()
}


export interface PaginatedResponse<T> {
  users: T[]
   limit: number
  skip: number
  total: number
}

export const cleanEmptyParams = <T extends Record<string, unknown>>(
  search: T
) => {
  const newSearch = { ...search }
  Object.keys(newSearch).forEach((key) => {
    const value = newSearch[key]
    if (
      value === undefined ||
      value === '' ||
      (typeof value === 'number' && isNaN(value))
    )
      delete newSearch[key]
  })

  if (search.pageIndex === DEFAULT_PAGE_INDEX) delete newSearch.pageIndex
  if (search.pageSize === DEFAULT_PAGE_SIZE) delete newSearch.pageSize

  return newSearch
}
export type PaginationParams = { pageIndex: number; pageSize: number };
export type SortParams = { sortBy: `${string}.${"asc" | "desc"}` }

export type Filters<T> = Partial<T & PaginationParams & SortParams>;
export const stateToSortBy = (sorting: SortingState | undefined) => {
  if (!sorting || sorting.length == 0) return undefined;

  const sort = sorting[0];

  return `${sort.id}.${sort.desc ? "desc" : "asc"}` as const;
};

export const sortByToState = (sortBy: SortParams["sortBy"] | undefined) => {
  if (!sortBy) return [];

  const [id, desc] = sortBy.split(".");
  return [{ id, desc: desc === "desc" }];
};

import axios from 'axios'
import Cookies from 'js-cookie'
import { Parameter } from '@/features/petani/hooks'

export const getAllPetani = async (filters: Parameter) => {
  const { limit, page, search, sortBy: arrSortBy } = filters
  const sortParam = arrSortBy // e.g., "firstName.desc"
  const [sortBy, order] = sortParam?.split('.') ?? []

  const tokenString = Cookies.get('user')
  const token = tokenString && JSON.parse(tokenString).token

  const res = await axios({
    method: 'GET',
    url: `https://dummyjson.com/users/search`,
    params: {
      // limit: limit || 10,
      // skip: ((page || 1) - 1) * (limit || 10),
      // q: search
      ...(search
        ? {
            q: search,
            limit: 10,
            skip: 0,
          }
        : {
            limit: limit || 10,
            skip: ((page || 1) - 1) * (limit || 10),
            sortBy: sortBy, // "firstName"
            order: order,
          }),
    },
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })

  if (res.status != 200) {
    throw new Error('Cant get data, Petani')
  }

  return res.data
}

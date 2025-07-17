import axios from 'axios'
import Cookies from 'js-cookie'
import { Parameter } from '@/features/petani/hooks'


export const getAllPetani = async (filters:Parameter) => {
  const {limit, page, search} =filters

  const tokenString = Cookies.get('user')
  const token = tokenString && JSON.parse(tokenString).token

  // console.log(filters)
  const res = await axios({
    method: 'GET',
    url: `https://dummyjson.com/users`,
    params: {
      limit: limit || 10,
      skip: ((page || 1) - 1) * (limit || 10),
      q: search!
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

import axios from 'axios'
import Cookies from 'js-cookie'
import { Parameter } from '@/features/petani/hooks'

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

export const getAllPetani = async (filters:Parameter) => {
  // const {limit, page} = filters.filters
  // eslint-disable-next-line no-console
  const {limit, page} =filters

  const tokenString = Cookies.get('user')
  const token = tokenString && JSON.parse(tokenString).token

  // console.log(filters)
  const res = await axios({
    method: 'GET',
    url: `https://dummyjson.com/users`,
    params: {
      limit: limit || 10,
      skip: ((page || 1) - 1) * (limit || 10),
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

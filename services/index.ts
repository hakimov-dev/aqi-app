import { api } from '@/api'

export function getIP() : object{
   return api.get(`${process.env.GET_IP_API}`)
}
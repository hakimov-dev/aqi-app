import { api } from '@/api'

export function getIP() : object{
   return api.get(`${process.env.NUXT_ENV_GET_IP_API}`)
}
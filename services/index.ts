import { api } from '@/api'


export function getIP(){
   return api.get(`${process.env.NUXT_ENV_GET_IP_API}`)
}

export function getAbout(ip: string){
    return api.get(`${process.env.NUXT_ENV_GET_IP_INFO}${ip}/json`)
}

export function getAQI(city: String){
    return api.get(`${process.env.NUXT_ENV_GET_AQI}${city}`)
}
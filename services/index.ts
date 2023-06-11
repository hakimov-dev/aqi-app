import axios from 'axios'

export function getIP(){
   return axios.get(`${process.env.GET_IP_API}`)
}
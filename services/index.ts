import axios from 'axios'

export function getIP() : object{
   return axios.get(`${process.env.GET_IP_API}`)
}
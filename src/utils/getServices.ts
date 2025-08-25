import { api } from "@/libs/axios";

export interface Service {
    
    id: string
    name: string
    price: number
    status: 'ACTIVE' | 'INACTIVE'

}

export async function getServices() {

    const res = await api.get('/services')

    return res.data.services
}
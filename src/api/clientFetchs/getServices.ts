import { api } from "@/libs/axios";



export async function getServices() {

    const res = await api.get('/services')

    return res.data.services
}
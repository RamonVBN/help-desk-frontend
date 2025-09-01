import { api } from "@/libs/axios"

export async function getCalleds(){

    const res = await api.get('/calleds')

    const calleds = res.data.calleds

    return calleds
}
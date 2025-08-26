import { api } from "@/libs/axios";

export interface Client {
    id: string
    name: string
    email: string
    imageUrl: string

}[]

export async function getClients() {

    const res = await api.get('/users/?role=CLIENT')

    const clients = res.data.users

    return clients
}
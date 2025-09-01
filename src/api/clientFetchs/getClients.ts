import { api } from "@/libs/axios";

export async function getClients() {

    const res = await api.get('/users/?role=CLIENT')

    const clients = res.data.users

    return clients
}
import { api } from "@/libs/axios";

export async function getTechnicians() {

    const res = await api.get('/users/?role=TECHNICIAN')

    const technicians = res.data.users

    return technicians
}
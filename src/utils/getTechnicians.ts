import { api } from "@/libs/axios";

export interface Technician {
    id: string
    name: string
    email: string
    imageUrl: string
    technician: {
        availableHours: string[]
    }

}[]

export async function getTechnicians() {

    const res = await api.get('/users/?role=TECHNICIAN')

    const technicians = res.data.users

    return technicians
}
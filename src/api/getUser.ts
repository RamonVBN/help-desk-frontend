import { api } from "@/libs/axios"

export interface User {
    id: string
    name: string
    email: string
    role: 'ADMIN' | 'TECHNICIAN' | 'CLIENT'
    imageUrl: string
    availableHours: string[]
}

export async function getUser() {
    const res = await api.get('/users/me', {
    })

    const user = res.data.user

    return user
}
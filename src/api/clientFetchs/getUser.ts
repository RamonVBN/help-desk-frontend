import { api } from "@/libs/axios"

export async function getUser() {
    const res = await api.get('/users/me', {
    })

    const user = res.data.user

    return user
}
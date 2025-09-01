import { api } from "@/libs/axios"

export interface Called {

    id: string
    title: string
    description: string
    status: 'OPEN' |  'PROGRESS' | 'CLOSED'
    createdAt: string
    updatedAt: string
    service: {
        id: string
        name: string
        price: number
        status: string
    }
    client: {
        id: string
        name: string
        email: string
        imageUrl: string
    }

    technician: {
        id: string
        name: string
        email: string
        imageUrl: string
    }

    additionalServices: {
        id: string
        description: string
        price: number
    }[]
}

export async function getCalleds(){

    const res = await api.get('/calleds')

    const calleds = res.data.calleds

    return calleds
}
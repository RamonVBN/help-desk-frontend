'use client'
import { TechCalleds } from "@/components/techCalleds"
import { ClientCalleds } from "@/components/clientCalleds"
import { AdminCalleds } from "@/components/adminCalleds"

import { useQuery } from "@tanstack/react-query"
import { getUser, User } from "@/api/getUser"


export default function Calleds() {

    const {data: user} = useQuery<User>({
        queryKey: ['user'],
        queryFn: getUser
    })

    if (user?.role === 'ADMIN') {

        return (
            <AdminCalleds />
        )
    }

    if (user?.role === 'TECHNICIAN') {
        return (
            <TechCalleds />
        )
    }

    if (user?.role === 'CLIENT') {
        return (
            <ClientCalleds />
        )
    }
}
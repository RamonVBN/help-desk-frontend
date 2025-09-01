
import { ClientCalleds } from "@/components/pages/calledsPages/clientCalleds"
import { AdminCalleds } from "@/components/pages/calledsPages/adminCalleds"

import { cookies } from "next/headers";
import { TechCalleds } from "@/components/pages/calledsPages/techCalleds";
import { getToken } from "@/api/getToken";

async function getUserServer() {
    
    const token = await getToken()

    const res = await fetch("http://localhost:3333/users/me", {
        cache: 'no-store',
        headers: {
            Cookie: `${token?.name}=${token?.value}`
        }  
    })

    const body = await res.json()
    return body.user
}

async function getCalledsServer(){

    const token = await getToken()

    const res = await fetch("http://localhost:3333/calleds", {
        cache: 'no-store',
        headers: {
            Cookie: `${token?.name}=${token?.value}`
        }  
    })

    const body = await res.json()

    return body.calleds
}

export default async function Calleds() {

    const user = await getUserServer()

    const calleds = await getCalledsServer()

    if (user.role === 'ADMIN') {

        return (
            <AdminCalleds initialCalledsData={calleds}/>
        )
    }

    if (user.role === 'TECHNICIAN') {
        return (
            <TechCalleds initialCalledsData={calleds}/>
        )
    }

    if (user.role === 'CLIENT') {
        return (
            <ClientCalleds initialCalledsData={calleds}/>
        )
    }
}
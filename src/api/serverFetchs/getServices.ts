import { getToken } from "../utils/getToken"

export async function getServicesServer(){

    const token = await getToken()

    const res = await fetch('http://localhost:3333/services', {
        headers: {
            Cookie: `${token?.name}=${token?.value}`
        }
    })

    const data = await res.json()

    return data.services
}
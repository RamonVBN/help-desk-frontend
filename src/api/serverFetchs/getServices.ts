import { getToken } from "../utils/getToken"

export async function getServicesServer(){

    const token = await getToken()

    const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/services`, {
        headers: {
            Cookie: `${token?.name}=${token?.value}`
        }
    })

    const data = await res.json()

    return data.services
}
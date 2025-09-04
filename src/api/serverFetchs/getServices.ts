import { getToken } from "../utils/getToken"

export async function getServicesServer() {

    const token = await getToken()

    const baseUrl = process.env.NEXT_PUBLIC_FRONTEND_URL
    const res = await fetch(`${baseUrl}/api/services`, {
        headers: {
            Cookie: `${token?.name}=${token?.value}`
        }
    })

    const data = await res.json()

    return data.services
}
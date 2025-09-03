import { getToken } from "../utils/getToken"

export async function getServicesServer(){

    const token = await getToken()

    const res = await fetch(`https://help-desk-frontend-seven.vercel.app/api/services`, {
        headers: {
            Cookie: `${token?.name}=${token?.value}`
        }
    })

    const data = await res.json()

    return data.services
}
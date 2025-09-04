import { getToken } from "../utils/getToken"

export async function getUserServer() {
    
    const token = await getToken()

    const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/users/me`, {
        cache: 'no-store',
        headers: {
            Cookie: `${token?.name}=${token?.value}`
        }  
    })

    const body = await res.json()
    return body.user
}

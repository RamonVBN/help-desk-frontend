import { getToken } from "../utils/getToken"

export async function getUserServer() {
    
    const token = await getToken()

    const res = await fetch(`https://help-desk-frontend-seven.vercel.app/api/users/me`, {
        cache: 'no-store',
        headers: {
            Cookie: `${token?.name}=${token?.value}`
        }  
    })

    const body = await res.json()
    return body.user
}

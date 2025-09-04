import { getToken } from "../utils/getToken"

export async function getUserServer() {

    const token = await getToken()

    const baseUrl = process.env.NEXT_PUBLIC_FRONTEND_URL
    const res = await fetch(`${baseUrl}/api/users/me`, {
        cache: 'no-store',
        headers: {
            Cookie: `${token?.name}=${token?.value}`
        }
    })

    const body = await res.json()
    return body.user
}

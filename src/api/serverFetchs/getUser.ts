import { getToken } from "../utils/getToken"
import { adminUser } from "@/mocks/users"

export async function getUserServer() {

    if (process.env.E2E_MOCKS === 'enabled') {
        return adminUser
    }

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

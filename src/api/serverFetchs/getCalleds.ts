import { getToken } from "../utils/getToken"

export async function getCalledsServer() {

    const token = await getToken()

    const baseUrl = process.env.NEXT_PUBLIC_FRONTEND_URL
    const res = await fetch(`${baseUrl}/api/calleds`, {
        next: {
            revalidate: 60
        },
        headers: {
            Cookie: `${token?.name}=${token?.value}`
        }
    })

    const body = await res.json()

    return body.calleds
}
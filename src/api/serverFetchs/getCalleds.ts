import { getToken } from "../utils/getToken"

export async function getCalledsServer(){

    const token = await getToken()

    const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/calleds`, {
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
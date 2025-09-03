import { getToken } from "../utils/getToken"

export async function getCalledsServer(){

    const token = await getToken()

    const res = await fetch(`https://help-desk-frontend-seven.vercel.app/api/calleds`, {
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
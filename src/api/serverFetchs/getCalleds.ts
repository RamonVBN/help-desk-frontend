import { getToken } from "../utils/getToken"

export async function getCalledsServer(){

    const token = await getToken()

    const res = await fetch(`http://localhost:3000/api/calleds`, {
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
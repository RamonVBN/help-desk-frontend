import { getToken } from "../utils/getToken"

export async function getCalledsServer(){

    const token = await getToken()

    const res = await fetch("http://localhost:3333/calleds", {
        cache: 'no-store',
        headers: {
            Cookie: `${token?.name}=${token?.value}`
        }  
    })

    const body = await res.json()

    return body.calleds
}
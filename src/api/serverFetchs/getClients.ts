import { getToken } from "../utils/getToken"

export async function getClientsServer(){

    const token = await getToken()

    const res = await fetch(`https://help-desk-frontend-seven.vercel.app/api/users?role=CLIENT`, {
        headers: {
            Cookie: `${token?.name}=${token?.value}`
        }
    })

    const data = await res.json()

    return data.users
}
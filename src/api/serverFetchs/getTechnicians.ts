import { getToken } from "../utils/getToken"

export async function getTechniciansServer(){

    const token = await getToken()

    const res = await fetch(`https://help-desk-frontend-seven.vercel.app/api/users?role=TECHNICIAN`, {
        headers: {
            Cookie: `${token?.name}=${token?.value}`
        }
    })

    const data = await res.json()

    return data.users
}
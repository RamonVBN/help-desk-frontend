import { getToken } from "../utils/getToken"

export async function getTechniciansServer(){

    const token = await getToken()

    const res = await fetch('http://localhost:3333/users?role=TECHNICIAN', {
        headers: {
            Cookie: `${token?.name}=${token?.value}`
        }
    })

    const data = await res.json()

    return data.users
}
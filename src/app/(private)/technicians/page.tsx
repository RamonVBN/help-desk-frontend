import { TechniciansTablePage } from "@/components/pages/techniciansPages/techniciansTablePage";
import { getToken } from "@/api/getToken";

async function getTechniciansServer(){

    const token = await getToken()

    const res = await fetch('http://localhost:3333/users?role=TECHNICIAN', {
        headers: {
            Cookie: `${token?.name}=${token?.value}`
        }
    })

    const data = await res.json()

    return data.users
}

export default async function Technicians() {

    const technicians = await getTechniciansServer()

    return (
        <TechniciansTablePage initialTechniciansData={technicians}/>
    )
}
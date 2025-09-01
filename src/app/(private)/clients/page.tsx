import { ClientsTablePage } from "@/components/pages/clientsPage/clientsTablePage";
import { getToken } from "@/api/getToken";

async function getClientsServer(){

    const token = await getToken()

    const res = await fetch('http://localhost:3333/users?role=CLIENT', {
        headers: {
            Cookie: `${token?.name}=${token?.value}`
        }
    })

    const data = await res.json()

    return data.users
}

export default async function Clients() {

    const clients = await getClientsServer()

    return (
        <div className="flex flex-col gap-4 md:gap-6 w-full">
            <h1 className="font-bold text-xl leading-[140%] text-blue-800">Clientes</h1>
            <ClientsTablePage initialClientsData={clients}/>
        </div>
    )
}
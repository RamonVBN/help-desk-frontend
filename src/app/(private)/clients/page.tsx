import { ClientsTablePage } from "@/components/pages/clientsPage/clientsTablePage";
import { getClientsServer } from "@/api/serverFetchs/getClients";

export default async function Clients() {

    const clients = await getClientsServer()

    return (
        <div className="flex flex-col gap-4 md:gap-6 w-full">
            <h1 className="font-bold text-xl leading-[140%] text-blue-800">Clientes</h1>
            <ClientsTablePage initialClientsData={clients}/>
        </div>
    )
}
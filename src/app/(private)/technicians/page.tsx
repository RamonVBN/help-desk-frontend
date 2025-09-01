import { getTechniciansServer } from "@/api/serverFetchs/getTechnicians";
import { TechniciansTablePage } from "@/components/pages/techniciansPages/techniciansTablePage";

export default async function Technicians() {

    const technicians = await getTechniciansServer()

    return (
        <TechniciansTablePage initialTechniciansData={technicians}/>
    )
}
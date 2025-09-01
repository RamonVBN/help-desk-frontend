import { ServicesPageTable } from "@/components/pages/servicesPage"
import { getServicesServer } from "@/api/serverFetchs/getServices"

export default async function Services() {

    const services = await getServicesServer()

    return (
       <ServicesPageTable initialServicesData={services}/>
    )
}
import { ServicesPageTable } from "@/components/pages/servicesPage"
import { getToken } from "@/api/getToken"

async function getServicesServer(){

    const token = await getToken()

    const res = await fetch('http://localhost:3333/services', {
        headers: {
            Cookie: `${token?.name}=${token?.value}`
        }
    })

    const data = await res.json()

    return data.services
}

export default async function Services() {

    const services = await getServicesServer()

    return (
       <ServicesPageTable initialServicesData={services}/>
    )
}
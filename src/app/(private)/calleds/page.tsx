import { ClientCalleds } from "@/components/pages/calledsPages/clientCalleds"
import { AdminCalleds } from "@/components/pages/calledsPages/adminCalleds"

import { TechCalleds } from "@/components/pages/calledsPages/techCalleds";
import { getUserServer } from "@/api/serverFetchs/getUser";
import { getCalledsServer } from "@/api/serverFetchs/getCalleds";


export default async function Calleds() {

    const user = await getUserServer()

    const calleds = await getCalledsServer()

    if (user.role === 'ADMIN') {

        return (
            <AdminCalleds initialCalledsData={calleds}/>
        )
    }

    if (user.role === 'TECHNICIAN') {
        return (
            <TechCalleds initialCalledsData={calleds}/>
        )
    }

    if (user.role === 'CLIENT') {
        return (
            <ClientCalleds initialCalledsData={calleds}/>
        )
    }
}
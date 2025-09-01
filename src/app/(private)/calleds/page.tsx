import { ClientCalleds } from "@/components/pages/calledsPages/clientCalleds"
import { AdminCalleds } from "@/components/pages/calledsPages/adminCalleds"

import { TechCalleds } from "@/components/pages/calledsPages/techCalleds";
import { getUserServer } from "@/api/serverFetchs/getUser";
import { getCalledsServer } from "@/api/serverFetchs/getCalleds";
import { Metadata } from "next";

const siteUrl = process.env.VERCEL_URL
    ? `https://${process.env.VERCEL_URL}`
    : "http://localhost:3333";

export const metadata: Metadata = {
  title: "Chamados",
  description:
    "Abra e acompanhe seus chamados de suporte de T.I de forma rápida, organizada e eficiente.",
  openGraph: {
    title: "Chamados | HelpDesk",
    description:
      "Abra e acompanhe seus chamados de suporte de T.I de forma rápida, organizada e eficiente.",
    url: `${siteUrl}/calleds`,
  },
  alternates: {
    canonical: `${siteUrl}/calleds`,
  },
};

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
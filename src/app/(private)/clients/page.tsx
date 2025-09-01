import { ClientsTablePage } from "@/components/pages/clientsPage/clientsTablePage";
import { getClientsServer } from "@/api/serverFetchs/getClients";
import { Metadata } from "next";

const siteUrl = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : "http://localhost:3333";

export const metadata: Metadata = {
  title: "Clientes",
  description:
    "Abra e gerencie seus clientes de forma rápida, organizada e eficiente.",
  openGraph: {
    title: "Clientes | HelpDesk",
    description:
      "Abra e gerencie seus clientes de forma rápida, organizada e eficiente.",
    url: `${siteUrl}/clients`,
  },
  alternates: {
    canonical: `${siteUrl}/clients`,
  },
};

export default async function Clients() {

  const clients = await getClientsServer()

  return (
    <div className="flex flex-col gap-4 md:gap-6 w-full">
      <h1 className="font-bold text-xl leading-[140%] text-blue-800">Clientes</h1>
      <ClientsTablePage initialClientsData={clients} />
    </div>
  )
}
import { getTechniciansServer } from "@/api/serverFetchs/getTechnicians";
import { TechniciansTablePage } from "@/components/pages/techniciansPages/techniciansTablePage";
import { Metadata } from "next";

const siteUrl = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : "http://localhost:3333"

export const metadata: Metadata = {
  title: "Técnicos",
  description:
    "Crie e gerencie contas de técnicos de forma rápida, organizada e eficiente.",
  openGraph: {
    title: "Técnicos | HelpDesk",
    description:
      "Crie e gerencie contas de técnicos de forma rápida, organizada e eficiente.",
    url: `${siteUrl}/technicians`,
  },
  alternates: {
    canonical: `${siteUrl}/technicians`,
  },
};

export default async function Technicians() {

    const technicians = await getTechniciansServer()

    return (
        <TechniciansTablePage initialTechniciansData={technicians}/>
    )
}
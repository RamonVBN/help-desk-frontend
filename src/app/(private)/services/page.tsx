import { ServicesPageTable } from "@/components/pages/servicesPage"
import { getServicesServer } from "@/api/serverFetchs/getServices"
import { Metadata } from "next";

const siteUrl = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : "http://localhost:3333";

export const metadata: Metadata = {
  title: "Serviços",
  description:
    "Crie e gerencie os serviços de forma rápida, organizada e eficiente.",
  openGraph: {
    title: "Serviços | HelpDesk",
    description:
      "Crie e gerencie os serviços de forma rápida, organizada e eficiente.",
    url: `${siteUrl}/services`,
  },
  alternates: {
    canonical: `${siteUrl}/services`,
  },
};

export default async function Services() {

    const services = await getServicesServer()

    return (
       <ServicesPageTable initialServicesData={services}/>
    )
}
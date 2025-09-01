import { TechnicianProfilePage } from "@/components/pages/techniciansPages/technicianProfilePage";
import { Metadata } from "next";

const siteUrl = process.env.VERCEL_URL
    ? `https://${process.env.VERCEL_URL}`
    : "http://localhost:3333";

export const metadata: Metadata = {
  title: "Novo técnico",
  description:
    "Crie novas contas de técnicos para aumentar a eficiência do suporte de T.I",
  openGraph: {
    title: "Novo técnico | HelpDesk",
    description:
      "Crie novas contas de técnicos para aumentar a eficiência do suporte de T.I",
    url: `${siteUrl}/technicians/new`,
  },
  alternates: {
    canonical: `${siteUrl}/technicians/new`,
  },
};

export default function CreateTechnicianPage(){

    return (
        <TechnicianProfilePage mode="create"/>
    )
}

import { NewCalledPage } from "@/components/pages/calledsPages/newCalledPage"
import { Metadata } from "next";

const siteUrl = process.env.VERCEL_URL
    ? `https://${process.env.VERCEL_URL}`
    : "http://localhost:3333";

export const metadata: Metadata = {
  title: "Novo chamado",
  description:
    "Crie chamados de suporte de T.I de forma rápida, organizada e eficiente.",
  openGraph: {
    title: "Novo chamado | HelpDesk",
    description:
      "Crie chamados de suporte de T.I de forma rápida, organizada e eficiente.",
    url: `${siteUrl}/calleds/new`,
  },
  alternates: {
    canonical: `${siteUrl}/calleds/new`,
  },
};

export default function NewCalled() {
    
    return (
        <NewCalledPage/>
    )
}
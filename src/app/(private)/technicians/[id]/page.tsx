import { User } from "@/api/types";
import { getToken } from "@/api/utils/getToken";
import { TechnicianProfilePage } from "@/components/pages/techniciansPages/technicianProfilePage";
import { Metadata } from "next";

type generateMetadataProps = { params: Promise<{ id: string }> };

export async function generateMetadata({ params }: generateMetadataProps): Promise<Metadata> {
    const siteUrl = process.env.VERCEL_URL
    ? `https://${process.env.VERCEL_URL}`
    : "http://localhost:3333";

  const { id } = await params

  const token = await getToken()

   // Pega dados da API

  const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/users/${id}`, {
    headers: {
        Cookie: `${token?.name}=${token?.value}`
    }
  })

  const data = await res.json()
  const techUser: User = data.user

  // Retorna um objeto do tipo Metadata
  return {
    title: techUser.name,
    description: `Detalhes do técnico ${techUser.name}: nome, email de contato e carga horária diária.`,
    openGraph: {
      title: techUser.name,
      description: `Detalhes do técnico ${techUser.name}: nome, email de contato e carga horária diária.`,
      url: `${siteUrl}/users/${id}`,
    },
    alternates: {
      canonical: `${siteUrl}/users/${id}`,
    },
  }
}

export default function TechnicianDetailsPage() {
    
    return (
        <TechnicianProfilePage mode="update"/>
    )
}
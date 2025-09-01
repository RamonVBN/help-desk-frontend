import { Called } from "@/api/types";
import { getToken } from "@/api/utils/getToken";
import { CalledDetailsPage } from "@/components/pages/calledsPages/calledDetaillsPage"
import { Metadata } from "next";

type generateMetadataProps = { params: Promise<{ id: string }> };

export async function generateMetadata({ params }: generateMetadataProps): Promise<Metadata> {
    const siteUrl = process.env.VERCEL_URL
    ? `https://${process.env.VERCEL_URL}`
    : "http://localhost:3333";

  const { id } = await params

  const token = await getToken()

   // Pega dados da API

  const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/calleds/${id}`, {
    headers: {
        Cookie: `${token?.name}=${token?.value}`
    }
  })

  const data = await res.json()
  const called: Called = data.called

  // Retorna um objeto do tipo Metadata
  return {
    title: called.title,
    description: called.description,
    openGraph: {
      title: called.title,
      description: called.description,
      url: `${siteUrl}/calleds/${id}`,
    },
    alternates: {
      canonical: `${siteUrl}/calleds/${id}`,
    },
  }
}

export default function CalledDetails() {

    return (
       <CalledDetailsPage/>
    )
}
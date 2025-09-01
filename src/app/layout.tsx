import type { Metadata } from "next";
import { QueryClientProviderWrapper } from "@/components/queryClientProviderWrapper";

import "./globals.css";

const siteUrl = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : "http://localhost:3333";

export const metadata: Metadata = {
  title: {
    default: "HelpDesk - Chamados Online",
    template: "%s | HelpDesk",
  },
  description:
    "Abra e acompanhe chamados de suporte de T.I com rapidez e praticidade. Soluções técnicas confiáveis para empresas e usuários.",
  keywords: [
    "suporte técnico",
    "chamados de TI",
    "help desk",
    "atendimento TI",
    "suporte de informática",
  ],
  openGraph: {
    type: "website",
    locale: "pt_BR",
    url: siteUrl,
    siteName: "HelpDesk",
    title: "HelpDesk - Chamados Online",
    description:
      "Abra e acompanhe chamados de suporte de T.I com rapidez e praticidade. Soluções técnicas confiáveis para empresas e usuários.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "HelpDesk - Chamados Online",
      },
    ],
  },
  alternates: {
    canonical: siteUrl,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  return (
    <html lang="pt-br">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin='anonymous' />
        <link href="https://fonts.googleapis.com/css2?family=Lato:ital,wght@0,100;0,300;0,400;0,700;0,900;1,100;1,300;1,400;1,700;1,900&display=swap" rel="stylesheet" />
      </head>
      <body className="font-sans">
        <QueryClientProviderWrapper>
          {children}
        </QueryClientProviderWrapper>
      </body>
    </html>
  );
}

import { NextRequest, NextResponse } from "next/server";

const BACKEND_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

export async function GET(req: NextRequest, { params }: { params: Promise<{ path: string[] }>}) {
  return handleProxy(req, params);
}

export async function POST(req: NextRequest, { params }: { params: Promise<{ path: string[] }> }) {
  return handleProxy(req, params);
}

export async function PUT(req: NextRequest, { params }: { params: Promise<{ path: string[] }> }) {
  return handleProxy(req, params);
}

export async function DELETE(req: NextRequest, { params }: { params: Promise<{ path: string[] }> }) {
  return handleProxy(req, params);
}

export async function PATCH(req: NextRequest, { params }: { params: Promise<{ path: string[] }> }) {
  return handleProxy(req, params);
}

// Função central de proxy

async function handleProxy(req: NextRequest, params: Promise<{ path: string[] }>) {

  const { path: rootPath } = await params
  const path = rootPath.join("/");
  const targetUrl = `${BACKEND_URL}/${path.replace(/^api\//, "")}${req.nextUrl.search}`;

  let body: any = undefined;
  if (req.method !== "GET" && req.method !== "HEAD") {
    body = await req.text();
  }

  const backendRes = await fetch(targetUrl, {
    method: req.method,
    headers: {
      // Encaminha os headers originais, exceto o host
      ...Object.fromEntries(req.headers),
      host: undefined as any,
    },
    body,
    redirect: "manual",
  });

  // Copia a resposta
  
  const response = new NextResponse(backendRes.body, {
    status: backendRes.status,
    headers: backendRes.headers,
  });

  // Repassa os cookies
  const setCookie = backendRes.headers.get("set-cookie");
  if (setCookie) {
    response.headers.set("set-cookie", setCookie);
  }

  return response;
}

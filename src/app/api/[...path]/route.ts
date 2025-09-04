import { NextRequest, NextResponse } from "next/server";

const BACKEND_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

export async function GET(req: NextRequest, { params }: { params: Promise<{ path: string[] }> }) {
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
    body = await req.arrayBuffer()
  }

  const headers = new Headers(req.headers)
  headers.delete("host")

  const backendRes = await fetch(targetUrl, {
    method: req.method,
    headers,
    body,
  });

  const resHeaders = new Headers(backendRes.headers);

  return new Response(await backendRes.text(), {
    status: backendRes.status,
    headers: resHeaders,
  });
}

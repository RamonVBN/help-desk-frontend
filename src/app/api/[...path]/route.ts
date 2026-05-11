import { NextRequest, NextResponse } from "next/server";

const BACKEND_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

export async function GET(
  req: NextRequest,
  context: { params: Promise<{ path: string[] }> }
) {
  return handleProxy(req, context.params);
}

export async function POST(
  req: NextRequest,
  context: { params: Promise<{ path: string[] }> }
) {
  return handleProxy(req, context.params);
}

export async function PUT(
  req: NextRequest,
  context: { params: Promise<{ path: string[] }> }
) {
  return handleProxy(req, context.params);
}

export async function PATCH(
  req: NextRequest,
  context: { params: Promise<{ path: string[] }> }
) {
  return handleProxy(req, context.params);
}

export async function DELETE(
  req: NextRequest,
  context: { params: Promise<{ path: string[] }> }
) {
  return handleProxy(req, context.params);
}

async function handleProxy(
  req: NextRequest,
  paramsPromise: Promise<{ path: string[] }>
) {
  const { path } = await paramsPromise;

  const targetUrl =
    `${BACKEND_URL}/${path.join("/")}${req.nextUrl.search}`;

  const body =
    req.method === "GET" || req.method === "HEAD"
      ? undefined
      : await req.text();

  const headers = new Headers(req.headers);

  // Remove headers problemáticos
  headers.delete("host");
  headers.delete("content-length");

  const backendRes = await fetch(targetUrl, {
    method: req.method,
    headers,
    body,
    redirect: "manual",
  });

  const responseHeaders = new Headers();

  backendRes.headers.forEach((value, key) => {
    const lowerKey = key.toLowerCase();

    // Não repassar headers que podem quebrar a resposta
    if (
      lowerKey === "content-length" ||
      lowerKey === "content-encoding" ||
      lowerKey === "transfer-encoding" ||
      lowerKey === "connection"
    ) {
      return;
    }

    // Preserva cookies
    if (lowerKey === "set-cookie") {
      responseHeaders.append("set-cookie", value);
      return;
    }

    responseHeaders.set(key, value);
  });

  // Consome completamente a resposta
  const data = await backendRes.text();

  return new NextResponse(data, {
    status: backendRes.status,
    headers: responseHeaders,
  });
}
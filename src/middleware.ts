import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const publicRoutes = ["/sign-in", "/sign-up"];

const roleRoutes: Record<string, RegExp[]> = {
  ADMIN: [
    /^\/calleds$/,
    /^\/calleds\/(?!new$)[\w-]+$/,
    /^\/technicians$/,
    /^\/technicians\/(?!new$)[\w-]+$/,
    /^\/technicians\/new$/,
    /^\/clients$/,
    /^\/services$/,
  ],

  TECHNICIAN: [
    /^\/calleds$/,
    /^\/calleds\/(?!new$)[\w-]+$/,
  ],

  CLIENT: [
    /^\/calleds$/,
    /^\/calleds\/new$/,
    /^\/calleds\/[\w-]+$/,
  ],
};

const DEFAULT_AUTHENTICATED_ROUTE = "/calleds";
const REDIRECT_WHEN_NOT_AUTHENTICATED_ROUTE = "/sign-in";

function parseJwt(token: string) {
  try {
    const base64Payload = token.split(".")[1];

    const payload = atob(base64Payload);

    return JSON.parse(payload);
  } catch {
    return null;
  }
}

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  const token = req.cookies.get("access_token")?.value;

  // Home
  if (pathname === "/") {
    return NextResponse.redirect(
      new URL(
        token
          ? DEFAULT_AUTHENTICATED_ROUTE
          : REDIRECT_WHEN_NOT_AUTHENTICATED_ROUTE,
        req.url
      )
    );
  }

  // Não autenticado em rota privada
  if (!token && !publicRoutes.includes(pathname)) {
    return NextResponse.redirect(
      new URL(REDIRECT_WHEN_NOT_AUTHENTICATED_ROUTE, req.url)
    );
  }

  // Autenticado tentando acessar login/signup
  if (token && publicRoutes.includes(pathname)) {
    return NextResponse.redirect(
      new URL(DEFAULT_AUTHENTICATED_ROUTE, req.url)
    );
  }

  if (token) {
    const decoded = parseJwt(token);

    const role = decoded?.role;

    // Token inválido ou role inexistente
    if (!role || !roleRoutes[role]) {
      const response = NextResponse.redirect(
        new URL(REDIRECT_WHEN_NOT_AUTHENTICATED_ROUTE, req.url)
      );

      // remove cookie inválido
      response.cookies.delete("access_token");

      return response;
    }

    const isAllowed = roleRoutes[role].some((pattern) =>
      pattern.test(pathname)
    );

    if (!isAllowed) {
      return NextResponse.redirect(
        new URL(DEFAULT_AUTHENTICATED_ROUTE, req.url)
      );
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/",
    "/sign-in",
    "/sign-up",
    "/calleds/:path*",
    "/technicians/:path*",
    "/clients/:path*",
    "/services/:path*",
  ],
};
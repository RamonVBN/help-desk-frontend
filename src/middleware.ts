import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import jwt from "jsonwebtoken"

const publicRoutes = ['/sign-in', '/sign-up']

const roleRoutes: Record<string, RegExp[]> = {
  ADMIN: [
    /^\/calleds$/,                     // /calleds
    /^\/calleds\/(?!new$)[\w-]+$/,     // /calleds/:id (UUID, mas não "new")
    /^\/technicians$/,                 // /technicians
    /^\/technicians\/(?!new$)[\w-]+$/, // /technicians/:id
    /^\/technicians\/new$/,            // /technicians/new
    /^\/clients$/,                     // /clients
    /^\/services$/                     // /services
  ],
  TECHNICIAN: [
    /^\/calleds$/,                     // /calleds
    /^\/calleds\/(?!new$)[\w-]+$/      // /calleds/:id (UUID, mas não "new")
  ],
  CLIENT: [
    /^\/calleds$/,                     // /calleds
    /^\/calleds\/new$/,                // /calleds/new
    /^\/calleds\/[\w-]+$/              // /calleds/:id (UUID, incluindo letras e números)
  ]
}

const REDIRECT_WHEN_NOT_AUTHENTICATED_ROUTE = '/sign-in'

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl
  const token = req.cookies.get("access_token")?.value

  if (pathname === "/") {
    if (token) {
      // Usuário autenticado → redireciona para a primeira página "padrão"
      return NextResponse.redirect(new URL("/calleds", req.url))
    } else {
      // Não autenticado → redireciona para login
      return NextResponse.redirect(new URL(REDIRECT_WHEN_NOT_AUTHENTICATED_ROUTE, req.url))
    }
  }

  // Caso não autenticado e tentando acessar rota privada
  if (!token && !publicRoutes.includes(req.nextUrl.pathname)) {
    const redirectUrl = req.nextUrl.clone()
    redirectUrl.pathname = REDIRECT_WHEN_NOT_AUTHENTICATED_ROUTE
    return NextResponse.redirect(redirectUrl)
  }

  if (token) {
    try {
      const decoded = jwt.decode(token) as { role?: string }
      const role = decoded?.role

      // Bloqueia usuários logados de acessar rotas públicas
      if (publicRoutes.includes(req.nextUrl.pathname)) {
        const redirectUrl = req.nextUrl.clone()
        redirectUrl.pathname = "/"
        return NextResponse.redirect(redirectUrl)
      }

      // Verifica permissões da role
      if (role && roleRoutes[role]) {
        const isAllowed = roleRoutes[role].some((pattern) =>
          pattern.test(req.nextUrl.pathname)
        )

        if (!isAllowed) {
          const redirectUrl = req.nextUrl.clone()
          redirectUrl.pathname = "/calleds"
          return NextResponse.redirect(redirectUrl)
        }
      }
    } catch (err) {
      console.error("Erro ao decodificar token:", err)
      const redirectUrl = req.nextUrl.clone()
      redirectUrl.pathname = REDIRECT_WHEN_NOT_AUTHENTICATED_ROUTE
      return NextResponse.redirect(redirectUrl)
    }
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/((?!api|_next|favicon.ico|.*\\.(?:png|jpg|jpeg|svg|gif|webp|ico|css|js|woff2?|ttf)).*)'],
}
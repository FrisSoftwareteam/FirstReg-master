import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Public routes (no auth required)
  const publicRoutes = [
    "/login",
    "/auth/callback",
    "/auth/microsoft/redirect",
    "/api/auth/simulation-users",
    "/api/auth/simulate",
  ];

  const isPublic =
    publicRoutes.some((p) => pathname.startsWith(p)) ||
    pathname.startsWith("/_next") ||
    pathname === "/favicon.ico";

  if (isPublic) return NextResponse.next();

  const token = request.cookies.get("auth_token")?.value;
  if (!token) {
    const loginUrl = new URL("/login", request.url);
    loginUrl.searchParams.set("next", pathname);
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}

export const config = {
  // Protect everything except Next internals and specified public routes via negative lookahead
  matcher: [
    "/((?!_next|favicon.ico|auth/callback|auth/microsoft/redirect|login|api/auth/simulation-users|api/auth/simulate).*)",
  ],
};


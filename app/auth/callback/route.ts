import { NextResponse } from "next/server";

// Handles redirect from ProjectT-API after OAuth/simulated login
// Example: /auth/callback?token=...&token_type=Bearer
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const token = searchParams.get("token");
  const tokenType = searchParams.get("token_type") || "Bearer";
  const redirectTo =
    searchParams.get("redirect") ||
    process.env.NEXT_PUBLIC_POST_LOGIN_REDIRECT || "/";

  if (!token) {
    const url = new URL("/login", request.url);
    url.searchParams.set("error", "missing_token");
    return NextResponse.redirect(url);
  }

  const response = NextResponse.redirect(redirectTo);

  // Store token in an HTTP-only cookie for server-side access
  response.cookies.set("auth_token", `${tokenType} ${token}`, {
    httpOnly: true,
    secure: true,
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24 * 7, // 7 days
  });

  return response;
}


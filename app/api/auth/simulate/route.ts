import { NextResponse } from "next/server";
import { getApiBaseUrl } from "@/lib/api/serverFetch";

export async function POST(request: Request) {
  const api = getApiBaseUrl();

  const body = await request.json().catch(() => ({}));
  const email = (body as any)?.email as string | undefined;
  if (!email) {
    return NextResponse.json({ message: "email is required" }, { status: 400 });
  }

  try {
    const res = await fetch(`${api}/api/auth/simulate`, {
      method: "POST",
      headers: { "Content-Type": "application/json", Accept: "application/json" },
      body: JSON.stringify({ email }),
    });
    const data = await res.json().catch(() => ({}));

    if (res.ok && (data as any)?.token) {
      const tokenType = (data as any)?.token_type || "Bearer";
      const response = NextResponse.json({ success: true });
      response.cookies.set("auth_token", `${tokenType} ${(data as any).token}`, {
        httpOnly: true,
        secure: true,
        sameSite: "lax",
        path: "/",
        maxAge: 60 * 60 * 24 * 7,
      });
      return response;
    }

    return NextResponse.json(data || { message: "Login failed" }, { status: res.status || 500 });
  } catch {
    return NextResponse.json({ message: "Upstream error" }, { status: 502 });
  }
}


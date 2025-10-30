import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const api = (process.env.NEXT_PUBLIC_API_BASE_URL || "").replace(/\/$/, "");
  if (!api) {
    return NextResponse.json({ message: "API base URL not configured" }, { status: 500 });
  }

  const body = await request.json().catch(() => ({}));
  const email = body?.email as string | undefined;
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

    if (res.ok && data?.token) {
      const tokenType = data?.token_type || "Bearer";
      const response = NextResponse.json({ success: true });
      response.cookies.set("auth_token", `${tokenType} ${data.token}`, {
        httpOnly: true,
        secure: true,
        sameSite: "lax",
        path: "/",
        maxAge: 60 * 60 * 24 * 7,
      });
      return response;
    }

    return NextResponse.json(data || { message: "Login failed" }, { status: res.status || 500 });
  } catch (e) {
    return NextResponse.json({ message: "Upstream error" }, { status: 502 });
  }
}


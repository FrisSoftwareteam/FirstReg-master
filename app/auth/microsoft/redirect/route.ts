import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const api = (process.env.NEXT_PUBLIC_API_BASE_URL || "").replace(/\/$/, "");
  if (!api) {
    return NextResponse.json({ message: "API base URL not configured" }, { status: 500 });
  }

  try {
    const res = await fetch(`${api}/api/auth/microsoft/redirect`, {
      headers: { Accept: "application/json" },
    });
    const data = await res.json();
    const url = data?.redirect_url;
    if (!url) {
      return NextResponse.json({ message: "No redirect URL from API" }, { status: 502 });
    }
    return NextResponse.redirect(url);
  } catch {
    const url = new URL("/login", request.url);
    url.searchParams.set("error", "oauth_init_failed");
    return NextResponse.redirect(url);
  }
}


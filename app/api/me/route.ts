import { NextResponse } from "next/server";
import { apiFetch } from "@/lib/api/serverFetch";

export async function GET() {
  try {
    const res = await apiFetch("/api/user");
    const data = await res.json().catch(() => ({}));
    return NextResponse.json(data, { status: res.status });
  } catch (e) {
    return NextResponse.json({ message: "Upstream error" }, { status: 502 });
  }
}


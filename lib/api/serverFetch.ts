import { cookies } from "next/headers";

export function getApiBaseUrl() {
  const url = process.env.NEXT_PUBLIC_API_BASE_URL;
  if (!url) throw new Error("NEXT_PUBLIC_API_BASE_URL is not set");
  return url.replace(/\/$/, "");
}

// Server-side fetch that attaches Authorization from httpOnly cookie
export async function apiFetch(input: string, init: RequestInit = {}) {
  const base = getApiBaseUrl();
  const token = cookies().get("auth_token")?.value;

  const headers = new Headers(init.headers || {});
  headers.set("Accept", "application/json");
  if (token) headers.set("Authorization", token);

  const res = await fetch(`${base}${input.startsWith("/") ? "" : "/"}${input}` , {
    ...init,
    headers,
  });

  return res;
}


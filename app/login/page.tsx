"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

type SimUser = {
  id: number;
  email: string;
  first_name?: string;
  last_name?: string;
  department?: string;
};

export default function LoginPage() {
  const [users, setUsers] = useState<SimUser[]>([]);
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const load = async () => {
      try {
        const res = await fetch("/api/auth/simulation-users", { cache: "no-store" });
        const data = await res.json();
        if (res.ok && Array.isArray(data?.users)) {
          setUsers(data.users);
          if (data.users[0]?.email) setEmail(data.users[0].email);
        } else {
          setError(data?.message || "Failed to load users");
        }
      } catch (e) {
        setError("Failed to load users");
      }
    };
    load();
  }, []);

  const simulate = async () => {
    if (!email) return;
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/auth/simulate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      const data = await res.json();
      if (res.ok) {
        window.location.href = "/";
      } else {
        setError(data?.message || "Login failed");
      }
    } catch (e) {
      setError("Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-[60vh] items-center justify-center p-6">
      <div className="w-full max-w-md space-y-6">
        <h1 className="text-2xl font-semibold">Sign in</h1>

        <div className="space-y-3">
          <Link
            href="/auth/microsoft/redirect"
            className="inline-flex w-full items-center justify-center rounded-md bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
          >
            Sign in with Microsoft
          </Link>
        </div>

        <div className="pt-4">
          <h2 className="mb-2 text-lg font-medium">Simulation (for testing)</h2>
          <div className="flex gap-2">
            <select
              className="flex-1 rounded border px-3 py-2"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            >
              {users.map((u) => (
                <option key={u.id} value={u.email}>
                  {u.email} {u.first_name ? `(${u.first_name} ${u.last_name || ""})` : ""}
                </option>
              ))}
            </select>
            <button
              onClick={simulate}
              disabled={loading || !email}
              className="rounded bg-gray-800 px-4 py-2 text-white disabled:opacity-50"
            >
              {loading ? "Signing in..." : "Simulate login"}
            </button>
          </div>
          {error && <p className="mt-2 text-sm text-red-600">{error}</p>}
        </div>
      </div>
    </div>
  );
}


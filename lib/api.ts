import { store } from "@/lib/redux/store";

interface ApiOptions {
  method?: "GET" | "POST" | "PUT" | "DELETE" | "PATCH";
  body?: any;
  headers?: Record<string, string>;
}

export async function authenticatedFetch(
  url: string,
  options: ApiOptions = {}
) {
  const state = store.getState();
  const token = state.auth.token;

  if (!token) {
    throw new Error("No valid session found");
  }

  const { method = "GET", body, headers = {} } = options;

  const config: RequestInit = {
    method,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
      ...headers,
    },
  };

  if (body && method !== "GET") {
    config.body = JSON.stringify(body);
  }

  const response = await fetch(
    `${
      process.env.NEXT_PUBLIC_BACKEND_API_URL || process.env.BACKEND_API_URL
    }${url}`,
    config
  );

  if (!response.ok) {
    throw new Error(
      `API call failed: ${response.status} ${response.statusText}`
    );
  }

  return response.json();
}

// Example usage functions
export const api = {
  // Get user profile from your backend
  getUserProfile: () => authenticatedFetch("/api/user/profile"),

  // Update user profile
  updateUserProfile: (data: any) =>
    authenticatedFetch("/api/user/profile", { method: "PUT", body: data }),

  // Get shareholder data
  getShareholders: () => authenticatedFetch("/api/shareholders"),

  // Add more API calls as needed
};

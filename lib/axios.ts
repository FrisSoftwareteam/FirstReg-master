import axios, { AxiosError, InternalAxiosRequestConfig } from "axios";
import axiosRetry from "axios-retry";
import { toast } from "sonner";

// 1. Create Axios instance
const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  timeout: 15000, // 15 seconds timeout
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

// 2. Configure Retry Logic
axiosRetry(axiosInstance, {
  retries: 3,
  retryDelay: axiosRetry.exponentialDelay,
  retryCondition: (error) => {
    // Retry on network errors or 5xx status codes
    return (
      axiosRetry.isNetworkOrIdempotentRequestError(error) ||
      (error.response?.status ? error.response.status >= 500 : false)
    );
  },
});

let store: any; // We'll hold a reference to the store here
let logoutAction: any;

export const setupAxios = (storeInstance: any, logout: any) => {
    store = storeInstance;
    logoutAction = logout;
};

// 3. Request Interceptor: Inject Token
axiosInstance.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    if (store) {
        const state = store.getState();
        const token = state.auth.token;

        if (token) {
        config.headers.Authorization = `Bearer ${token}`;
        }
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// 4. Response Interceptor: Error Handling
axiosInstance.interceptors.response.use(
  (response) => response,
  (error: AxiosError) => {
    const { response } = error;

    // Handle 401 Unauthorized
    if (response?.status === 401) {
      if (store && logoutAction) {
          store.dispatch(logoutAction());
      }
      // Optional: Redirect to login handled by protected route logic or component
      if (typeof window !== "undefined") {
        window.location.href = "/";
      }
      toast.error("Session expired. Please login again.");
    } else if (response) {
      // Server returned an error response
      const data = response.data as any;
      const message = data?.message || "An unexpected error occurred.";
      // Don't toast 404s if we want to handle them locally, but for "enterprise" usually toast errors
      if (response.status !== 404) {
        toast.error(message);
      }
    } else {
      // Network error (no response)
      toast.error("Network error. Please check your connection.");
    }

    return Promise.reject(error);
  }
);

export default axiosInstance;

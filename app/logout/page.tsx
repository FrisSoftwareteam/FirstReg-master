"use client";

import { useDispatch } from "react-redux";
import { logout } from "@/lib/redux/slices/authSlice";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function LogoutPage() {
  const dispatch = useDispatch();
  const router = useRouter();

  useEffect(() => {
    dispatch(logout());
    // Redirect to the API logout route to clear cookies
    window.location.href = "/api/logout?redirect=/login";
  }, [dispatch]);

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#1A225D] mx-auto"></div>
        <p className="mt-2 text-gray-600">Signing out...</p>
      </div>
    </div>
  );
}

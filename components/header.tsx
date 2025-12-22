"use client";

import { Bell, ChevronDown, LogOut } from "lucide-react";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/components/ui/avatar";
import { useState, useRef, useEffect } from "react";
import axios from "axios";
import { useAuth } from "@/hooks/useAuth";
import { useDispatch } from "react-redux";
import { logout } from "@/lib/redux/slices/authSlice";
import { useRouter } from "next/navigation";

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const timeoutRef = useRef<NodeJS.Timeout>();
  const { user, isLoading } = useAuth();
  const dispatch = useDispatch();
  const router = useRouter();

   const handleLogout = () => {
    dispatch(logout());
    router.push("/");
  };

  // Check if device is mobile
  const isMobile = typeof window !== "undefined" && window.innerWidth < 768; // md breakpoint

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleProfileInteraction = () => {
    if (isMobile) {
      setIsOpen(!isOpen);
    } else {
      setIsOpen(true);
    }
  };

  const handleMouseLeave = () => {
    if (!isMobile) {
      timeoutRef.current = setTimeout(() => {
        setIsOpen(false);
      }, 300); // Small delay to allow moving to dropdown
    }
  };

  const cancelClose = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
  };

  return (
    <header className="bg-white border-b border-gray-200 px-4 py-3 sm:px-6 lg:px-8 max-h-[80px]">
      <div className="flex items-center justify-between">
        {/* Logo */}
        <div className="text-xl sm:text-2xl font-ubuntu font-[500] text-gray-900">
          E-Stock
        </div>

        {/* Right side - Notifications and User */}
        <div className="flex items-center gap-2 sm:gap-4">
          {/* Notification Bell */}
          <div className="relative w-8 h-8 sm:w-10 sm:h-10 border-primary border-[0.75px] rounded-full flex items-center justify-center hover:bg-gray-50 transition-colors cursor-pointer">
            <Bell className="w-5 h-5 sm:w-6 sm:h-6 text-gray-600" />
            <div className="absolute top-[-1px] -right-1 w-3 h-3 bg-red-500 rounded-full flex items-center justify-center">
              <span className="text-[10px] text-white font-medium">1</span>
            </div>
          </div>

          {/* User Profile */}
          <div
            ref={dropdownRef}
            className={`relative ${isOpen ? "z-50" : ""}`}
            onMouseEnter={!isMobile ? handleProfileInteraction : undefined}
            onMouseLeave={!isMobile ? handleMouseLeave : undefined}
          >
            <div
              className={`flex items-center gap-2 sm:gap-3 cursor-pointer rounded-t-lg transition-all duration-200 ${
                isOpen
                  ? "bg-white px-1 pb-2 -mb-2 rounded-b-none shadow-md"
                  : "px-1"
              }`}
              onClick={isMobile ? handleProfileInteraction : undefined}
            >
              <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gray-200 rounded-full flex items-center justify-center flex-shrink-0">
                <span className="text-xs font-medium text-gray-700">
                  <Avatar className="h-8 w-8 md:h-10 md:w-10 border-2 border-gray-200">
                    <AvatarImage src={user?.profile_picture || ""} />
                    <AvatarFallback className="bg-gray-100 text-lg font-semibold text-gray-600">
                      {user?.first_name?.charAt(0).toUpperCase() ?? user?.last_name?.charAt(0).toUpperCase() ?? "EE"}
                    </AvatarFallback>
                  </Avatar>
                </span>
              </div>
              <div className="hidden sm:flex flex-col max-w-[140px] md:max-w-[200px] lg:max-w-none">
                <span className="text-sm font-medium text-gray-900 truncate">
                  {/* Emmanuel Effiong */}
                  {/* {user?.email?.split("@")[0] || "User"} */}
                  {user?.first_name && user?.last_name ? `${user.first_name} ${user.last_name}` : (user?.email?.split("@")[0] || "User")}
                </span>
                <span className="text-xs text-gray-500 truncate">
                  {/* emmanuel.effiong@firstregistrarsnigeria.com */}
                  {user?.email}
                </span>
              </div>
              <div
                className={`hidden sm:flex w-4 h-4 border-primary border-[0.75px] rounded-full items-center justify-center transition-colors ${
                  isOpen ? "bg-gray-50" : "group-hover:bg-gray-50"
                }`}
              >
                <ChevronDown
                  className={`w-3 h-3 sm:w-4 sm:h-4 text-gray-400 transition-transform duration-200 ${
                    isOpen ? "rotate-180" : ""
                  }`}
                />
              </div>
            </div>

            {/* Dropdown Menu */}
            <div
              onMouseEnter={!isMobile ? cancelClose : undefined}
              onMouseLeave={!isMobile ? handleMouseLeave : undefined}
              className={`absolute right-0 w-full min-w-[200px] bg-white rounded-b-lg shadow-lg ring-1 ring-black ring-opacity-5 overflow-hidden transition-all duration-200 ease-in-out transform ${
                isOpen
                  ? "opacity-100 translate-y-0 ring-1 ring-gray-200"
                  : "opacity-0 -translate-y-2 pointer-events-none"
              }`}
              style={{
                boxShadow: isOpen
                  ? "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)"
                  : "none",
                marginTop: isOpen ? "0" : "0.5rem",
              }}
            >
              <div className="py-3 flex justify-center">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    // Handle sign out
                    console.log("Sign out clicked");
                    handleLogout()
                    setIsOpen(false);
                  }}
                  className="w-1/2 flex items-center rounded-full justify-center px-4 py-2 text-sm font-medium text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition-colors duration-350"
                >
                  Sign Out
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}

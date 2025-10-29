import { Bell, ChevronDown } from "lucide-react";
// import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export default function Header() {
  return (
    <header className="bg-white border-b border-gray-200 px-6 py-4">
      <div className="flex items-center justify-between">
        {/* Logo */}
        <div className="text-2xl font-ubuntu font-[500] text-gray-900">
          E-Stock
        </div>

        {/* Right side - Notifications and User */}
        <div className="flex items-center gap-4">
          {/* Notification Bell */}
          <div className="relative w-10 h-10 border-primary border-[0.75px] rounded-full flex items-center justify-center">
            <Bell className="w-6 h-6 text-gray-600" />
            <div className="absolute top-[-1px] -right-1 w-3 h-3 bg-red-500 rounded-full flex items-center justify-center">
              <span className="text-xs text-white font-medium">1</span>
            </div>
          </div>

          {/* User Profile */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center">
              <span className="text-xs font-medium text-gray-700">EE</span>
            </div>
            <div className="flex flex-col">
              <span className="text-sm font-medium text-gray-900">
                Emmanuel Effiong
              </span>
              <span className="text-xs text-gray-500">
                emmanuel.effiong@firstregistrarsnigeria.com
              </span>
            </div>
            <div className="w-4 h-4 border-primary border-[0.75px] rounded-full flex items-center justify-center">
              <ChevronDown className="w-4 h-4 text-gray-400" />
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}

import { Bell, ChevronDown } from "lucide-react";
// import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export default function Header() {
  return (
    <header className="bg-white border-b border-gray-200 px-4 py-3 sm:px-6 lg:px-8">
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
          <div className="flex items-center gap-2 sm:gap-3 cursor-pointer group">
            <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gray-200 rounded-full flex items-center justify-center flex-shrink-0">
              <span className="text-xs font-medium text-gray-700">EE</span>
            </div>
            <div className="hidden sm:flex flex-col max-w-[140px] md:max-w-[200px] lg:max-w-none">
              <span className="text-sm font-medium text-gray-900 truncate">
                Emmanuel Effiong
              </span>
              <span className="text-xs text-gray-500 truncate">
                emmanuel.effiong@firstregistrarsnigeria.com
              </span>
            </div>
            <div className="hidden sm:flex w-4 h-4 border-primary border-[0.75px] rounded-full items-center justify-center group-hover:bg-gray-50">
              <ChevronDown className="w-3 h-3 sm:w-4 sm:h-4 text-gray-400" />
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}

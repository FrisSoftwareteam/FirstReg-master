"use client";

// import Breadcrumb from "@/components/breadcrumb";
import ModuleCard from "@/components/module-card";
import { useBreadcrumbNavigation } from "../../hooks/useBreadcrumbNavigation";
import { useAuth } from "@/hooks/useAuth";
// import { Button } from "@/components/ui/button";
import { useDispatch, useSelector } from "react-redux";
// import { logout, fetchUserProfile } from "@/lib/redux/slices/authSlice";
// import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { AppDispatch, RootState } from "@/lib/redux/store";
import { fetchUserProfile } from "@/lib/redux/slices/authSlice";

export default function Dashboard() {
  const { navigateWithBreadcrumb } = useBreadcrumbNavigation();
  const { user, isLoading } = useAuth();
  const dispatch = useDispatch<AppDispatch>();
  // const router = useRouter();
  const auth = useSelector((state: RootState) => state.auth);
  const { status } = auth || { status: "idle" };

  // console.log("auth",auth.user?.roles?.[0]?.name)

  useEffect(()=>{
    dispatch(fetchUserProfile());
  }, [dispatch])

 
  
  if (isLoading || status === "loading") {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#1A225D] mx-auto"></div>
          <p className="mt-2 text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  const modules = [
    {
      title: "User Administration",
      description:
        "Manage and control user access,Roles and permission  with ease.",
      icon: "/Vector.png",
      href: "/dashboard/user-admin",
      permission: "users.view",
    },
    {
      title: "Shareholder Management",
      description:
        "Manage holders, certificates, and shareholder updates. Handle consolidations, splits, dividends, correspondence, and reports",
      icon: "/Vector.png",
      href: "/dashboard/shareholder-management",
      permission: "shares.view",
    },
    {
      title: "Company Register Managment",
      description:
        "Manage companies register, Handle dividends, correspondence, and reports",
      icon: "/Vector.png",
      href: "/dashboard/company-register",
    },
    {
      title: "Reports",
      description:
        "Generate management reports and perform detailed analyses. Manage GSM administration and handle subscriptions",
      icon: "/Vector.png",
      href: "/dashboard/reports",
    },
    {
      title: "Other Modules",
      description:
        "Verify certificates and manage dividend payments with reconciliation. Oversee accounts and streamline fund management",
      icon: "/Vector.png",
      href: "/dashboard/other-modules",
    },
  ];

  const filteredModules = modules.filter(module => {
     if (!module.permission) return true;
     return auth.user?.permissions?.includes(module.permission);
  });

  return (
    <div className="min-h-screen bg-[#F2F2F2]">
      <main className="px-6 py-8">
        {/* <Breadcrumb /> */}

        <div className="mb-4 mx-[28px] flex justify-between items-center">
          <span className="text-[#C10B0B] text-sm font-medium">
            • {auth.user?.roles?.[0]?.name || null} •
          </span>
          {/* <div className="flex items-center gap-4">
            <span className="text-sm text-gray-600">{user?.email}</span>
            <Button onClick={handleLogout} variant="outline" size="sm">
              Logout
            </Button>
          </div> */}
        </div>

        <h1 className="text-4xl mx-[28px] font-ubuntu font-[500] text-primary mb-8">
          Good Morning, {user?.first_name && user?.last_name ? `${user.first_name} ${user.last_name}` : (user?.email?.split("@")[0] || "User")}
        </h1>

        <div className="flex justify-center mb-12">
          <div className="max-w-md">
            <div className="flex items-center justify-center h-12 px-4 text-center bg-white border-gray-200 text-[18px] rounded-full shadow-sm font-poppins text-primary">
              What do you want to work on ?
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-y-[54px] gap-x-[98px] mx-[28px] ">
          {filteredModules.map((module, index) => (
            <ModuleCard
              key={module.title}
              title={module.title}
              description={module.description}
              onClick={() =>
                module.href &&
                navigateWithBreadcrumb(module.href, module.title.toUpperCase())
              }
              icon={
                <div className="w-6 h-6 ">
                  {/* <img
                    src={module.icon}
                    alt={module.title}
                    className="w-full h-full"
                  /> */}
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M6.75 0H17.25V10.5H6.75V0ZM0 13.5H10.5V24H0V13.5ZM24 13.5H13.5V24H24V13.5Z"
                      fill="currentColor"
                    />
                  </svg>
                </div>
              }
              className={!module.href ? "opacity-50 cursor-not-allowed" : ""}
            />
          ))}
        </div>
      </main>
    </div>
  );
}

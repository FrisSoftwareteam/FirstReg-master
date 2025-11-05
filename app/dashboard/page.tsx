"use client";

import Breadcrumb from "@/components/breadcrumb";
import ModuleCard from "@/components/module-card";
import { useBreadcrumbNavigation } from "../../hooks/useBreadcrumbNavigation";

export default function Dashboard() {
  const { navigateWithBreadcrumb } = useBreadcrumbNavigation();

  const modules = [
    {
      title: "General Parameters",
      description:
        "Control users, registers, holders, and agents. Configure countries, correspondence, and admin settings",
      icon: "/Vector.png",
      href: "/dashboard/general-parameters",
    },
    {
      title: "Processes",
      description:
        "Manage holders, certificates, and shareholder updates. Handle consolidations, splits, dividends, correspondence, and reports",
      icon: "/Vector.png",
      href: "/dashboard/processes",
    },
    {
      title: "Enquiries",
      description:
        "Access holder enquiries, stock in issue, and register summaries. Track CSCS transactions, certificates, warrants, audit logs, and messages",
      icon: "/Vector.png",
      href: "/dashboard/enquiries",
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

  return (
    <div className="min-h-screen bg-[#F2F2F2]">
      <main className="px-6 py-8">
        <Breadcrumb />

        <div className="mb-4 mx-[28px]">
          <span className="text-[#C10B0B] text-sm font-medium">
            • Super Admin •
          </span>
        </div>

        <h1 className="text-4xl mx-[28px] font-ubuntu font-[500] text-primary mb-8">
          Good Morning , Emmanuel
        </h1>

        <div className="flex justify-center mb-12">
          <div className="max-w-md">
            <div className="flex items-center justify-center h-12 px-4 text-center bg-white border-gray-200 text-[18px] rounded-full shadow-sm font-poppins text-primary">
              What do you want to work on ?
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-y-[54px] gap-x-[98px] mx-[28px]">
          {modules.map((module, index) => (
            <ModuleCard
              key={module.title}
              title={module.title}
              description={module.description}
              onClick={() =>
                module.href &&
                navigateWithBreadcrumb(module.href, module.title.toUpperCase())
              }
              icon={
                <div className="w-6 h-6">
                  <img
                    src={module.icon}
                    alt={module.title}
                    className="w-full h-full"
                  />
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

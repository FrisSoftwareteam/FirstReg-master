"use client";

import Header from "@/components/header";
import Breadcrumb from "@/components/breadcrumb";
import { useBreadcrumbNavigation } from "../../hooks/useBreadcrumbNavigation";

export default function Dashboard() {
  const { navigateWithBreadcrumb } = useBreadcrumbNavigation();

  const modules = [
    {
      title: "General Parameters",
      description:
        "Control users, registers, holders, and agents. Configure countries, correspondence, and admin settings",
      icon: "/dashboardIcon.png",
      href: "/dashboard/general-parameters",
    },
    {
      title: "Processes",
      description:
        "Manage holders, certificates, and shareholder updates. Handle consolidations, splits, dividends, correspondence, and reports",
      icon: "/dashboardIcon.png",
      href: "/dashboard/processes",
    },
    {
      title: "Enquiries",
      description:
        "Access holder enquiries, stock in issue, and register summaries. Track CSCS transactions, certificates, warrants, audit logs, and messages",
      icon: "/dashboardIcon.png",
      href: "/dashboard/enquiries",
    },
    {
      title: "Reports",
      description:
        "Generate management reports and perform detailed analyses. Manage GSM administration and handle subscriptions",
      icon: "/dashboardIcon.png",
      href: "/dashboard/reports",
    },
    {
      title: "Other Modules",
      description:
        "Verify certificates and manage dividend payments with reconciliation. Oversee accounts and streamline fund management",
      icon: "/dashboardIcon.png",
      href: "/dashboard/other-modules",
    },
  ];

  return (
    <div className="min-h-screen bg-[#F2F2F2]">
      <Header />

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
            <button
              key={index}
              onClick={() =>
                module.href &&
                navigateWithBreadcrumb(module.href, module.title.toUpperCase())
              }
              disabled={!module.href}
              className="bg-white rounded-lg px-8 py-10 shadow-sm border border-gray-100 transition-all duration-300 hover:shadow-md hover:bg-[rgba(253,253,250,0.5)] cursor-pointer relative max-w-[400px] h-[206px] w-full disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <div className="absolute top-4 right-4">
                <div className="w-4 h-4 bg-primary rounded-full flex items-center justify-center">
                  <svg
                    className="w-3 h-3 text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                </div>
              </div>

              <div className="mb-4">
                <div className="w-6 h-6 rounded-lg flex items-center justify-center">
                  <img src={module.icon} alt={module.title} />
                </div>
              </div>

              <h3 className="text-lg font-semibold text-primary mb-3">
                {module.title}
              </h3>
              <p className="text-[#78716C] text-[10px] font-[400] leading-relaxed">
                {module.description}
              </p>
            </button>
          ))}
        </div>
      </main>
    </div>
  );
}

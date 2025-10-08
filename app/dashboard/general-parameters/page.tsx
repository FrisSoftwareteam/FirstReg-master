"use client";

import Header from "@/components/header";
import Breadcrumb from "@/components/breadcrumb";
import { useBreadcrumbNavigation } from "../../../hooks/useBreadcrumbNavigation";
// import Module from "module";
import ModuleCard from "@/components/module-card";

export default function GeneralParameters() {
  const { navigateWithBreadcrumb } = useBreadcrumbNavigation();

  const parameterModules = [
    {
      title: "User Administration",
      description: "Create, manage, and control user access with ease.",
      href: "/dashboard/general-parameters/user-admin",
    },
    {
      title: "Country Administration",
      description: "Define and manage country details for accurate records",
      href: "/dashboard/general-parameters/country-admin",
    },
    {
      title: "Register Administration",
      description: "Set up and maintain shareholder registers seamlessly.",
      href: "/dashboard/general-parameters/register-administration",
    },
    {
      title: "Holder's Administration",
      description: "Manage shareholder information and profiles efficiently.",
      href: "/dashboard/general-parameters/holder-administration",
    },
    {
      title: "Agent Administration",
      description: "Add and oversee agents linked to registers or holders",
      href: "/dashboard/general-parameters/agent-administration",
    },
    {
      title: "Correspondence Administration",
      description: "Organize and track correspondence across departments.",
      href: "/dashboard/general-parameters/correspondence-administration",
    },
  ];

  return (
    <div className="min-h-screen bg-[#F2F2F2]">
      <Header />

      <main className="px-6 py-8">
        <Breadcrumb />

        <h1 className="text-4xl font-ubuntu mx-[28px] font-[500] text-primary mb-40">
          General Parameters
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-y-[54px] gap-x-[98px] justify-items-center">
          {parameterModules.map((module, index) => (
            <ModuleCard
              key={index}
              title={module.title}
              icon={
                <>
                  <div className="w-3 h-3 bg-primary" />
                  <div className="w-3 h-3 bg-primary" />
                </>
              }
              description={module.description}
              onClick={() => navigateWithBreadcrumb(module.href, module.title)}
            />
          ))}
        </div>
      </main>
    </div>
  );
}

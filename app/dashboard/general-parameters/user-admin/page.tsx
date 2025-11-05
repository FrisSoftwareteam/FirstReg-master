"use client";

import { useState } from "react";
import UserSelect from "@/components/user-select";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/components/ui/avatar";
import { Button } from "@/components/components/ui/button";
import { Checkbox } from "@/components/components/ui/checkbox";
import { Mail, Phone } from "lucide-react";
import Breadcrumb from "@/components/breadcrumb";

export default function UserAdministration() {
  const [selectedUser, setSelectedUser] = useState("Emmanuel Effiong");
  const users = [
    "Emmanuel Effiong",
    "Jane Doe",
    "John Smith",
    "Mary Johnson",
    "Samuel Lee",
    "Fatima Bello",
    "Chinedu Okafor",
    "Aisha Musa",
    "David Brown",
    "Grace Williams",
  ];

  const filterButtons = [
    "Range Auth Setup",
    "Archive /Speed Up",
    "Report Signatories",
    "User Time Slot",
    "Departments",
    "Public holiday",
    "Admin List Report",
    "Web Clients",
  ];

  const sections = [
    {
      title: "General Administration",
      items: [
        "User Administration",
        "Registrars Administration",
        "General Administration",
        "Agent Administration",
        "Branch Administration",
        "Audit Administration",
      ],
    },
    {
      title: "Certificate Management",
      items: [
        "Certificate Return Update",
        "Certificate Claim Update",
        "Cert. Stoppage",
        "Un-Stop Certificate",
        "Cancellation",
        "Cert Modify",
        "Certificate Statement Printing",
        "Correction Entry (Transfer)",
        "Bonus Setup",
        "Amalgamation",
        "Split",
        "Annotate",
        "Remover Cert. Verified",
        "Cert Replacement",
      ],
    },
    {
      title: "Other Modules",
      items: [
        "Verification",
        "Div. Reconciliation",
        "Accounts Modules",
        "Funds Management",
        "Funds Mngt Process",
        "AGM Device Setup",
      ],
    },
    {
      title: "Eprint Module",
      items: [
        "Div Reissue",
        "Reissue Batch Points",
        "Withholding Tax",
        "Sticky Labels",
        "Cert. Replacement",
        "Interest Calc.",
        "Debenture Calc.",
        "Supplementary Warrants",
        "Print Other Warrants",
        "Replacement Limit",
      ],
    },
    {
      title: "Shareholder Management",
      items: [
        "Open Account",
        "Consolidation",
        "Caution",
        "Change of Name",
        "Correction of Name",
        "Change of Address",
        "Correction of Address",
        "Change of Mandate",
        "Change of Probate",
        "Edit Probate",
        "Holder Update",
        "Holder Report",
        "Holder Extraction",
        "Print Signature",
        "View Signature",
        "Management Reports",
        "Special Alert",
      ],
    },
    {
      title: "Warrant Management",
      items: [
        "Div. Return Update",
        "Div. Claim Update",
        "Dividend Declaration",
        "Div. Revalidation",
        "Div. Reports",
        "Div. Statement Printing",
        "Annotate",
        "Reissues/Replacement",
        "Cert Replacement",
      ],
    },
    {
      title: "Authorisation",
      items: [
        "Change of Name",
        "Change of Address",
        "Change of Mandate",
        "Probate Administration",
        "Consolidation",
        "Split",
        "Amalgamation",
        "Certificate Replacement",
        "Dividend Reissues",
        "Correction Entry",
      ],
    },
    {
      title: "GSM Operation",
      items: ["Administration", "Misc Operation", "Ignore Message"],
    },
    {
      title: "Documentation",
      items: ["Auto", "Correspondence"],
    },
    {
      title: "CSCS Disk Upload",
      items: ["CSCS Processing", "CSCS Final Run"],
    },
    {
      title: "Others",
      items: [
        "Disable User",
        "Read Only",
        "Web Messages",
        "View Special Register",
      ],
    },
  ];

  return (
    <div className="min-h-screen bg-[#e8e8e8]">
      <main className="px-4 sm:px-6 md:px-10 lg:px-14 py-6 md:py-8">
        <Breadcrumb />
        <h1 className=" mx-[0px] font-ubuntu font-500 mb-8 text-3xl text-primary">
          User Administration
        </h1>

        <div className="mb-6 flex gap-2 overflow-x-auto pb-2 md:flex-wrap">
          {filterButtons.map((btn) => (
            <button
              key={btn}
              className="whitespace-nowrap rounded-full border border-gray-400 px-4 py-2 text-sm text-gray-700 transition hover:bg-gray-50"
            >
              {btn}
            </button>
          ))}
        </div>

        <div className="mb-8 rounded-lg bg-white p-6 shadow-sm border border-gray-200 md:p-8">
          <div className="flex flex-col gap-6 md:flex-row md:items-start md:gap-8">
            {/* Left: Avatar */}
            <div className="flex justify-center md:justify-start">
              <Avatar className="h-24 w-24 md:h-28 md:w-28 border-2 border-gray-200">
                <AvatarImage src="/professional-business-person.png" />
                <AvatarFallback className="bg-gray-100 text-lg font-semibold text-gray-600">
                  EE
                </AvatarFallback>
              </Avatar>
            </div>

            {/* Middle: User Selection and Checkboxes */}
            <div className="flex-1 space-y-4">
              <div className="rounded-lg border border-gray-200 bg-white p-4 shadow-sm">
                <label className="mb-2 block text-sm font-semibold text-gray-800">
                  Choose User
                </label>
                <UserSelect
                  users={users}
                  value={selectedUser}
                  onChange={setSelectedUser}
                  placeholder="Select a user"
                />
              </div>

              <div className="mb-4 flex gap-6 justify-between w-[85%] mr-6 flex-wrap">
                <div className="flex items-center gap-2">
                  <label htmlFor="special-user" className="text-sm">
                    Management /Special User
                  </label>
                  <Checkbox
                    colorClass="data-[state=checked]:bg-green-700 data-[state=checked]:text-white"
                    id="special-user"
                    defaultChecked
                  />
                </div>
                <div className="flex items-center gap-2">
                  <label htmlFor="audit-view" className="text-sm">
                    Internal Audit View
                  </label>
                  <Checkbox
                    colorClass="data-[state=checked]:bg-green-700 data-[state=checked]:text-white"
                    id="audit-view"
                    defaultChecked
                  />
                </div>
              </div>
            </div>

            {/* Right: User Details and Modify Button */}
            <div className="flex flex-1 flex-col gap-6 h-full p-6">
              <div className="flex gap-4 flex-wrap">
                {/* User Details */}
                <div className="space-y-2 text-sm">
                  <div className="">
                    <p className="text-sm font-bold text-gray-600 tracking-wide">
                      DEPT: Information Technology
                    </p>
                    {/* <p className="font-medium text-gray-900"></p> */}
                  </div>
                  <div>
                    <p className="text-xs font-bold text-gray-600 tracking-wide">
                      ID: FRIS-0220
                    </p>
                    {/* <p className="font-medium text-gray-900"></p> */}
                  </div>
                </div>

                {/* Contact Details with Icons */}
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <Mail className="h-4 w-4 text-blue-600" />
                    <p className="text-sm font-bold text-primary overflow-hidden text-ellipsis md:overflow-visible max-w-[200px]">
                      emmanuel.effiong@firstregistrarsnigeria.com
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <Phone className="h-4 w-4 text-gray-600" />
                    <p className="text-sm font-medium text-gray-900">
                      (+234) 080 43212353
                    </p>
                  </div>
                </div>
              </div>

              {/* Modify Button */}
              <Button className="mt-4 w-full rounded-full bg-gray-900 py-6 text-base font-semibold text-white hover:bg-gray-800 transition md:mt-auto">
                Modify User
              </Button>
            </div>
          </div>
        </div>

        {/* Permissions Grid */}
        <div className="relative rounded-lg border-2 md:border-4 bg-white p-4 md:p-6 overflow-hidden">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
            {/* Column 1: General Administration & Shareholder Management */}
            <div className="space-y-4 md:space-y-6">
              <PermissionSection
                title="General Administration"
                items={[
                  "User Administration",
                  "Registrars Administration",
                  "General Administration",
                  "Agent Administration",
                  "Branch Administration",
                  "Audit Administration",
                ]}
              />
              <PermissionSection
                title="Shareholder Management"
                items={[
                  "Open Account",
                  "Consolidation",
                  "Caution",
                  "Change of Name",
                  "Correction of Name",
                  "Change of Address",
                  "Correction of Address",
                  "Change of Mandate",
                  "Change of Probate",
                  "Edit Probate",
                  "Holder Update",
                  "Holder Report",
                  "Holder Extraction",
                  "Print Signature",
                  "View Signature",
                  "Management Reports",
                  "Special Alert",
                ]}
              />
            </div>

            {/* Column 2: Certificate Management & Warrant Management */}
            <div className="space-y-4 md:space-y-6">
              <PermissionSection
                title="Certificate Management"
                items={[
                  "Certificate Return Update",
                  "Certificate Claim Update",
                  "Cert. Stoppage",
                  "Un-Stop Certificate",
                  "Cancellation",
                  "Cert Modify",
                  "Certificate Statement Printing",
                  "Correction Entry (Transfer)",
                  "Bonus Setup",
                  "Amalgamation",
                  "Split",
                  "Annotate",
                  "Remover Cert. Verified",
                  "Cert Replacement",
                ]}
              />
              <PermissionSection
                title="Warrant Management"
                items={[
                  "Div. Return Update",
                  "Div. Claim Update",
                  "Dividend Declaration",
                  "Div. Revalidation",
                  "Div. Reports",
                  "Div. Statement Printing",
                  "Annotate",
                  "Reissues/Replacement",
                  "Cert Replacement",
                ]}
              />
            </div>

            {/* Column 3: Other Modules, Authorisation & CSCS */}
            <div className="space-y-4 md:space-y-6">
              <PermissionSection
                title="Other Modules"
                items={[
                  "Verification",
                  "Div. Reconciliation",
                  "Accounts Modules",
                  "Funds Management",
                  "Funds Mngt Process",
                  "AGM Device Setup",
                ]}
              />
              <PermissionSection
                title="Authorisation"
                items={[
                  "Change of Name",
                  "Change of Address",
                  "Change of Mandate",
                  "Probate Administration",
                  "Consolidation",
                  "Split",
                  "Amalgamation",
                  "Certificate Replacement",
                  "Dividend Reissues",
                  "Correction Entry",
                ]}
              />
              <PermissionSection
                title="CSCS Disk Upload"
                items={["CSCS Processing", "CSCS Final Run"]}
                className="!mb-0"
              />
            </div>

            {/* Column 4: Eprint Module, GSM Operation, Documentation & Others */}
            <div className="space-y-4 md:space-y-6">
              <PermissionSection
                title="Eprint Module"
                items={[
                  "Div Reissue",
                  "Reissue Batch Points",
                  "Withholding Tax",
                  "Sticky Labels",
                  "Cert. Replacement",
                  "Interest Calc.",
                  "Debenture Calc.",
                  "Supplementary Warrants",
                  "Print Other Warrants",
                  "Replacement Limit",
                ]}
              />
              <PermissionSection
                title="GSM Operation"
                items={["Administration", "Misc Operation", "Ignore Message"]}
              />
              <PermissionSection
                title="Documentation"
                items={["Auto", "Correspondence"]}
                className="!mb-0"
              />
              <PermissionSection
                title="Others"
                items={[
                  "Disable User",
                  "Read Only",
                  "Web Messages",
                  "View Special Register",
                ]}
              />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

function PermissionSection({
  title,
  items,
  className = "",
}: {
  title: string;
  items: string[];
  className?: string;
}) {
  return (
    <div className={`space-y-4 ${className}`}>
      <h3 className="text-lg font-semibold text-gray-900 mb-2">{title}</h3>
      <div className="flex flex-col gap-2 space-y-2 bg-[#F2F2F2] p-3 rounded-md">
        {items.map((item) => (
          <div key={item} className="flex justify-between items-center gap-2">
            <label htmlFor={item} className="text-xs leading-tight">
              {item}
            </label>

            <Checkbox
              colorClass="data-[state=checked]:bg-green-700 data-[state=checked]:text-white"
              id={item}
              defaultChecked
              className="h-4 w-4"
            />
          </div>
        ))}
      </div>
    </div>
  );
}

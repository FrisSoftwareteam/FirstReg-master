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
import { PiMicrosoftOutlookLogoBold } from "react-icons/pi";
import { Mail, Phone } from "lucide-react";
import Header from "@/components/header";
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

  return (
    <div className="min-h-screen bg-[#e8e8e8]">
      <Header />

      <main className="px-14 py-8">
        <Breadcrumb />
        <h1 className=" mx-[24px] font-ubuntu font-500 mb-8 text-3xl text-primary">
          User Administration
        </h1>

        <div className="mx-[24px] mb-6 flex gap-6">
          {/* Left Section - User Info */}
          <div className="flex-1 rounded-lg bg-white p-6 shadow-lg px-9 py-9">
            <div className="flex gap-2">
              <div className="w-1/4">
                <Avatar className="h-32 w-32 border-[4px] border-gray-200">
                  <AvatarImage src="/professional-business-person.png" />
                  <AvatarFallback>EE</AvatarFallback>
                </Avatar>
              </div>

              <div className="flex-1 flex flex-col items-end">
                <div className="mb-4 bg-white shadow-md border-[0.5px] w-full border-black px-8 py-8 rounded-lg">
                  <label className="mb-2 block text-sm font-medium">
                    Choose User
                  </label>
                  <UserSelect
                    users={users}
                    value={selectedUser}
                    onChange={setSelectedUser}
                    placeholder="Select a user"
                  />
                </div>

                <div className="mb-4 flex gap-6 justify-between w-[85%] mr-6">
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
            </div>
            <div className="grid grid-cols-2 grid-rows-2 gap-3 space-y-2 text-sm">
              <div className="flex items-center gap-2">
                <span className="font-semibold">DEPT:</span>
                <span>Information Technology</span>
              </div>
              <div className="flex items-center gap-2">
                {/* <Mail className="h-4 w-4 text-blue-600" /> */}
                <PiMicrosoftOutlookLogoBold color="blue" size="18" />
                <span className="text-blue-600">
                  emmanuel.effiong@firstregistrarsnigeria.com
                </span>
              </div>
              <div className="flex items-center gap-2">
                <span className="font-semibold">ID:</span>
                <span>FRIS-0220</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="h-4 w-4" />
                <span>(+234) 080 43212353</span>
              </div>
            </div>
          </div>

          {/* Right Section - Action Buttons */}
          <div className="flex-1 space-y-3">
            <div className="space-y-3 bg-white p-6 rounded-lg shadow-lg">
              <div className="flex gap-6">
                <Button
                  variant="secondary"
                  className="bg-[#c0c0c0] text-[#2D3339] hover:bg-[#b8b8b8]"
                >
                  Range Auth Setup
                </Button>
                <Button
                  variant="secondary"
                  className="bg-[#c0c0c0] text-gray-700 hover:bg-[#b8b8b8]"
                >
                  Archive /Speed Up
                </Button>
                <Button
                  variant="secondary"
                  className="bg-[#c0c0c0] text-gray-700 hover:bg-[#b8b8b8]"
                >
                  Admin List - Summary
                </Button>
              </div>
              <div className="flex gap-6">
                <Button
                  variant="secondary"
                  className="bg-[#c0c0c0] text-gray-700 hover:bg-[#b8b8b8]"
                >
                  Admin List - Gen
                </Button>
                <Button
                  variant="secondary"
                  className="bg-[#c0c0c0] text-gray-700 hover:bg-[#b8b8b8]"
                >
                  User Time Slot
                </Button>
                <Button
                  variant="secondary"
                  className="bg-[#c0c0c0] text-gray-700 hover:bg-[#b8b8b8]"
                >
                  Departments
                </Button>
              </div>
              <div className="flex gap-6">
                <Button
                  variant="secondary"
                  className="bg-[#c0c0c0] text-gray-700 hover:bg-[#b8b8b8]"
                >
                  Admin List - Auth/ Modules/ Printing
                </Button>
                <Button
                  variant="secondary"
                  className="bg-[#c0c0c0] text-gray-700 hover:bg-[#b8b8b8]"
                >
                  Public holiday
                </Button>
              </div>
              <div className="flex gap-6">
                <Button
                  variant="secondary"
                  className="bg-[#c0c0c0] text-gray-700 hover:bg-[#b8b8b8]"
                >
                  Report Signatories
                </Button>
                <Button
                  variant="secondary"
                  className="bg-[#c0c0c0] text-gray-700 hover:bg-[#b8b8b8]"
                >
                  Admin List - Cert & Div Mngt
                </Button>
              </div>
              <div className="flex gap-6">
                <Button
                  variant="secondary"
                  className="bg-[#c0c0c0] text-gray-700 hover:bg-[#b8b8b8]"
                >
                  Admin List - Summary- Excel
                </Button>
                <Button
                  variant="secondary"
                  className="bg-[#c0c0c0] text-gray-700 hover:bg-[#b8b8b8]"
                >
                  Web Clients
                </Button>
              </div>
            </div>
            <Button className="w-full py-7 rounded-full bg-black text-white hover:bg-gray-900">
              Modify
            </Button>
          </div>
        </div>

        {/* Permissions Grid */}
        <div className="mx-[24px] relative rounded-lg border-4 bg-white p-6">
          <div className="grid grid-cols-4 gap-8">
            {/* Column 1: General Administration & Shareholder Management */}
            <div className="space-y-6">
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
            <div className="space-y-6">
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
            <div className="space-y-6">
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
              />
            </div>

            {/* Column 4: Eprint Module, GSM Operation, Documentation & Others */}
            <div className="space-y-6">
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
}: {
  title: string;
  items: string[];
}) {
  return (
    <div>
      <h3 className="mb-3 text-sm font-bold text-[#1e3a5f]">{title}</h3>
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

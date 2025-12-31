"use client";

import { useState, useEffect, useCallback } from "react";
import UserSelect, { User } from "@/components/user-select";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/components/ui/avatar";
import { Button } from "@/components/components/ui/button";
import { Checkbox } from "@/components/components/ui/checkbox";
import { Mail, Phone } from "lucide-react";
import axios from "axios";
import axiosInstance from "@/lib/axios";
// import Breadcrumb from "@/components/breadcrumb";

export default function UserAdministration() {
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [users, setUsers] = useState<User[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const [pagination, setPagination] = useState<{
    next_page_url: string | null;
    current_page: number;
    last_page: number;
  } | null>(null);

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

  const getUserData = useCallback(async (url?: string | null) => {
    if (url === null) return;
    
    // Determine if this is a "load more" request or initial load based on URL presence or page state
    const isLoadMore = !!url;
    
    if (isLoadMore) {
      setIsLoadingMore(true);
    } else {
      setIsLoading(true);
    }

    try {
      // If a URL is provided (for next page), use it. Otherwise use the default endpoint.
      // Note: the API response returns full URLs like "http://.../api/admin/users?page=2".
      // We need to handle this correctly with axiosInstance which has baseURL.
      // If the URL is absolute, axios might handle it if passed directly, OR we can extract the path.
      
      let fetchUrl = "/admin/users";
      if (url) {
         // If url is absolute, we might need to rely on axios handling it or strip base.
         // Assuming simpler case: if url is passed, use it directly but careful with auth header if domain matches.
         // Since it is same domain API, axios instance usually handles relative paths best.
         // Let's assume the API returns full URL.
         // We can use the axios instance to fetch the full URL if it allows.
         fetchUrl = url;
      }

      const res = await axiosInstance.get(fetchUrl);

      // Expected structure based on user input:
      // {
      //   success: true,
      //   data: {
      //     current_page: 1,
      //     data: [...],
      //     next_page_url: "...",
      //     ...
      //   }
      // }
      
      const responseData = res.data?.data; // The pagination object

      if (responseData && Array.isArray(responseData.data)) {
        const newUsers = responseData.data;
        
        setUsers((prev) => {
          if (isLoadMore) {
            // Filter out duplicates just in case
            const existingIds = new Set(prev.map(u => u.id));
            const uniqueNewUsers = newUsers.filter((u: User) => !existingIds.has(u.id));
            return [...prev, ...uniqueNewUsers];
          } else {
            return newUsers;
          }
        });

        setPagination({
          next_page_url: responseData.next_page_url,
          current_page: responseData.current_page,
          last_page: responseData.last_page,
        });

        // If it's the first load and we have users, select the first one if none selected
        if (!isLoadMore && newUsers.length > 0 && !selectedUser) {
           // Optional: Auto select first user? User didn't explicitly ask for this but typical
           // setSelectedUser(newUsers[0]);
        }
      }
    } catch (error) {
      console.error("Failed to fetch users:", error);
    } finally {
      setIsLoading(false);
      setIsLoadingMore(false);
    }
  }, [selectedUser]); // Removed dependency on selectedUser to avoid infinite loops if it was there, kept generic

  useEffect(() => {
    getUserData();
  }, [getUserData]);

  const handleLoadMore = () => {
    if (pagination?.next_page_url && !isLoadingMore) {
      getUserData(pagination.next_page_url);
    }
  };

  const handleUserSelect = async(user: User) => {
    try {
      const res = await axiosInstance.get(`/admin/users/${user.id}/roles-with-permissions`);
      setSelectedUser(user);
    console.log({
      id: user.id,
      email: user.email,
      first_name: user.first_name,
      last_name: user.last_name,
      department: user.department,
      is_active: user.is_active,
      profile_picture: user.profile_picture,
    });
    console.log(res.data);
    } catch (error) {
      console.error("Failed to fetch user:", error);
    }
  };

  
  
  return (
    <div className="min-h-screen bg-[#F2F2F2]">
      <main className="px-4 sm:px-6 md:px-10 lg:px-14 py-6 md:py-8">
        {/* <Breadcrumb /> */}
        <h1 className=" mx-[0px] font-ubuntu font-500 mb-8 text-3xl text-primary">
          User Administration
        </h1>

        <div className="mb-6 flex gap-2 overflow-x-auto pb-2 md:flex-wrap">
          {filterButtons.map((btn) => (
            <button
              key={btn}
              className="whitespace-nowrap rounded-full border border-gray-400 px-4 py-2 text-[10px] text-gray-700 transition hover:bg-gray-50 sm:text-sm"
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
                <AvatarImage src={selectedUser?.profile_picture || "/profileT.jpg"} />
                <AvatarFallback className="bg-gray-100 text-lg font-semibold text-gray-600">
                  {selectedUser ? `${selectedUser.first_name[0]}${selectedUser.last_name[0]}` : "U"}
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
                  onChange={handleUserSelect}
                  placeholder="Select a user"
                  onLoadMore={handleLoadMore}
                  hasMore={!!pagination?.next_page_url}
                  loading={isLoadingMore}
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
            <div className="flex flex-1 flex-col gap-6 h-full p-1 md:p-6">
              <div className="flex gap-6 flex-wrap">
                {/* User Details */}
                <div className="space-y-4 text-sm">
                  <div className="">
                    <p className="text-sm font-bold text-gray-600 tracking-wide">
                      DEPT: {selectedUser?.department || "N/A"}
                    </p>
                    {/* <p className="font-medium text-gray-900"></p> */}
                  </div>
                  <div>
                    <p className="text-xs font-bold text-gray-600 tracking-wide">
                      ID: {selectedUser?.id ? `FRIS-${selectedUser.id.toString().padStart(4, "0")}` : "N/A"}
                    </p>
                    {/* <p className="font-medium text-gray-900"></p> */}
                  </div>
                </div>

                {/* Contact Details with Icons */}
                <div className="space-y-4">
                  <div className="flex items-center gap-2">
                    <Mail className="h-4 w-4 text-blue-600" />
                    <p className="text-sm font-bold text-primary overflow-hidden text-ellipsis md:overflow-visible max-w-[280px]">
                      {selectedUser?.email || "No email"}
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <Phone className="h-4 w-4 text-gray-600" />
                    <p className="text-sm font-medium text-gray-900">
                      {/* Placeholder for phone as it's not in User interface yet */}
                      (+234) 080 0000 0000
                    </p>
                  </div>
                </div>
              </div>

              {/* Modify Button */}
              <Button className="mt-4 w-full rounded-full bg-gray-900 py-5 md:py-6 text-base font-normal text-white hover:bg-gray-800 transition md:mt-auto md:font-semibold">
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

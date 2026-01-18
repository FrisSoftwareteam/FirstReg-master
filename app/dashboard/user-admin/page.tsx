"use client";

import React, { useState, useEffect, useCallback } from "react";
import { useSelector } from "react-redux"; // Import useSelector
import UserSelect, { User } from "@/components/user-select";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/components/ui/avatar";
import { Button } from "@/components/components/ui/button";
import { Checkbox } from "@/components/components/ui/checkbox";
import { Mail, Phone } from "lucide-react";
import axiosInstance from "@/lib/axios";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

// --- Types ---

interface Pivot {
  role_id: number;
  permission_id: number;
}

interface Permission {
  id: number;
  name: string;
  guard_name: string;
  created_at: string;
  updated_at: string;
  pivot?: Pivot;
}

interface Role {
  id: number;
  name: string;
  guard_name: string;
  created_at: string;
  updated_at: string;
  permissions: Permission[];
}

interface RolesResponse {
  success: boolean;
  data: {
    current_page: number;
    data: Role[];
    first_page_url: string;
    from: number;
    last_page: number;
    links: {
      url: string | null;
      label: string;
      active: boolean;
    }[];
    next_page_url: string | null;
    path: string;
    per_page: number;
    prev_page_url: string | null;
    to: number;
    total: number;
  };
}

interface dataResponse{
  roles:Role[],
  direct_permissions:Permission[]
}

interface UserPermissionsResponse {
  success: boolean;
  data: dataResponse; // The endpoint returns an array of roles with permissions
}

export default function UserAdministration() {
  const router = useRouter();
  const { user: currentUser, status } = useSelector((state: any) => state.auth); // Get current user & status from Redux
  
  useEffect(() => {
    if (status === "loading") return; // Wait for auth to load
    
    // Check for "users.view" permission
    if (!currentUser?.permissions?.includes("users.view")) {
        toast.error("You are not authorized to view this module.");
        router.push("/dashboard");
    }
  }, [currentUser, status, router]);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [users, setUsers] = useState<User[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const [pagination, setPagination] = useState<{
    next_page_url: string | null;
    current_page: number;
    last_page: number;
  } | null>(null);

  // -- Permission State --
  const [allRoles, setAllRoles] = useState<Role[]>([]);
  const [userPermissionIds, setUserPermissionIds] = useState<Set<number>>(new Set());
  const [initialPermissionIds, setInitialPermissionIds] = useState<Set<number>>(new Set());
  const [isPermissionsLoading, setIsPermissionsLoading] = useState(false);
  const [isModifying, setIsModifying] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  // const filterButtons = [
  //   "Range Auth Setup",
  //   "Archive /Speed Up",
  //   "Report Signatories",
  //   "User Time Slot",
  //   "Departments",
  //   "Public holiday",
  //   "Admin List Report",
  //   "Web Clients",
  // ];

  useEffect(() => {
    if (currentUser && !selectedUser) {
        setSelectedUser(currentUser as User);
    }
  }, [currentUser]); // Run when currentUser is loaded/changes

  // --- 1. Load All Available Roles (Groups) ---
  const loadRoles = useCallback(async () => {
    try {
      const res = await axiosInstance.get<RolesResponse>("/roles");
      if (res.data?.success && res.data?.data?.data) {
        setAllRoles(res.data.data.data);
      }
    } catch (error) {
      console.error("Failed to fetch roles:", error);
    }
  }, []);

  useEffect(() => {
    loadRoles();
  }, [loadRoles]);

  // --- 2. Load Selected User's Permissions ---
  const loadUserPermissions = useCallback(async (userId: number) => {
    setIsPermissionsLoading(true);
    try {
      const res = await axiosInstance.get<UserPermissionsResponse>(
        `/admin/users/${userId}/roles-with-permissions`
      );
      // console.log(res.data.data)
      if (res.data?.success && Array.isArray(res.data?.data.roles)) {
        const roles = res.data.data.roles;

        const directPermissions = res.data.data.direct_permissions;
        
        const ids = new Set<number>();
        roles.forEach((role) => {
          if (role.permissions) {
            role.permissions.forEach((perm) => ids.add(perm.id));
          }
        });

        directPermissions.forEach((perm) => ids.add(perm.id));

        setUserPermissionIds(ids);
        setInitialPermissionIds(ids); // Set initial state for dirty check
      } else {
        setUserPermissionIds(new Set());
        setInitialPermissionIds(new Set());
      }
    } catch (error:any) {
      console.error("Failed to fetch user permissions:", error);
      toast.error(error.response.data.message);
      setUserPermissionIds(new Set());
      setInitialPermissionIds(new Set());
    } finally {
        setIsPermissionsLoading(false);
        setIsEditing(false); // Reset edit mode when loading new user
    }
  }, []);

  // UseEffect to load permissions when selectedUser changes
  useEffect(() => {
    if (selectedUser?.id) {
      loadUserPermissions(selectedUser.id);
    } else {
      setUserPermissionIds(new Set());
    }
  }, [selectedUser, loadUserPermissions]);


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
      
      let fetchUrl = "/admin/users";
      if (url) {
         fetchUrl = url;
      }

      const res = await axiosInstance.get(fetchUrl);
      
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

        if (!isLoadMore && newUsers.length > 0) {
             setSelectedUser((prevSelection) => {
                 if (!prevSelection) {
                     return newUsers[0];
                 }
                 return prevSelection;
             });
        }
      }
    } catch (error) {
      console.error("Failed to fetch users:", error);
    } finally {
      setIsLoading(false);
      setIsLoadingMore(false);
    }
  }, []); // Dependence on selectedUser removed to avoid closure staleness issues if any, handling update functionally

  useEffect(() => {
    getUserData();
  }, [getUserData]);

  const handleLoadMore = () => {
    if (pagination?.next_page_url && !isLoadingMore) {
      getUserData(pagination.next_page_url);
    }
  };

  const handleUserSelect = (user: User) => {
    setSelectedUser(user);
  };

  const handlePermissionToggle = useCallback((permissionId: number, checked: boolean) => {
    setUserPermissionIds(prev => {
        const newSet = new Set(prev);
        if (checked) {
            newSet.add(permissionId);
        } else {
            newSet.delete(permissionId);
        }
        return newSet;
    });
  }, []);

  const handleGroupToggle = useCallback((permissionIds: number[], checked: boolean) => {
    setUserPermissionIds(prev => {
        const newSet = new Set(prev);
        permissionIds.forEach(id => {
            if (checked) {
                newSet.add(id);
            } else {
                newSet.delete(id);
            }
        });
        return newSet;
    });
  }, []);

  const handleModifyUser = async () => {
    if (!selectedUser) return;
    
    if (!isEditing) {
      setIsEditing(true);
      return;
    }

    setIsModifying(true);
    try {
        const payload = {
            permissions: Array.from(userPermissionIds)
        };
        
        await axiosInstance.post(`/admin/users/${selectedUser.id}/permissions`, payload);
        
        toast.success("User permissions updated successfully");
        setInitialPermissionIds(userPermissionIds); // Reset dirty state
        setIsEditing(false); // Exit edit mode on success
    } catch (error: any) {
        // console.error("Failed to update permissions:", error.response.data.message);
        toast.error(error.response.data.message);
    } finally {
        setIsModifying(false);
    }
  };

  // Check for changes
  const hasChanges = 
    userPermissionIds.size !== initialPermissionIds.size || 
    Array.from(userPermissionIds).some(id => !initialPermissionIds.has(id));

  // Helper to determine responsive grid classes based on role count
  const getGridClass = () => {
    const n = allRoles.length;
    let cls = "gap-6 md:gap-8 columns-1";

    if (n >= 2) cls += " sm:columns-2";
    if (n >= 3) cls += " lg:columns-3";
    // Cap at 4 columns for most large screens to keep them wide
    if (n >= 4) cls += " xl:columns-4";
    
    // Only go to 5 columns on ultra-wide screens (e.g., 1900px+)
    if (n >= 5) cls += " min-[1900px]:columns-5";
    
    // 6 columns only for massive displays
    if (n >= 6) cls += " min-[2400px]:columns-6";

    return cls;
  };

  return (
    <div className="min-h-screen bg-[#F2F2F2]">
      <main className="px-4 sm:px-6 md:px-10 lg:px-14 py-6 md:py-8">
        {/* <Breadcrumb /> */}
        <h1 className=" mx-[0px] font-ubuntu font-500 mb-8 text-3xl text-primary">
          User Administration
        </h1>

        <div className="mb-6 flex gap-2 overflow-x-auto pb-2 md:flex-wrap">
          {/* {filterButtons.map((btn) => (
            <button
              key={btn}
              className="whitespace-nowrap rounded-full border border-gray-400 px-4 py-2 text-[10px] text-gray-700 transition hover:bg-gray-50 sm:text-sm"
            >
              {btn}
            </button>
          ))} */}
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

              {/* <div className="mb-4 flex gap-6 justify-between w-[85%] mr-6 flex-wrap">
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
              </div> */}
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
              <Button 
                onClick={handleModifyUser}
                disabled={!selectedUser || isModifying || (isEditing && !hasChanges)}
                className="mt-4 w-full rounded-full bg-gray-900 py-5 md:py-6 text-base font-normal text-white hover:bg-gray-800 transition md:mt-auto md:font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isModifying ? (
                    <div className="flex items-center gap-2">
                        <div className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent"/>
                        Saving...
                    </div>
                ) : isEditing ? "Save Changes" : "Modify User"}
              </Button>
            </div>
          </div>
        </div>

        {/* Permissions Grid */}
        <div className="relative rounded-lg border-2 md:border-4 bg-white p-4 md:p-6 overflow-hidden min-h-[400px]">
        {allRoles.length === 0 ? (
            <div className="flex justify-center items-center h-48">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#1A225D]"></div>
            </div>
          ) : (
            <>
            {/* Loading Overlay */}
            {isPermissionsLoading && (
                <div className="absolute inset-0 z-10 flex items-center justify-center bg-white/60 backdrop-blur-[1px]">
                     <div className="flex flex-col items-center">
                        <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-[#1A225D] mb-2"></div>
                        <p className="text-sm text-[#1A225D] font-medium">Updating permissions...</p>
                     </div>
                </div>
            )}
            
            {/* Masonry Layout using CSS columns */}
            <div className={getGridClass()}>
                {allRoles.map(role => (
                    <PermissionSection 
                        key={role.id}
                        title={role.name}
                        items={role.permissions}
                        checkedIds={userPermissionIds}
                        onToggle={handlePermissionToggle}
                        onGroupToggle={handleGroupToggle}
                        className="break-inside-avoid mb-6"
                        disabled={!isEditing}
                    />
                ))}
            </div>
            </>
          )}
        </div>
      </main>
    </div>
  );
}

const PermissionSection = React.memo(function PermissionSection({
  title,
  items,
  checkedIds,
  onToggle,
  onGroupToggle,
  className = "",
  disabled = false,
}: {
  title: string;
  items: Permission[];
  checkedIds: Set<number>;
  onToggle: (id: number, checked: boolean) => void;
  onGroupToggle: (ids: number[], checked: boolean) => void;
  className?: string;
  disabled?: boolean;
}) {
  const allChecked = items && items.length > 0 && items.every(item => checkedIds.has(item.id));

  return (
    <div className={`space-y-4 ${className}`}>
      <div className="flex items-center gap-2 mb-2">
        <Checkbox 
           id={`group-${title}`}
           className="h-4 w-4 shrink-0"
           colorClass="data-[state=checked]:bg-green-700 data-[state=checked]:text-white"
           disabled={disabled}
           checked={allChecked}
           onCheckedChange={(checked) => {
             if (items && items.length > 0) {
                 onGroupToggle(items.map(i => i.id), checked as boolean);
             }
           }}
        />
        <h3 className="text-lg font-semibold text-gray-900 truncate" title={title}>{title}</h3>
      </div>
      <div className="flex flex-col gap-2 space-y-2 bg-[#F2F2F2] p-3 rounded-md">
        {items && items.length > 0 ? (
            items.map((item) => (
            <div key={item.id} className="flex justify-between items-center gap-2">
                <label htmlFor={`perm-${item.id}`} className="text-xs leading-tight break-words flex-1 cursor-pointer">
                {item.name}
                </label>

                <Checkbox
                colorClass="data-[state=checked]:bg-green-700 data-[state=checked]:text-white"
                id={`perm-${item.id}`}
                checked={checkedIds.has(item.id)}
                onCheckedChange={(checked) => onToggle(item.id, checked as boolean)}
                className="h-4 w-4 shrink-0"
                disabled={disabled}
                />
            </div>
            ))
        ) : (
            <p className="text-xs text-gray-500 italic">No permissions</p>
        )}
      </div>
    </div>
  );
});

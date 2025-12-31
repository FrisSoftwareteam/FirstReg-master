import { useState, useRef, useEffect } from "react";

export interface User {
  id: number;
  email: string;
  first_name: string;
  last_name: string;
  department: string | null;
  is_active: boolean;
  profile_picture: string | null;
  [key: string]: any;
}

interface UserSelectProps {
  users: User[];
  value: User | null;
  onChange: (user: User) => void;
  placeholder?: string;
  onLoadMore: () => void;
  hasMore: boolean;
  loading: boolean;
}

export default function UserSelect({
  users,
  value,
  onChange,
  placeholder,
  onLoadMore,
  hasMore,
  loading,
}: UserSelectProps) {
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState("");
  const ref = useRef<HTMLDivElement>(null);
  const listRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) setSearch("");
    function handleClick(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    if (open) {
      document.addEventListener("mousedown", handleClick);
    } else {
      document.removeEventListener("mousedown", handleClick);
    }
    return () => document.removeEventListener("mousedown", handleClick);
  }, [open]);

  const handleScroll = () => {
    if (listRef.current) {
      const { scrollTop, scrollHeight, clientHeight } = listRef.current;
      if (scrollHeight - scrollTop <= clientHeight + 50 && hasMore && !loading) {
        onLoadMore();
      }
    }
  };

  const filtered = users.filter((u) => {
    const fullName = `${u.first_name} ${u.last_name}`.toLowerCase();
    const email = u.email?.toLowerCase() || "";
    const searchTerm = search.toLowerCase();
    return fullName.includes(searchTerm) || email.includes(searchTerm);
  });

  const displayValue = value ? `${value.first_name} ${value.last_name}` : placeholder || "Select a user";

  return (
    <div className="relative" ref={ref}>
      <button
        type="button"
        className="w-full flex items-center justify-between rounded border px-3 py-2 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        onClick={() => setOpen((o) => !o)}
      >
        <span>{displayValue}</span>
        <svg
          className="w-4 h-4 ml-2"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </button>
      {open && (
        <div className="absolute z-10 mt-1 w-full rounded bg-white border shadow-lg">
          <input
            type="text"
            placeholder="Search users..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full border-b px-2 py-1 text-sm focus:outline-none"
            autoFocus
          />
          <div 
            className="max-h-48 overflow-y-auto"
            ref={listRef}
            onScroll={handleScroll}
          >
            {filtered.length === 0 && !loading ? (
              <div className="px-4 py-2 text-sm text-gray-500">
                No users found
              </div>
            ) : (
              <>
                {filtered.map((user) => (
                  <button
                    key={`${user.id}-${user.email}`}
                    type="button"
                    className={`w-full text-left px-4 py-2 text-sm hover:bg-blue-100 ${
                      value?.id === user.id ? "bg-blue-50 font-semibold" : ""
                    }`}
                    onClick={() => {
                      onChange(user);
                      setOpen(false);
                      setSearch("");
                    }}
                  >
                     <div className="flex flex-col">
                        <span className="font-medium">{user.first_name} {user.last_name}</span>
                        <span className="text-xs text-gray-500">{user.email}</span>
                     </div>
                  </button>
                ))}
                {loading && (
                   <div className="px-4 py-2 text-sm text-center text-gray-500">
                     Loading more...
                   </div>
                )}
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

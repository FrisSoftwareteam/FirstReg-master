import { useState, useRef, useEffect } from "react";

interface UserSelectProps {
  users: string[];
  value: string;
  onChange: (user: string) => void;
  placeholder?: string;
}

export default function UserSelect({
  users,
  value,
  onChange,
  placeholder,
}: UserSelectProps) {
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState("");
  const ref = useRef<HTMLDivElement>(null);

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

  const filtered = users.filter((u) =>
    u.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="relative" ref={ref}>
      <button
        type="button"
        className="w-full flex items-center justify-between rounded border px-3 py-2 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        onClick={() => setOpen((o) => !o)}
      >
        <span>{value || placeholder || "Select"}</span>
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
          <div className="max-h-48 overflow-y-auto">
            {filtered.length === 0 ? (
              <div className="px-4 py-2 text-sm text-gray-500">
                No users found
              </div>
            ) : (
              filtered.map((user) => (
                <button
                  key={user}
                  type="button"
                  className={`w-full text-left px-4 py-2 text-sm hover:bg-blue-100 ${
                    user === value ? "bg-blue-50 font-semibold" : ""
                  }`}
                  onClick={() => {
                    onChange(user);
                    setOpen(false);
                    setSearch("");
                  }}
                >
                  {user}
                </button>
              ))
            )}
          </div>
        </div>
      )}
    </div>
  );
}

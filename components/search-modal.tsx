"use client";

import type React from "react";

import { useState } from "react";
import { Search, X } from "lucide-react";
import { useRouter } from "next/navigation";

interface SearchModalProps {
  onSelectShareholder: (shareholder: any) => void;
  setShowSearch: (val: boolean) => void;
}

export function SearchModal({
  onSelectShareholder,
  setShowSearch,
}: SearchModalProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState<any[]>([]);
  const [hasSearched, setHasSearched] = useState(false);
  const router = useRouter();

  const mockShareholders = [
    {
      id: 1,
      name: "Amadu Pinock",
      chnNo: "001234567",
      cscsNo: "CS001234567",
      holding: "1,200 units",
      company: "Four (4)",
      email: "amadu@email.com",
      phone: "+234 080 77 23 42 11",
      address: "2 Aminu Kano Crescent, Ikoyi Lagos state, Nigeria",
      shareholderType: "Individual",
      holderNo: "FRS-2211-222",
      totalHoldings: 19000,
      clearingHouse: "2223223338888",
      bank: "Guarantee Trust Bank PLC",
      account: "200223458",
      bankType: "Current",
      bankStatus: "Active",
    },
    {
      id: 2,
      name: "John Doe",
      chnNo: "002345678",
      cscsNo: "CS002345678",
      holding: "500 units",
      company: "Two (2)",
      email: "john.doe@email.com",
      phone: "+234 234 567 8901",
      address: "Lagos, Nigeria",
      shareholderType: "Individual",
      holderNo: "HLD002345",
      totalHoldings: 5000,
      clearingHouse: "CSCS",
      bank: "Access Bank PLC",
      account: "123456789",
      bankType: "Savings",
      bankStatus: "Active",
    },
    {
      id: 3,
      name: "Jane Smith",
      chnNo: "003456789",
      cscsNo: "CS003456789",
      holding: "2,500 units",
      company: "Three (3)",
      email: "jane.smith@email.com",
      phone: "+234 345 678 9012",
      address: "Abuja, Nigeria",
      shareholderType: "Corporate",
      holderNo: "HLD003456",
      totalHoldings: 15000,
      clearingHouse: "CSCS",
      bank: "First Bank Nigeria PLC",
      account: "987654321",
      bankType: "Current",
      bankStatus: "Inactive",
    },
    {
      id: 4,
      name: "Robert Johnson",
      chnNo: "004567890",
      cscsNo: "CS004567890",
      holding: "800 units",
      company: "One (1)",
      email: "robert.j@email.com",
      phone: "+234 456 789 0123",
      address: "Port Harcourt, Nigeria",
      shareholderType: "Individual",
      holderNo: "HLD004567",
      totalHoldings: 8000,
      clearingHouse: "CSCS",
      bank: "Zenith Bank PLC",
      account: "456789123",
      bankType: "Current",
      bankStatus: "Active",
    },
  ];

  const handleSearchInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchTerm(value);
    setHasSearched(true);

    if (!value.trim()) {
      setSearchResults([]);
      return;
    }

    const filtered = mockShareholders.filter(
      (sh) =>
        sh.name.toLowerCase().includes(value.toLowerCase()) ||
        sh.chnNo.includes(value) ||
        sh.cscsNo.includes(value)
    );
    setSearchResults(filtered);
  };

  const handleInputKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      // Trigger search if needed
    }
  };

  const clearSearch = () => {
    setSearchTerm("");
    setSearchResults([]);
    setHasSearched(false);
  };

  const onClose = () => {
    setShowSearch(false);
    router.push("/dashboard");
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center">
      <div className="bg-[#FAF9F6] rounded-2xl shadow-lg p-6 md:p-10 w-[90vw] md:w-[70vw] max-h-[80vh] overflow-y-auto min-h-[60vh]">
        {/* Header */}
        <div className="text-center mb-8 relative">
          <h1 className="text-2xl font-bold text-slate-900 mb-2">
            Welcome to Shareholder Management
          </h1>
          <p className="text-gray-600">
            Search/ Select a Shareholder to Continue
          </p>
          <button
            onClick={onClose}
            className="text-muted-foreground hover:text-foreground absolute right-0.5 md:right-6 top-0.5 md:top-6"
          >
            <X className="w-6 h-6 font-bold" />
          </button>
        </div>

        {/* Search Input */}
        <div className="flex gap-2 mb-6 items-center justify-center">
          <div className="relative w-[70%] flex justify-center">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search shareholder name, CHN No, CSCS No"
              value={searchTerm}
              onChange={handleSearchInputChange}
              onKeyPress={handleInputKeyPress}
              className="w-full pl-10 pr-10 py-2 md:py-6 border border-gray-600 focus:outline-none bg-white rounded-full"
              autoFocus
            />
            {searchTerm && (
              <button
                onClick={clearSearch}
                className="absolute right-8 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                <X className="w-5 h-5" />
              </button>
            )}
            {/* <button className="absolute right-3 top-1/2 transform -translate-y-1/2 px-8 py-3 bg-primary text-white font-medium hidden md:flex rounded-full">
              Search
            </button> */}
          </div>
        </div>

        {/* Results */}
        {hasSearched && (
          <div className="mb-6">
            <p className="text-gray-600 mb-4">
              Search results:{" "}
              <span className="font-semibold text-slate-900">
                {searchResults.length}
              </span>
            </p>

            {searchResults.length > 0 ? (
              <div className="overflow-x-auto border rounded-lg bg-[#F2F2F2]">
                <table className="w-full">
                  <thead>
                    <tr className="border-b bg-gray-100">
                      <th className="text-left px-4 py-3 font-semibold text-sm text-slate-900">
                        Name
                      </th>
                      <th className="text-left px-4 py-3 font-semibold text-sm text-slate-900">
                        CHN NO
                      </th>
                      <th className="text-left px-4 py-3 font-semibold text-sm text-slate-900">
                        CSCS NO
                      </th>
                      <th className="text-left px-4 py-3 font-semibold text-sm text-slate-900">
                        Holding
                      </th>
                      <th className="text-left px-4 py-3 font-semibold text-sm text-slate-900">
                        Company/Register
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {searchResults.map((result) => (
                      <tr
                        key={result.id}
                        className="border-b hover:bg-gray-200 cursor-pointer transition-colors"
                        onClick={() => onSelectShareholder(result)}
                      >
                        <td className="px-4 py-3 text-slate-900">
                          {result.name}
                        </td>
                        <td className="px-4 py-3 text-gray-600">
                          {result.chnNo}
                        </td>
                        <td className="px-4 py-3 text-gray-600">
                          {result.cscsNo}
                        </td>
                        <td className="px-4 py-3 text-gray-600">
                          {result.holding}
                        </td>
                        <td className="px-4 py-3 text-gray-600">
                          {result.company}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <div className="text-center py-12 border rounded-lg bg-gray-50">
                <p className="text-gray-600">
                  No shareholders found matching your search.
                </p>
              </div>
            )}
          </div>
        )}

        {!hasSearched && (
          <div className="text-center py-12 text-gray-600">
            <p>Start typing to search for a shareholder</p>
          </div>
        )}
      </div>
    </div>
  );
}

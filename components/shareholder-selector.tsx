"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";

interface ShareholderSelectorProps {
  currentShareholder: any;
  onSelectShareholder: (shareholder: any) => void;
}

export function ShareholderSelector({
  currentShareholder,
  onSelectShareholder,
}: ShareholderSelectorProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  const mockShareholders = [
    {
      id: 1,
      name: "Amadu Pinock",
      chnNo: "001234567",
      cscsNo: "CS001234567",
      holding: "1,200 units",
      company: "Nigeria Breweries PLC",
      email: "amadu@email.com",
      phone: "+234 123 456 7890",
      address: "2 Aminu Kano Crescent, Ikoyi, Lagos, Nigeria",
      shareholderType: "Individual",
      nextOfKin: "Kano Aisha",
      holderNo: "HLD001234",
      totalHoldings: 3,
      clearingHouse: "CSCS",
      bank: "Amodu Pinnock",
      bankAccount: "2002128458",
      accountType: "Current",
    },
    {
      id: 2,
      name: "John Doe",
      chnNo: "002345678",
      cscsNo: "CS002345678",
      holding: "500 units",
      company: "ABC Transport PLC",
      email: "john.doe@email.com",
      phone: "+234 234 567 8901",
      address: "Lagos, Nigeria",
      shareholderType: "Individual",
      nextOfKin: "Jane Doe",
      holderNo: "HLD002345",
      totalHoldings: 2,
      clearingHouse: "CSCS",
      bank: "John Bank",
      bankAccount: "1234567890",
      accountType: "Current",
    },
    {
      id: 3,
      name: "Jane Smith",
      chnNo: "003456789",
      cscsNo: "CS003456789",
      holding: "2,500 units",
      company: "Cadbury PLC",
      email: "jane.smith@email.com",
      phone: "+234 345 678 9012",
      address: "Abuja, Nigeria",
      shareholderType: "Corporate",
      nextOfKin: "Not Applicable",
      holderNo: "HLD003456",
      totalHoldings: 5,
      clearingHouse: "CSCS",
      bank: "Jane Smith Bank",
      bankAccount: "9876543210",
      accountType: "Current",
    },
    {
      id: 4,
      name: "Robert Johnson",
      chnNo: "004567890",
      cscsNo: "CS004567890",
      holding: "800 units",
      company: "Cardinal Stones",
      email: "robert.j@email.com",
      phone: "+234 456 789 0123",
      address: "Port Harcourt, Nigeria",
      shareholderType: "Individual",
      nextOfKin: "Michael Johnson",
      holderNo: "HLD004567",
      totalHoldings: 1,
      clearingHouse: "CSCS",
      bank: "Robert Bank",
      bankAccount: "5555555555",
      accountType: "Current",
    },
  ];

  const filtered = mockShareholders.filter((sh) =>
    sh.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="flex-1">
      <div className="relative">
        <label className="block text-sm font-semibold text-slate-900 mb-2">
          Select Shareholder
        </label>
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="w-full flex items-center justify-between px-4 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors text-slate-900"
        >
          <span className="text-sm">
            {currentShareholder?.name || "Select..."}
          </span>
          <ChevronDown
            className={`w-4 h-4 flex-shrink-0 transition-transform text-gray-400 ${
              isOpen ? "rotate-180" : ""
            }`}
          />
        </button>

        {isOpen && (
          <div className="absolute top-full left-0 right-0 mt-2 bg-white border border-gray-300 rounded-lg shadow-lg z-10">
            <input
              type="text"
              placeholder="Search..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full px-4 py-2 border-b border-gray-200 focus:outline-none text-sm"
              autoFocus
            />
            <div className="max-h-48 overflow-y-auto">
              {filtered.map((sh) => (
                <button
                  key={sh.id}
                  onClick={() => {
                    onSelectShareholder(sh);
                    setIsOpen(false);
                    setSearchTerm("");
                  }}
                  className="w-full text-left px-4 py-2 hover:bg-gray-50 transition-colors text-slate-900 text-sm border-b border-gray-100 last:border-b-0"
                >
                  {sh.name}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

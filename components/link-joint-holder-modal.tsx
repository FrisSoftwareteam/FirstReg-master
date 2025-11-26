"use client";

import { X, Search } from "lucide-react";
import { useState } from "react";

interface LinkJointHolderModalProps {
  onClose: () => void;
}

export function LinkJointHolderModal({ onClose }: LinkJointHolderModalProps) {
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-2xl shadow-lg w-full max-w-4xl min-h-[60vh] max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6">
          <div className="flex flex-col items-center w-full">
            <h2 className="text-xl font-bold text-slate-900 font-ubuntu">
              Link a Joint Holder/Minor
            </h2>
            <p className="text-sm text-gray-500 mt-1">
              Search/ Select a Shareholder to Continue
            </p>
          </div>
          <button
            onClick={onClose}
            className="text-slate-500 hover:text-slate-900"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6">
          {/* Search Bar */}
          <div className="flex gap-3 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search shareholder name, CHN No, CSCS No, Account No"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <button className="bg-[#0F2763] text-white px-8 py-3 rounded-full hover:bg-slate-800">
              Search
            </button>
          </div>

          {/* Search Results */}
          <div>
            <p className="text-sm text-slate-700 mb-4">Search results:</p>

            {/* Results Table */}
            <div className="border border-gray-300 rounded-lg overflow-hidden">
              <table className="w-full">
                <thead className="bg-gray-100">
                  <tr>
                    <th className="px-4 py-3 text-left text-sm font-semibold text-slate-700">
                      Name
                    </th>
                    <th className="px-4 py-3 text-left text-sm font-semibold text-slate-700">
                      CHN NO
                    </th>
                    <th className="px-4 py-3 text-left text-sm font-semibold text-slate-700">
                      CSCS NO
                    </th>
                    <th className="px-4 py-3 text-left text-sm font-semibold text-slate-700">
                      Holding
                    </th>
                    <th className="px-4 py-3 text-left text-sm font-semibold text-slate-700">
                      Company/Register
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {/* Empty state - results will populate when search is performed */}
                  <tr>
                    <td
                      colSpan={5}
                      className="px-4 py-12 text-center text-gray-400 text-sm"
                    >
                      No results found. Try searching for a shareholder.
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

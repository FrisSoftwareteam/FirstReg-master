"use client";

import { X, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";

interface MergeAccountModalProps {
  onClose: () => void;
}

export function MergeAccountModal({ onClose }: MergeAccountModalProps) {
  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-2xl shadow-lg w-full max-w-3xl max-h-[90vh] overflow-y-auto p-8">
        {/* Header */}
        <div className="flex items-center justify-between p-6">
          <div className="flex flex-col items-center w-full">
            <h2 className="text-xl font-bold text-slate-900 font-ubuntu">
              Merge two existing Account
            </h2>
            <p className="text-sm text-gray-500 mt-1">
              Consolidation of Accounts
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
        <div className="p-6 space-y-6">
          {/* Account to Merge */}
          <div className="bg-[#F2F2F2] rounded-3xl p-4">
            <h3 className="text-lg font-semibold text-slate-900 mb-4">
              Account to Merge
            </h3>
            <div className="space-y-3">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-sm text-slate-700 mb-2">
                    Account Holder
                  </label>
                  <select className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-white">
                    <option>Amadu Pinock</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm text-slate-700 mb-2">
                    Holdings
                  </label>
                  <input
                    type="text"
                    defaultValue="1200"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-white"
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-sm text-slate-700 mb-2">
                    Holder's Number
                  </label>
                  <input
                    type="text"
                    defaultValue="23232"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-white"
                  />
                </div>
                <div>
                  <label className="block text-sm text-slate-700 mb-2">
                    CHN Number
                  </label>
                  <input
                    type="text"
                    defaultValue="1200"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-white"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm text-slate-700 mb-2">
                  Address
                </label>
                <div className="relative">
                  <MapPin className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Enter here"
                    className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Destination Account */}
          <div className="bg-[#F2F2F2] rounded-3xl p-4">
            <h3 className="text-lg font-semibold text-slate-900 mb-4">
              Destination Account
            </h3>
            <div className="space-y-3">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-sm text-slate-700 mb-2">
                    Account Holder
                  </label>
                  <select className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-white">
                    <option>Select Options</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm text-slate-700 mb-2">
                    Holdings
                  </label>
                  <input
                    type="text"
                    placeholder="Enter here"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-sm text-slate-700 mb-2">
                    Holder's Number
                  </label>
                  <input
                    type="text"
                    defaultValue="23232"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-white"
                  />
                </div>
                <div>
                  <label className="block text-sm text-slate-700 mb-2">
                    CHN Number
                  </label>
                  <input
                    type="text"
                    defaultValue="1200"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-white"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm text-slate-700 mb-2">
                  Address
                </label>
                <div className="relative">
                  <MapPin className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Enter here"
                    className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Merge Button */}
          <div className="flex justify-center">
            <Button className="bg-[#0F2763] text-white hover:bg-slate-800 w-[50%] py-4 rounded-full text-base">
              Merge Accounts
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

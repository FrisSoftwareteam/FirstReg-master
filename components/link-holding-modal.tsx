"use client";

import { X } from "lucide-react";
import { Button } from "@/components/ui/button";

interface LinkHoldingModalProps {
  onClose: () => void;
}

export function LinkHoldingModal({ onClose }: LinkHoldingModalProps) {
  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-2xl shadow-lg w-full max-w-4xl p-10">
        {/* Header */}
        <div className="flex items-center justify-between p-6">
          <h2 className="text-xl font-bold text-slate-900 font-ubuntu text-center w-full">
            Link New Holding, Register/Company
          </h2>
          <button
            onClick={onClose}
            className="text-slate-500 hover:text-slate-900"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 bg-[#F2F2F2] rounded-2xl mb-4">
          <h3 className="text-lg font-semibold text-slate-900 mb-4">
            Holding Information
          </h3>

          <div className="space-y-4 mb-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm text-slate-700 mb-2">
                  Company/Register
                </label>
                <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
                  <option>Select Options</option>
                  <option>Nigeria Breweries PLC</option>
                  <option>ABC Transport PLC</option>
                  <option>Cadbury PLC</option>
                </select>
              </div>
              <div>
                <label className="block text-sm text-slate-700 mb-2">
                  Clearing House/StockBroker
                </label>
                <input
                  type="text"
                  placeholder="Enter here"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm text-slate-700 mb-2">
                  CHN No
                </label>
                <input
                  type="text"
                  placeholder="Enter here"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm text-slate-700 mb-2">
                  Holdings
                </label>
                <input
                  type="text"
                  placeholder="Enter here"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm text-slate-700 mb-2">
                  CSCS NO
                </label>
                <input
                  type="text"
                  placeholder="Enter here"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm text-slate-700 mb-2">
                  Unit Amount
                </label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-green-600 font-bold">
                    ₦
                  </span>
                  <input
                    type="text"
                    placeholder="Enter here"
                    className="w-full pl-8 pr-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* Save Button */}
        <div className="flex justify-center">
          <Button className="bg-[#0F2763] text-white hover:bg-slate-800 w-[50%] py-4 rounded-full text-base">
            Save
          </Button>
        </div>
      </div>
    </div>
  );
}

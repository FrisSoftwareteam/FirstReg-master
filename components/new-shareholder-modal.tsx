"use client";

import { X, MapPin, User, Mail, Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";

interface NewShareholderModalProps {
  onClose: () => void;
}

export function NewShareholderModal({ onClose }: NewShareholderModalProps) {
  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50 overflow-y-auto">
      <div className="bg-white rounded-3xl shadow-lg w-full max-w-[90vw] max-h-[90vh] overflow-y-auto my-8 py-4">
        {/* Header */}
        <div className="flex items-center justify-between p-4 sticky top-0 bg-white z-10">
          <div className="flex flex-col items-center w-full">
            <h2 className="text-xl font-bold font-ubuntu text-slate-900">
              New Shareholder Registration
            </h2>
            <p className="text-sm text-gray-500 mt-1">
              Create new profile/account for shareholder of your NGX listed
              companies/registers
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
        <div className="px-10 text-sm">
          <div className="grid md:grid-cols-2 gap-6 mb-6">
            {/* Personal Information */}
            <div className="space-y-4 bg-[#F2F2F2] px-6 py-2 rounded-2xl">
              <h3 className="text-lg font-semibold text-slate-900 mb-3">
                Personal Information
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <div>
                  <label className="block text-sm text-slate-700 mb-2">
                    First Name
                  </label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <input
                      type="text"
                      placeholder="Enter here"
                      className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm text-slate-700 mb-2">
                    Last Name
                  </label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <input
                      type="text"
                      placeholder="Enter here"
                      className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <div>
                  <label className="block text-sm text-slate-700 mb-2">
                    Other Name
                  </label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <input
                      type="text"
                      placeholder="Enter here"
                      className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm text-slate-700 mb-2">
                    Email Address
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <input
                      type="email"
                      placeholder="Enter here"
                      className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <div>
                  <label className="block text-sm text-slate-700 mb-2">
                    Phone Number
                  </label>
                  <div className="flex gap-2">
                    <select className="px-3 py-2 border border-gray-300 rounded-lg">
                      <option>🇳🇬 +234</option>
                    </select>
                    <input
                      type="tel"
                      placeholder="Enter here"
                      className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm text-slate-700 mb-2">
                    Sex
                  </label>
                  <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
                    <option>Select Options</option>
                    <option>Male</option>
                    <option>Female</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm text-slate-700">Address</label>
                <div className="relative">
                  <MapPin className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Enter here"
                    className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <div className="text-right mt-1">
                    <span className="text-xs text-gray-400">
                      powered by <span className="font-semibold">Google</span>
                    </span>
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-sm text-slate-700">
                  Shareholder Type
                </label>
                <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
                  <option>Select Options</option>
                  <option>Individual</option>
                  <option>Corporate</option>
                </select>
              </div>
            </div>

            {/* Bank Mandate and Holding Information */}
            <div className="space-y-6 bg-[#F2F2F2] px-6 py-4 rounded-2xl">
              {/* Bank Mandate */}
              <div>
                <h3 className="text-lg font-semibold text-slate-900 mb-4">
                  Bank Mandate
                </h3>
                <div className="space-y-3">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-sm text-slate-700 mb-2">
                        Bank Name
                      </label>
                      <div className="relative">
                        <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                        <input
                          type="text"
                          placeholder="Enter here"
                          className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm text-slate-700 mb-2">
                        Account Number
                      </label>
                      <input
                        type="text"
                        placeholder="Enter here"
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm text-slate-700 mb-2">
                      Account Type
                    </label>
                    <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
                      <option>Select Options</option>
                      <option>Current</option>
                      <option>Savings</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Holding Information */}
              <div>
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-slate-900">
                    Holding Information
                  </h3>
                  <button className="text-sm border border-gray-300 px-3 py-1 rounded-lg hover:bg-gray-50">
                    + Add new
                  </button>
                </div>
                <div className="space-y-3">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-sm text-slate-700 mb-2">
                        Company/Register
                      </label>
                      <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
                        <option>Select Options</option>
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
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
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
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
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
            </div>

            {/* Government Approved ID */}
            <div className="pt-4 bg-[#F2F2F2] px-6 py-4 rounded-2xl">
              <h4 className="text-lg font-semibold text-slate-900 mb-4">
                Government Approved ID
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <div>
                  <label className="block text-sm text-slate-700 mb-2">
                    ID Type
                  </label>
                  <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
                    <option>Select Options</option>
                    <option>National ID</option>
                    <option>Driver's License</option>
                    <option>Passport</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm text-slate-700 mb-2">
                    Name of ID
                  </label>
                  <input
                    type="text"
                    placeholder="Enter here"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-3">
                <div>
                  <label className="block text-sm text-slate-700 mb-2">
                    ID Number
                  </label>
                  <input
                    type="text"
                    placeholder="Enter Here"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm text-slate-700 mb-2">
                    Expiry Date
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      placeholder="DD-DD-DD"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <Calendar className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Save Button */}
          <div className="flex justify-center">
            <Button className="bg-[#0F2763] text-white hover:bg-slate-800 w-[35%] py-4 rounded-full text-base">
              Save
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

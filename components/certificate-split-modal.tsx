"use client";

import { X, Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";

interface CertificateSplitModalProps {
  onClose: () => void;
}

export function CertificateSplitModal({ onClose }: CertificateSplitModalProps) {
  const [splitType, setSplitType] = useState("split");

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl max-w-4xl w-full max-h-[95vh] overflow-y-auto p-6">
        <div className="sticky top-0 bg-white px-6 py-1 flex items-center justify-between">
          <h2 className="text-xl font-bold text-slate-900 font-ubuntu w-full text-center">
            Certificate Splitting
          </h2>
          <button
            onClick={onClose}
            className="text-slate-600 hover:text-slate-900"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="p-6">
          {/* Radio Options */}
          <div className="flex flex-wrap gap-6 mb-6 justify-center sticky top-14">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="radio"
                name="splitType"
                value="split"
                checked={splitType === "split"}
                onChange={(e) => setSplitType(e.target.value)}
                className="w-4 h-4"
              />
              <span className="text-sm font-medium text-slate-900">Split</span>
            </label>
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="radio"
                name="splitType"
                value="bonus"
                checked={splitType === "bonus"}
                onChange={(e) => setSplitType(e.target.value)}
                className="w-4 h-4"
              />
              <span className="text-sm font-medium text-slate-900">
                Bonus Modification
              </span>
            </label>
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="radio"
                name="splitType"
                value="duplicate"
                checked={splitType === "duplicate"}
                onChange={(e) => setSplitType(e.target.value)}
                className="w-4 h-4"
              />
              <span className="text-sm font-medium text-slate-900">
                Duplicate Certificate
              </span>
            </label>
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="radio"
                name="splitType"
                value="others"
                checked={splitType === "others"}
                onChange={(e) => setSplitType(e.target.value)}
                className="w-4 h-4"
              />
              <span className="text-sm font-medium text-slate-900">Others</span>
            </label>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {/* Certificate Details (Source) */}
            <div className="bg-[#F2F2F2] rounded-2xl p-4 space-y-4">
              <h3 className="font-bold text-slate-900">
                Certificate Details(Source)
              </h3>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Certificate
                </label>
                <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
                  <option>Select Options</option>
                </select>
              </div>

              <div>
                <p className="text-sm font-semibold text-slate-900 mb-3">
                  Details
                </p>

                <div className="space-y-3">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Account Number
                    </label>
                    <input
                      type="text"
                      placeholder="Enter here"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Certificate Number
                    </label>
                    <input
                      type="text"
                      placeholder="Enter here"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Name
                    </label>
                    <input
                      type="text"
                      placeholder="Enter here"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Unit
                    </label>
                    <input
                      type="text"
                      placeholder="Enter here"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Certificate Status
                    </label>
                    <input
                      type="text"
                      placeholder="Enter here"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Split Details (Destination) */}
            <div className="bg-[#F2F2F2] rounded-2xl p-4 space-y-4">
              <h3 className="font-bold text-slate-900">
                Split Details(Destination)
              </h3>

              <div className="space-y-3">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Account Number
                  </label>
                  <input
                    type="text"
                    placeholder="Enter here"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Name
                  </label>
                  <input
                    type="text"
                    placeholder="Enter here"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Certificate Number
                  </label>
                  <input
                    type="text"
                    placeholder="Enter here"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Unit $
                  </label>
                  <div className="flex items-center gap-2">
                    {/* <span className="text-green-600 text-lg">₦</span> */}
                    <input
                      type="text"
                      placeholder="Enter here"
                      className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Issue Date
                  </label>
                  <div className="relative">
                    <input
                      type="date"
                      placeholder="DD-MM-YY"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    {/* <Calendar className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" /> */}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Narration */}
          <div className="mt-6 bg-[#F2F2F2] rounded-2xl p-4">
            <h3 className="font-bold text-slate-900 mb-3">Narration</h3>
            <textarea
              placeholder="Enter reason for splitting here"
              rows={4}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
            />
          </div>

          <div className="mt-6 w-full flex justify-center">
            <Button className="bg-[#0F2763] w-[50%] text-primary-foreground hover:bg-primary/90 rounded-full">
              Split Certificate
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

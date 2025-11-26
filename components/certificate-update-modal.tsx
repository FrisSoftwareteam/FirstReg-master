"use client";

import { X } from "lucide-react";
import { Button } from "@/components/ui/button";

interface CertificateUpdateModalProps {
  onClose: () => void;
}

export function CertificateUpdateModal({
  onClose,
}: CertificateUpdateModalProps) {
  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto p-10">
        <div className="sticky top-0 bg-white px-6 py-4 flex items-center justify-between">
          <h2 className="text-xl font-bold text-slate-900 font-ubuntu text-center w-full">
            Certificate Update
          </h2>
          <button
            onClick={onClose}
            className="text-slate-600 hover:text-slate-900"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="p-6 bg-[#F2F2F2] rounded-2xl">
          <div className="p-6 space-y-4">
            {/* <h3 className="text-slate-900 text-xl font-sans">
              Certificate Update
            </h3> */}

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

              <div className="grid md:grid-cols-2 gap-4">
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
                    Issue Date
                  </label>
                  <input
                    type="text"
                    placeholder="Enter here"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Units
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

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Transfer Number
                  </label>
                  <input
                    type="text"
                    placeholder="Enter here"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Source Account
                  </label>
                  <input
                    type="text"
                    placeholder="Enter here"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Stopped
                  </label>
                  <input
                    type="text"
                    placeholder="Enter here"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Narration
              </label>
              <textarea
                placeholder="Enter here"
                rows={4}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
              />
            </div>
          </div>
        </div>
        <div className="mt-6 grid md:grid-cols-2 gap-4">
          <Button className="w-full bg-[#0F2763] text-white hover:bg-slate-800 py-3 rounded-full">
            Stop Certificate
          </Button>
          <Button className="w-full border-2 border-slate-900 bg-white text-slate-900 hover:bg-gray-50 py-3 rounded-full">
            Cancel Certificate
          </Button>
        </div>
      </div>
    </div>
  );
}

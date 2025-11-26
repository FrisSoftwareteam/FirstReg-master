"use client";

import { X, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";

interface AmalgamateModalProps {
  onClose: () => void;
}

export function AmalgamateModal({ onClose }: AmalgamateModalProps) {
  const [showThirdCertificate, setShowThirdCertificate] = useState(false);

  const handleAddNew = () => {
    setShowThirdCertificate(true);
  };

  const handleRemoveThird = () => {
    setShowThirdCertificate(false);
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div
        className={`bg-white rounded-2xl w-full max-h-[90vh] overflow-y-auto p-6 transition-all duration-300 ${
          showThirdCertificate ? "max-w-6xl" : "max-w-4xl"
        }`}
      >
        <div className="sticky top-0 bg-white px-6 py-4 flex items-center justify-between">
          <h2 className="text-xl font-bold text-slate-900 font-ubuntu w-full text-center">
            Amalgamate
          </h2>
          <div className="flex items-center gap-3">
            {!showThirdCertificate && (
              <Button
                onClick={handleAddNew}
                className="border border-slate-300 bg-white text-slate-900 hover:bg-gray-50 gap-2 text-sm rounded-full"
              >
                <Plus className="w-4 h-4" />
                Add New
              </Button>
            )}
            <button
              onClick={onClose}
              className="text-slate-600 hover:text-slate-900"
            >
              <X className="w-6 h-6" />
            </button>
          </div>
        </div>

        <div className="p-6">
          <div
            className={`grid gap-6 transition-all duration-300 ${
              showThirdCertificate ? "md:grid-cols-3" : "md:grid-cols-2"
            }`}
          >
            {/* Certificate 1 */}
            <div className="bg-[#F2F2F2] rounded-2xl p-4 space-y-4">
              <h3 className="text-slate-900 font-sans text-lg">
                Certificate 1
              </h3>

              <div>
                <label className="block text-sm font-medium text-gray-500 mb-2">
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
                    <label className="block text-sm font-medium text-gray-500 mb-1">
                      Account Number
                    </label>
                    <input
                      type="text"
                      placeholder="Enter here"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-500 mb-1">
                      Certificate Number
                    </label>
                    <input
                      type="text"
                      placeholder="Enter here"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-500 mb-1">
                      Name
                    </label>
                    <input
                      type="text"
                      placeholder="Enter here"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-500 mb-1">
                      Unit
                    </label>
                    <input
                      type="text"
                      placeholder="Enter here"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-500 mb-1">
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

            {/* Certificate 2 */}
            <div className="bg-[#F2F2F2] rounded-2xl p-4 space-y-4">
              <h3 className="text-slate-900 font-sans text-lg">
                Certificate 2
              </h3>

              <div>
                <label className="block text-sm font-medium text-gray-500 mb-2">
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
                    <label className="block text-sm font-medium text-gray-500 mb-1">
                      Account Number
                    </label>
                    <input
                      type="text"
                      placeholder="Enter here"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-500 mb-1">
                      Certificate Number
                    </label>
                    <input
                      type="text"
                      placeholder="Enter here"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-500 mb-1">
                      Name
                    </label>
                    <input
                      type="text"
                      placeholder="Enter here"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-500 mb-1">
                      Unit
                    </label>
                    <input
                      type="text"
                      placeholder="Enter here"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-500 mb-1">
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

            {/* Certificate 3 - Conditionally Rendered */}
            {showThirdCertificate && (
              <div className="bg-[#F2F2F2] rounded-2xl p-4 space-y-4 animate-in fade-in slide-in-from-right duration-300">
                <div className="flex items-center justify-between">
                  <h3 className="text-slate-900 font-sans text-lg">
                    Certificate 3
                  </h3>
                  <button
                    onClick={handleRemoveThird}
                    className="text-slate-600 hover:text-slate-900 transition-colors"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-500 mb-2">
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
                      <label className="block text-sm font-medium text-gray-500 mb-1">
                        Account Number
                      </label>
                      <input
                        type="text"
                        placeholder="Enter here"
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-500 mb-1">
                        Certificate Number
                      </label>
                      <input
                        type="text"
                        placeholder="Enter here"
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-500 mb-1">
                        Name
                      </label>
                      <input
                        type="text"
                        placeholder="Enter here"
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-500 mb-1">
                        Unit
                      </label>
                      <input
                        type="text"
                        placeholder="Enter here"
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-500 mb-1">
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
            )}
          </div>

          <div className="mt-6 w-full flex justify-center">
            <Button className="bg-[#0F2763] w-[50%] text-primary-foreground hover:bg-primary/90 rounded-full">
              Amalgamate
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

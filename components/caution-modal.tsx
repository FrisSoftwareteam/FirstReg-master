"use client";

import { X, Upload } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";

interface CautionModalProps {
  onClose: () => void;
}

export function CautionModal({ onClose }: CautionModalProps) {
  const [reason, setReason] = useState("");

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
      <div className="bg-red-600 rounded-lg shadow-lg w-full max-w-2xl">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-red-700">
          <h2 className="text-xl font-bold text-white">Account Caution</h2>
          <button onClick={onClose} className="text-white hover:text-red-100">
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6">
          {/* Reason Field */}
          <div className="mb-6">
            <label className="block text-white font-medium mb-2">Reason</label>
            <textarea
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              placeholder="Enter here"
              className="w-full px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-white resize-none h-24"
            />
          </div>

          {/* File Upload */}
          <div className="mb-6">
            <label className="block text-white font-medium mb-2">
              Referenced note/ Supporting Document
            </label>
            <div className="p-6 border-2 border-dashed border-white rounded-lg text-center bg-white/10">
              <Upload className="w-8 h-8 text-white mx-auto mb-2" />
              <p className="text-sm font-medium text-white">
                Upload Cover/Business Image
              </p>
              <p className="text-xs text-white/80">JPG, JPEG, PNG</p>
            </div>
          </div>

          {/* Buttons */}
          <div className="flex gap-3">
            <Button
              onClick={onClose}
              className="flex-1 bg-slate-700 text-white hover:bg-slate-800"
            >
              Cancel
            </Button>
            <Button className="flex-1 bg-slate-900 text-white hover:bg-black">
              Caution Account
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

"use client";

import { Mail, Phone, MapPin, User, Edit2 } from "lucide-react";
import { Button } from "@/components/ui/button";

interface ShareholderInfoProps {
  shareholder: any;
  onEditPersonal: () => void;
  onEditBank: () => void;
}

export function ShareholderInfo({
  shareholder,
  onEditPersonal,
  onEditBank,
}: ShareholderInfoProps) {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* Personal Information */}
      <div className="bg-white rounded-lg shadow p-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-bold text-slate-900">
            Personal Information
          </h3>
          <Button
            onClick={onEditPersonal}
            className="border border-gray-300 bg-white text-slate-900 hover:bg-gray-50 gap-2 px-6"
          >
            <Edit2 className="w-4 h-4" />
            Edit
          </Button>
        </div>
        <div className="space-y-4">
          <div className="flex items-start gap-3">
            <Mail className="w-5 h-5 text-slate-600 flex-shrink-0 mt-0.5" />
            <span className="text-slate-700 text-sm">
              {shareholder?.email || "Email"}
            </span>
          </div>
          <div className="flex items-start gap-3">
            <Phone className="w-5 h-5 text-slate-600 flex-shrink-0 mt-0.5" />
            <span className="text-slate-700 text-sm">
              {shareholder?.phone || "Phone Number"}
            </span>
          </div>
          <div className="flex items-start gap-3">
            <MapPin className="w-5 h-5 text-slate-600 flex-shrink-0 mt-0.5" />
            <span className="text-slate-700 text-sm">
              {shareholder?.address || "Address"}
            </span>
          </div>
          <div className="flex items-start gap-3">
            <User className="w-5 h-5 text-slate-600 flex-shrink-0 mt-0.5" />
            <span className="text-slate-700 text-sm">
              {shareholder?.shareholderType || "Shareholder Type"}
            </span>
          </div>
        </div>
      </div>

      {/* Bank Mandates */}
      <div className="bg-white rounded-lg shadow p-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-bold text-slate-900">
            Bank Mandates (E-Dividend)
          </h3>
          <Button
            onClick={onEditBank}
            className="border border-gray-300 bg-white text-slate-900 hover:bg-gray-50 gap-2 px-6"
          >
            <Edit2 className="w-4 h-4" />
            Edit
          </Button>
        </div>
        <div className="space-y-4">
          <div>
            <p className="text-xs text-gray-500 font-medium mb-1">Bank:</p>
            <p className="font-medium text-slate-900">
              {shareholder?.bank || "-"}
            </p>
          </div>
          <div>
            <p className="text-xs text-gray-500 font-medium mb-1">Account:</p>
            <p className="font-medium text-slate-900">
              {shareholder?.account || "-"}
            </p>
          </div>
          <div>
            <p className="text-xs text-gray-500 font-medium mb-1">Type:</p>
            <p className="font-medium text-slate-900">
              {shareholder?.bankType || "-"}
            </p>
          </div>
          <div>
            <p className="text-xs text-gray-500 font-medium mb-1">Status:</p>
            <p className="font-medium text-slate-900">
              {shareholder?.bankStatus || "-"}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

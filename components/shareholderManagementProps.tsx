"use client";

import { X, UserPlus, Users } from "lucide-react";

interface ShareholderManagementModalProps {
  onCreateNew: () => void;
  onSearchExisting: () => void;
  onClose: () => void;
}

export function ShareholderManagementModal({
  onCreateNew,
  onSearchExisting,
  onClose,
}: ShareholderManagementModalProps) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="relative w-full max-w-md rounded-xl bg-white p-8">
        <button
          onClick={onClose}
          className="absolute right-6 top-6 text-slate-400 hover:text-slate-600"
        >
          <X className="h-6 w-6" />
        </button>

        <div className="text-center">
          <h2 className="text-2xl font-bold text-slate-900">
            Welcome to Shareholder Management
          </h2>
          <p className="mt-2 text-slate-600">Please select an action</p>
        </div>

        {/* Action Cards */}
        <div className="mt-8 space-y-4">
          {/* Create New Shareholder */}
          <button
            onClick={onCreateNew}
            className="group flex w-full flex-col items-center rounded-lg border-2 border-slate-200 px-6 py-8 transition hover:border-blue-400 hover:bg-blue-50"
          >
            <div className="mb-3 rounded-full bg-slate-100 p-3 group-hover:bg-blue-100">
              <UserPlus className="h-8 w-8 text-slate-700 group-hover:text-blue-600" />
            </div>
            <span className="font-medium text-slate-900 group-hover:text-blue-600">
              Create New Shareholder
            </span>
          </button>

          {/* Search Existing Shareholder */}
          <button
            onClick={onSearchExisting}
            className="group flex w-full flex-col items-center rounded-lg border-2 border-slate-200 px-6 py-8 transition hover:border-blue-400 hover:bg-blue-50"
          >
            <div className="mb-3 rounded-full bg-slate-100 p-3 group-hover:bg-blue-100">
              <Users className="h-8 w-8 text-slate-700 group-hover:text-blue-600" />
            </div>
            <span className="font-medium text-slate-900 group-hover:text-blue-600">
              Search Existing Shareholder
            </span>
          </button>
        </div>
      </div>
    </div>
  );
}

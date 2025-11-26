"use client";

import { useState } from "react";
import { X, MapPin, User, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";

interface ProbateAdministrationModalProps {
  onClose: () => void;
}

interface Administrator {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  sex: string;
  nextOfKin: string;
  address: string;
}

export function ProbateAdministrationModal({
  onClose,
}: ProbateAdministrationModalProps) {
  const [administrators, setAdministrators] = useState<Administrator[]>([
    {
      id: 1,
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      sex: "",
      nextOfKin: "",
      address: "",
    },
  ]);

  const addAdministrator = () => {
    const newId = administrators.length + 1;
    setAdministrators([
      ...administrators,
      {
        id: newId,
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        sex: "",
        nextOfKin: "",
        address: "",
      },
    ]);
  };

  const removeLastAdministrator = () => {
    setAdministrators(administrators.slice(0, -1));
  };

  const getAdministratorTitle = (index: number) => {
    if (index === 0) return "Main Administrator";
    const ordinal = [
      "2nd",
      "3rd",
      "4th",
      "5th",
      "6th",
      "7th",
      "8th",
      "9th",
      "10th",
    ];
    return `${ordinal[index - 1] || `${index + 1}th`} Main Administrator`;
  };

  const isLastAdministrator = (index: number) => {
    return index === administrators.length - 1;
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
      <div
        className={`bg-white rounded-2xl shadow-lg w-full max-h-[90vh] overflow-y-auto px-4 md:px-6 py-4 ${
          administrators.length > 1 ? "max-w-[90vw]" : "max-w-6xl"
        }`}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-4 md:p-6">
          <div className="flex flex-col items-center w-full">
            <h2 className="text-xl font-bold text-slate-900 font-ubuntu">
              Probate Administration
            </h2>
            <p className="text-sm text-gray-500 mt-1 text-center">
              Update a deceased Shareholder's record with new Administrators.
            </p>
          </div>
          <button
            onClick={onClose}
            className="text-slate-500 hover:text-slate-900 flex-shrink-0"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Content - Grid Layout */}
        <div
          className={`grid gap-4 p-4 md:p-6 transition-all duration-300 ${
            administrators.length === 1
              ? "grid-cols-1"
              : "grid-cols-1 lg:grid-cols-2"
          }`}
        >
          {administrators.map((admin, index) => (
            <AdministratorForm
              key={admin.id}
              title={getAdministratorTitle(index)}
              isLast={isLastAdministrator(index)}
              onAdd={addAdministrator}
              onRemove={removeLastAdministrator}
              showRemove={administrators.length > 1}
            />
          ))}
        </div>

        {/* Save Button */}
        <div className="flex justify-center pb-4">
          <Button className="bg-[#0F2763] text-white hover:bg-slate-800 px-20 md:px-32 lg:px-40 py-4 rounded-full text-base w-full md:w-auto">
            Save
          </Button>
        </div>
      </div>
    </div>
  );
}

interface AdministratorFormProps {
  title: string;
  isLast: boolean;
  onAdd: () => void;
  onRemove: () => void;
  showRemove: boolean;
}

function AdministratorForm({
  title,
  isLast,
  onAdd,
  onRemove,
  showRemove,
}: AdministratorFormProps) {
  return (
    <div className="bg-[#F2F2F2] px-4 md:px-6 py-4 rounded-2xl animate-in fade-in slide-in-from-bottom-4 duration-300">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-base md:text-lg font-semibold text-slate-900">
          {title}
        </h3>
        {isLast ? (
          <button
            onClick={onAdd}
            className="text-sm border border-gray-300 bg-white px-3 md:px-4 py-1.5 rounded-full hover:bg-gray-50 flex items-center gap-2 transition-colors"
          >
            <span className="text-lg">+</span> Add new
          </button>
        ) : (
          showRemove && (
            <button
              onClick={onRemove}
              className="text-sm border border-red-300 bg-white text-red-600 px-3 md:px-4 py-1.5 rounded-full hover:bg-red-50 flex items-center gap-2 transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          )
        )}
      </div>

      <div className="space-y-4 mb-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
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

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
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
          <div className="min-w-0">
            <label className="block text-sm text-slate-700 mb-2">
              Phone Number
            </label>
            <div className="flex gap-2 w-full">
              <select className="px-2 py-2 border border-gray-300 rounded-lg text-sm flex-shrink-0 w-20">
                <option>🇳🇬</option>
              </select>
              <input
                type="tel"
                placeholder="Enter here"
                className="flex-1 min-w-0 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm text-slate-700 mb-2">Sex</label>
            <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
              <option>Select Options</option>
              <option>Male</option>
              <option>Female</option>
            </select>
          </div>
          <div>
            <label className="block text-sm text-slate-700 mb-2">
              Next of Kin
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

        <div>
          <label className="block text-sm text-slate-700 mb-2">Address</label>
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
      </div>
    </div>
  );
}

"use client";

import { Plus, GitBranch, TrendingUp } from "lucide-react";
import { Button } from "@/components/ui/button";

interface ShareholderTabsProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
  shareholder: any;
}

export function ShareholderTabs({
  activeTab,
  onTabChange,
  shareholder,
}: ShareholderTabsProps) {
  const tabs = [
    { id: "holdings", label: "Holdings" },
    { id: "certificate", label: "Certificate" },
    { id: "dividend", label: "Dividend" },
    { id: "linked", label: "Linked Holders" },
    { id: "probates", label: "Probates" },
  ];

  const renderContent = () => {
    switch (activeTab) {
      case "holdings":
        return <HoldingsContent shareholder={shareholder} />;
      case "certificate":
        return <CertificateContent />;
      case "dividend":
        return <DividendContent />;
      case "linked":
        return <LinkedHoldersContent />;
      case "probates":
        return <ProbatesContent />;
      default:
        return null;
    }
  };

  return (
    <div>
      {/* Tabs */}
      <div className="flex border-b border-gray-200">
        {tabs.map((tab) => (
          <div>
            <button
              key={tab.id}
              onClick={() => onTabChange(tab.id)}
              className={`px-6 py-4 text-sm font-medium transition-colors border-b-2 relative bg-white ${
                activeTab === tab.id
                  ? "border-[#0F2763] text-slate-900"
                  : "border-transparent text-gray-600 hover:text-slate-900"
              }`}
            >
              {tab.label}
              {activeTab === tab.id && (
                <div className="absolute bottom-[-16px] left-1/2 transform -translate-x-1/2 w-7 h-7 rounded-full">
                  <svg
                    width="27"
                    height="26"
                    viewBox="0 0 27 26"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M26.8747 10.0262C26.8747 15.5636 21.292 25.2704 13.5958 25.2704C5.89959 25.2704 0 15.5636 0 10.0262C0 4.4889 5.89959 0 13.5958 0C21.292 0 26.8747 4.4889 26.8747 10.0262Z"
                      fill="#0F2763"
                    />
                    <path
                      d="M17.0514 18.9558C17.0514 16.9035 15.3876 15.0413 13.3353 15.0413C11.283 15.0413 9.61927 16.9035 9.61927 18.9558C9.61927 21.0082 11.283 22.6719 13.3353 22.6719C15.3876 22.6719 17.0514 21.0082 17.0514 18.9558Z"
                      fill="#FAB35F"
                    />
                  </svg>
                </div>
              )}
            </button>
          </div>
        ))}
      </div>

      {/* Content */}
      <div className="p-6">{renderContent()}</div>
    </div>
  );
}

function HoldingsContent({ shareholder }: { shareholder: any }) {
  const holdings = [
    {
      name: "Nigeria Breweries PLC",
      units: "1,200 units",
      price: "N97/share",
      value: "N116,400.00",
      broker: "Cardinal Stones",
    },
    {
      name: "ABC Transport PLC",
      units: "1,200 units",
      price: "N97/share",
      value: "N116,400.00",
      broker: "Cardinal Stones",
    },
    {
      name: "Cadbury PLC",
      units: "1,200 units",
      price: "N97/share",
      value: "N116,400.00",
      broker: "Cardinal Stones",
    },
    {
      name: "Nigeria Breweries PLC",
      units: "1,200 units",
      price: "N97/share",
      value: "N116,400.00",
      broker: "Cardinal Stones",
    },
  ];

  return (
    <div className="space-y-6">
      <div className="flex gap-3 flex-wrap">
        <Button className="bg-white border border-gray-300 text-slate-900 hover:bg-gray-50 gap-2">
          <Plus className="w-4 h-4" />
          Link New Register
        </Button>
        <Button className="bg-white border border-gray-300 text-slate-900 hover:bg-gray-50 gap-2">
          Merge Account
        </Button>
        <Button className="bg-white border border-gray-300 text-slate-900 hover:bg-gray-50 gap-2">
          Demerge Account
        </Button>
      </div>

      <div>
        <p className="text-sm text-gray-600 mb-4 font-medium">
          Total Holdings:{" "}
          <span className="font-bold text-slate-900">
            {shareholder?.totalHoldings || 19},000
          </span>
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {holdings.map((holding, i) => (
            <div key={i} className="bg-gray-100 rounded-lg p-4">
              <h4 className="font-bold text-slate-900 mb-2 text-sm">
                {holding.name}
              </h4>
              <p className="text-slate-700 mb-1 text-sm">{holding.units}</p>
              <p className="text-gray-600 text-xs mb-2">↗ {holding.price}</p>
              <p className="font-bold text-slate-900 text-sm">
                {holding.value}
              </p>
              <p className="text-gray-600 text-xs">{holding.broker}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function CertificateContent() {
  return (
    <div className="space-y-6">
      <div className="flex gap-3 flex-wrap">
        <Button className="bg-white border border-gray-300 text-slate-900 hover:bg-gray-50 gap-2">
          <Plus className="w-4 h-4" />
          Add New
        </Button>
        <Button className="bg-white border border-gray-300 text-slate-900 hover:bg-gray-50">
          Update
        </Button>
        <Button className="bg-white border border-gray-300 text-slate-900 hover:bg-gray-50">
          Amalgamate
        </Button>
        <Button className="bg-white border border-gray-300 text-slate-900 hover:bg-gray-50">
          Split
        </Button>
        <Button className="bg-white border border-gray-300 text-slate-900 hover:bg-gray-50">
          Bonus Script
        </Button>
        <Button className="bg-white border border-gray-300 text-slate-900 hover:bg-gray-50">
          Probate Administration
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="bg-gray-100 rounded-lg p-4">
            <p className="text-xs text-gray-600 mb-3 font-medium">
              Register/Company:
            </p>
            <p className="text-xs text-gray-600 mb-3 font-medium">
              Certificate Number:
            </p>
            <p className="text-xs text-gray-600 mb-3 font-medium">
              Issue Date:
            </p>
            <p className="text-xs text-gray-600 mb-3 font-medium">Units:</p>
            <p className="text-xs text-gray-600 font-medium">Status:</p>
          </div>
        ))}
      </div>
    </div>
  );
}

function DividendContent() {
  return (
    <div className="space-y-6">
      <div className="flex gap-3 flex-wrap">
        <Button className="bg-white border border-gray-300 text-slate-900 hover:bg-gray-50 gap-2">
          <Plus className="w-4 h-4" />
          Declare Dividend
        </Button>
        <Button className="bg-white border border-gray-300 text-slate-900 hover:bg-gray-50">
          Revalidate
        </Button>
        <Button className="bg-white border border-gray-300 text-slate-900 hover:bg-gray-50">
          Annotation
        </Button>
        <Button className="bg-white border border-gray-300 text-slate-900 hover:bg-gray-50">
          Correspondence
        </Button>
      </div>

      <div className="overflow-x-auto border rounded-lg">
        <table className="w-full">
          <thead>
            <tr className="border-b bg-gray-100">
              <th className="text-left px-4 py-3 text-sm font-semibold text-slate-900">
                Date
              </th>
              <th className="text-left px-4 py-3 text-sm font-semibold text-slate-900">
                Time
              </th>
              <th className="text-left px-4 py-3 text-sm font-semibold text-slate-900">
                Action Type
              </th>
              <th className="text-left px-4 py-3 text-sm font-semibold text-slate-900">
                Module
              </th>
              <th className="text-left px-4 py-3 text-sm font-semibold text-slate-900">
                User
              </th>
              <th className="text-left px-4 py-3 text-sm font-semibold text-slate-900">
                Status
              </th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-b hover:bg-gray-50">
              <td colSpan={6} className="p-4 text-center text-gray-600 text-sm">
                No dividend records found
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}

function LinkedHoldersContent() {
  return (
    <div className="space-y-6">
      <div className="flex gap-3">
        <Button className="bg-white border border-gray-300 text-slate-900 hover:bg-gray-50 gap-2">
          <Plus className="w-4 h-4" />
          Link New Holder
        </Button>
      </div>
      <p className="text-gray-600 text-sm">No linked holders found</p>
    </div>
  );
}

function ProbatesContent() {
  return (
    <div className="space-y-6">
      <div className="flex gap-3">
        <Button className="bg-white border border-gray-300 text-slate-900 hover:bg-gray-50 gap-2">
          <TrendingUp className="w-4 h-4" />
          View Probates
        </Button>
      </div>
      <p className="text-gray-600 text-sm">No probate records found</p>
    </div>
  );
}

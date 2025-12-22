"use client"

import { useState } from "react"
import { ArrowLeft, X, FileText } from "lucide-react"
import { Button } from "@/components/ui/button"
import { AddRegisterModal } from "@/components/add-register-modal"
import { RegisterDetailModal } from "@/components/register-detail-modal"
import { EditShareholderModal } from "@/components/edit-shareholder-modal"

interface Company {
  issuerCode: string
  companyName: string
  rcNumber: string
  tinNumber: string
  createdAt: string
  createdBy: string
  status: "active" | "suspended"
}

interface Register {
  code: string
  name: string
  shareClass: string
  numberOfHolders: string
  status: "Default" | "Active"
}

interface CompanyDetailPageProps {
  company: Company
  onBack: () => void
}

export function CompanyDetailPage({ company, onBack }: CompanyDetailPageProps) {
  const [showAddRegister, setShowAddRegister] = useState(false)
  const [showRegisterDetail, setShowRegisterDetail] = useState(false)
  const [showEditShareholder, setShowEditShareholder] = useState(false)
  const [selectedRegister, setSelectedRegister] = useState<Register | null>(null)

  const registers: Register[] = [
    {
      code: "MAIN01",
      name: "MAIN REGISTER",
      shareClass: "Ordinary Shares",
      numberOfHolders: "11,323,433.00",
      status: "Default",
    },
    {
      code: "PREF02",
      name: "FOREIGN INVESTORS",
      shareClass: "Preference Register",
      numberOfHolders: "11,323,433.00",
      status: "Active",
    },
    {
      code: "PREF02",
      name: "AMCON Register",
      shareClass: "Preference Register",
      numberOfHolders: "11,323,433.00",
      status: "Active",
    },
  ]

  const handleViewRegister = (register: Register) => {
    setSelectedRegister(register)
    setShowRegisterDetail(true)
  }

  return (
    <div className="min-h-screen bg-[#F5F5F5]">
      

      {/* Main Content */}
      <div className="px-6 py-8">
        <div className="mb-6">
          <h1 className="text-3xl font-ubuntu font-bold text-[#1E1E1E]">{company.companyName}</h1>
          <div className="mt-2 flex items-center gap-4 text-sm text-[#1E1E1E]">
            <span>Issuer Code: {company.issuerCode}</span>
            <span>|</span>
            <span>RC: {company.rcNumber}</span>
            <span>|</span>
            <span>TIN: {company.tinNumber}</span>
            <span>|</span>
            <span className="flex items-center gap-1">
              Status: {company.status}
              <span
                className={`h-2 w-2 rounded-full ${company.status === "active" ? "bg-green-500" : "bg-yellow-500"}`}
              />
            </span>
          </div>
        </div>

        <div className="mb-6 flex gap-3">
          <Button onClick={() => setShowAddRegister(true)} variant="outline" className="gap-2">
            + Add Register
          </Button>
          <Button variant="outline" className="gap-2 bg-transparent">
            Declare Dividend
          </Button>
        </div>

        {/* Registers Table */}
        <div className="rounded-lg border border-slate-200 bg-white">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-slate-50">
                <tr>
                  <th className="px-6 py-3 text-left text-sm font-medium text-slate-600">Register Code</th>
                  <th className="px-6 py-3 text-left text-sm font-medium text-slate-600">Register Name</th>
                  <th className="px-6 py-3 text-left text-sm font-medium text-slate-600">Share Class</th>
                  <th className="px-6 py-3 text-left text-sm font-medium text-slate-600">Number of Holders</th>
                  <th className="px-6 py-3 text-left text-sm font-medium text-slate-600">Status</th>
                  <th className="px-6 py-3 text-left text-sm font-medium text-slate-600">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200">
                {registers.map((register, index) => (
                  <tr key={index} className="hover:bg-slate-50">
                    <td className="px-6 py-4 text-sm text-slate-900">{register.code}</td>
                    <td className="px-6 py-4 text-sm text-slate-900">{register.name}</td>
                    <td className="px-6 py-4 text-sm text-slate-900">{register.shareClass}</td>
                    <td className="px-6 py-4 text-sm text-slate-900">{register.numberOfHolders}</td>
                    <td className="px-6 py-4">
                      <span
                        className={`inline-flex rounded-full px-3 py-1 text-xs font-medium ${
                          register.status === "Default" ? "bg-green-100 text-green-700" : "bg-slate-100 text-slate-700"
                        }`}
                      >
                        {register.status}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          className="gap-1 bg-transparent"
                          onClick={() => setShowEditShareholder(true)}
                        >
                          <FileText className="h-3 w-3" />
                          Edit
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          className="gap-1 bg-transparent"
                          onClick={() => handleViewRegister(register)}
                        >
                          <FileText className="h-3 w-3" />
                          View
                        </Button>
                        {register.status !== "Default" && (
                          <Button variant="outline" size="sm">
                            Set as Default
                          </Button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Modals */}
      {showAddRegister && <AddRegisterModal onClose={() => setShowAddRegister(false)} />}
      {showRegisterDetail && selectedRegister && (
        <RegisterDetailModal
          register={selectedRegister}
          company={company}
          onClose={() => setShowRegisterDetail(false)}
        />
      )}
      {showEditShareholder && <EditShareholderModal onClose={() => setShowEditShareholder(false)} />}
    </div>
  )
}

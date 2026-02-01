"use client"
// Ifeanyi Ayodeji Ukomadu worked on this

import { useState } from "react"
import { useRouter } from "next/navigation"
import { FileText } from "lucide-react"
import { Button } from "@/components/ui/button"
import { AddRegisterModal } from "@/components/add-register-modal"
import { RegisterDetailModal } from "@/components/register-detail-modal"
import { EditShareholderModal } from "@/components/edit-shareholder-modal"
import { DividendDeclarationModal } from "@/components/dividend-declaration-modal"

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
  taxRate?: string
}

// Mock data (duplicated for now, optimally should be moved to a shared file or API)
const companies: Company[] = [
  {
    issuerCode: "ABC001",
    companyName: "ABC Transport PLC",
    rcNumber: "ABC001",
    tinNumber: "11232121212",
    createdAt: "Emmanuel Effiong",
    createdBy: "Emmanuel Effiong",
    status: "active",
  },
  {
    issuerCode: "BUA002",
    companyName: "BUA Group PLC",
    rcNumber: "ABC001",
    tinNumber: "11232121212",
    createdAt: "Emmanuel Effiong",
    createdBy: "Emmanuel Effiong",
    status: "active",
  },
  {
    issuerCode: "CAD003",
    companyName: "Cadbury PLC",
    rcNumber: "ABC001",
    tinNumber: "11232121212",
    createdAt: "Emmanuel Effiong",
    createdBy: "Emmanuel Effiong",
    status: "suspended",
  },
]

interface CompanyDetailPageProps {
  params: { id: string }
}

export default function CompanyDetailPage({ params }: CompanyDetailPageProps) {
  const router = useRouter()
  const { id } = params
  
  const [showAddRegister, setShowAddRegister] = useState(false)
  const [showRegisterDetail, setShowRegisterDetail] = useState(false)
  const [showEditShareholder, setShowEditShareholder] = useState(false)
  const [showDividendDeclaration, setShowDividendDeclaration] = useState(false)
  const [selectedRegister, setSelectedRegister] = useState<Register | null>(null)

  const company = companies.find((c) => c.issuerCode === id)

  const registers: Register[] = [
    {
      code: "MAIN01",
      name: "MAIN REGISTER",
      shareClass: "Ordinary Shares",
      numberOfHolders: "11,323,433.00",
      status: "Default",
      taxRate: "10%",
    },
    {
      code: "PREF02",
      name: "FOREIGN INVESTORS",
      shareClass: "Preference Register",
      numberOfHolders: "11,323,433.00",
      status: "Active",
      taxRate: "7.5%",
    },
    {
      code: "AMCON03",
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

  if (!company) {
    return <div>Company not found</div>
  }

  return (
    <div className="min-h-screen bg-[#F5F5F5]">
      
      {/* Main Content */}
      <div className="max-h-screen px-4 sm:px-6 md:px-10 lg:px-14 py-6 md:py-8 flex flex-col">
        <div className="mb-6 ">
          
          <h1 className="text-3xl font-ubuntu font-bold text-[#0F2763]">{company.companyName}</h1>
          <div className="mt-2 flex items-center gap-4 text-sm text-[#0F2763]">
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
          <Button onClick={() => setShowAddRegister(true)} variant="outline" className="gap-2 rounded-full">
            + Add Register
          </Button>
          <Button
            variant="outline"
            className="gap-2 bg-transparent rounded-full"
            onClick={() => setShowDividendDeclaration(true)}
          >
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
                          className="gap-1 bg-transparent rounded-full"
                          onClick={() => setShowEditShareholder(true)}
                        >
                          <FileText className="h-3 w-3" />
                          Edit
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          className="gap-1 bg-transparent rounded-full"
                          onClick={() => handleViewRegister(register)}
                        >
                          <FileText className="h-3 w-3" />
                          View Shareholders
                        </Button>
                        {register.status !== "Default" && (
                          <Button variant="outline" size="sm" className="rounded-full">
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
        <Button className="mt-12 w-1/3 self-center rounded-full bg-[#0F2763] hover:bg-[#0F2763]/80" onClick={() => console.log("Add New Register")}>
        Save
      </Button>
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
      {showDividendDeclaration && (
        <DividendDeclarationModal
          company={company}
          registers={registers}
          onClose={() => setShowDividendDeclaration(false)}
        />
      )}
    </div>
  )
}

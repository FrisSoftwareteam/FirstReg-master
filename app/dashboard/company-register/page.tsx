"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { ArrowLeft, X, Search, FileText } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { NewCompanyModal } from "@/components/new-company-modal"
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

export default function CompanyRegisterManagement() {
  const router = useRouter()
  const [showNewCompanyModal, setShowNewCompanyModal] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const [statusFilter, setStatusFilter] = useState("All Status")
  const [showEditShareholder, setShowEditShareholder] = useState(false)

  // Mock data
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

  const handleViewCompany = (company: Company) => {
     // Encoded the ID to handle potentially complex IDs, though here safely using issuerCode as ID for now
      router.push(`/dashboard/company-register/${company.issuerCode}`)
  }

  return (
    <div className="min-h-screen bg-[#F2F2F2]">

      {/* Main Content */}
      <div className="min-h-screen px-4 sm:px-6 md:px-10 lg:px-14 py-6 md:py-8">
        <div className="mb-6 flex items-center justify-between">
          <h1 className="text-2xl md:text-3xl font-bold text-[#0F2763] font-ubuntu mb-3 md:mb-0">Company Register Management</h1>
          <div className="flex gap-3">
            <Button onClick={() => setShowNewCompanyModal(true)} variant="outline" className="gap-2 rounded-full">
              + Add New Company
            </Button>
            <Button className="gap-2 rounded-full bg-[#0F2763] hover:bg-[#0F2763]/90">
              <FileText className="h-4 w-4" />
              Generate Report
            </Button>
          </div>
        </div>

        {/* Companies Table */}
        <div className="rounded-lg border-slate-200">

          {/* Search and Filter */}
          <div className="flex items-center gap-4 border-b border-slate-200 p-4 bg-white rounded-lg mb-4">
            <div className="border-b border-slate-200 p-4">
            <h2 className="text-lg font-ubuntu font-semibold text-[#0F2763]">Companies</h2>
          </div>
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
              <Input
                placeholder="Search Company name, Issuer Code, RC number"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-9 rounded-full"
              />
            </div>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="rounded-full border border-slate-200 bg-white px-4 py-2 text-sm"
            >
              <option>All Status</option>
              <option>Active</option>
              <option>Suspended</option>
            </select>
          </div>

          {/* Table */}
          <div className="overflow-x-auto bg-white rounded-lg">
            <table className="w-full">
              <thead className="bg-slate-50">
                <tr>
                  <th className="px-6 py-3 text-left text-sm font-medium text-slate-600">Issuer Code</th>
                  <th className="px-6 py-3 text-left text-sm font-medium text-slate-600">Company Name</th>
                  <th className="px-6 py-3 text-left text-sm font-medium text-slate-600">RC Number</th>
                  <th className="px-6 py-3 text-left text-sm font-medium text-slate-600">Created At</th>
                  <th className="px-6 py-3 text-left text-sm font-medium text-slate-600">Status</th>
                  <th className="px-6 py-3 text-left text-sm font-medium text-slate-600">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200">
                {companies.map((company) => (
                  <tr key={company.issuerCode} className="hover:bg-slate-50">
                    <td className="px-6 py-4 text-sm text-slate-900">{company.issuerCode}</td>
                    <td className="px-6 py-4 text-sm text-slate-900">{company.companyName}</td>
                    <td className="px-6 py-4 text-sm text-slate-900">{company.rcNumber}</td>
                    <td className="px-6 py-4 text-sm text-slate-900">{company.createdAt}</td>
                    <td className="px-6 py-4">
                      <span
                        className={`inline-flex rounded-full px-3 py-1 text-xs font-medium ${
                          company.status === "active" ? "bg-green-100 text-green-700" : "bg-yellow-100 text-yellow-700"
                        }`}
                      >
                        {company.status}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm" className="gap-1 bg-transparent rounded-full"
                        onClick={() => setShowEditShareholder(true)}
                        >
                          <FileText className="h-3 w-3" />
                          Edit
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          className="gap-1 bg-transparent rounded-full"
                          onClick={() => handleViewCompany(company)}
                        >
                          <FileText className="h-3 w-3" />
                          View Register
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* New Company Modal */}
      {showNewCompanyModal && <NewCompanyModal onClose={() => setShowNewCompanyModal(false)} />}
      {showEditShareholder && <EditShareholderModal onClose={() => setShowEditShareholder(false)} />}
    </div>
  )
}

"use client"

import { useState } from "react"
import { X, Building2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

interface NewCompanyModalProps {
  onClose: () => void
}

export function NewCompanyModal({ onClose }: NewCompanyModalProps) {
  const [formData, setFormData] = useState({
    companyName: "",
    issuerCode: "",
    rcNumber: "",
    tinNumber: "",
    status: "Active",
  })

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="relative w-full max-w-4xl rounded-lg bg-white px-10 py-12 shadow-xl h-[60vh] flex flex-col gap-8 items-center">
        <button onClick={onClose} className="absolute right-4 top-4 rounded-lg p-1 hover:bg-slate-100">
          <X className="h-5 w-5" />
        </button>

        <h2 className="mb-1 text-center text-2xl font-ubuntu font-bold text-[#1E293B]">New Company Registration</h2>
        <p className="mb-6 text-center text-sm text-[#1E293B]">Create new companies listed on NGX</p>

        <div className="space-y-6 bg-[#F9FAFB] rounded-xl p-6 w-full">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="companyName">Company Name</Label>
              <div className="relative">
                <Building2 className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                <Input
                  id="companyName"
                  placeholder="Enter here"
                  value={formData.companyName}
                  onChange={(e) => setFormData({ ...formData, companyName: e.target.value })}
                  className="pl-9"
                />
              </div>
            </div>

            <div>
              <Label htmlFor="issuerCode">Issuer Code</Label>
              <Input
                id="issuerCode"
                placeholder="Enter here"
                value={formData.issuerCode}
                onChange={(e) => setFormData({ ...formData, issuerCode: e.target.value })}
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="rcNumber">Registration Company Number (RC)</Label>
              <Input
                id="rcNumber"
                placeholder="Enter here"
                value={formData.rcNumber}
                onChange={(e) => setFormData({ ...formData, rcNumber: e.target.value })}
              />
            </div>

            <div>
              <Label htmlFor="tinNumber">Tax Identification Number (TIN)</Label>
              <Input
                id="tinNumber"
                placeholder="Enter here"
                value={formData.tinNumber}
                onChange={(e) => setFormData({ ...formData, tinNumber: e.target.value })}
              />
            </div>
          </div>

          <div>
            <Label htmlFor="status">Status</Label>
            <select
              id="status"
              value={formData.status}
              onChange={(e) => setFormData({ ...formData, status: e.target.value })}
              className="flex h-10 w-1/2 rounded-full border border-input bg-slate-100 px-3 py-2 text-sm ring-offset-background"
            >
              <option>Active</option>
              <option>Suspended</option>
            </select>
          </div>
        </div>

        <Button className="mt-6 w-1/2 rounded-full bg-[#0F2763] hover:bg-[#0F2763]/80" onClick={onClose}>
          Save
        </Button>
      </div>
    </div>
  )
}

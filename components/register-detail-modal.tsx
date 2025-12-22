"use client"

import { X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Checkbox } from "@/components/ui/checkbox"

interface Register {
  code: string
  name: string
  shareClass: string
  numberOfHolders: string
  status: "Default" | "Active"
}

interface Company {
  companyName: string
}

interface RegisterDetailModalProps {
  register: Register
  company: Company
  onClose: () => void
}

export function RegisterDetailModal({ register, company, onClose }: RegisterDetailModalProps) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
      <div className="relative w-full max-w-4xl overflow-y-auto rounded-lg bg-white px-10 py-12 shadow-xl h-[90vh] flex flex-col gap-8 items-center">
        <button onClick={onClose} className="absolute right-4 top-4 rounded-lg p-1 hover:bg-slate-100">
          <X className="h-5 w-5" />
        </button>

        <h2 className="mb-6 text-center text-2xl font-ubuntu font-bold text-slate-900 ">{company.companyName}</h2>
        <p className="mb-6 text-center text-sm text-slate-600">Main Register Information</p>

        <div className="space-y-4 bg-[#F9FAFB] rounded-xl p-6 w-[90%]">
          {/* Register Information */}
          <div>
            <h3 className="mb-4 text-lg font-semibold text-slate-900">Register Information</h3>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="registerName">Register Name</Label>
                <Input id="registerName" defaultValue="Main Register" readOnly className="bg-slate-50" />
              </div>

              <div>
                <Label htmlFor="registerCode">Register COde</Label>
                <Input id="registerCode" defaultValue={register.code} readOnly className="bg-slate-50" />
              </div>
            </div>
          </div>

          {/* Share Class Information */}
          <div>
            <h3 className="mb-4 text-lg font-semibold text-slate-900">Share Class Information</h3>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="shareClassType">Share Class Type</Label>
                  <select
                    id="shareClassType"
                    defaultValue="Ordinary Shares"
                    className="flex h-10 w-full rounded-md border border-input bg-slate-50 px-3 py-2 text-sm ring-offset-background"
                    disabled
                  >
                    <option>Ordinary Shares</option>
                  </select>
                </div>

                <div>
                  <Label htmlFor="classCode">Class Code</Label>
                  <Input id="classCode" defaultValue="OS001" readOnly className="bg-slate-50" />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="currency">Currency</Label>
                  <select
                    id="currency"
                    defaultValue="NGN-Naira"
                    className="flex h-10 w-full rounded-md border border-input bg-slate-50 px-3 py-2 text-sm ring-offset-background"
                    disabled
                  >
                    <option>NGN-Naira</option>
                  </select>
                </div>

                <div>
                  <Label htmlFor="parValue">Par Value</Label>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-600">₦</span>
                    <Input id="parValue" defaultValue="5.00" readOnly className="bg-slate-50 pl-7" />
                  </div>
                </div>
              </div>

              <div>
                <Label htmlFor="narration">Narration</Label>
                <Textarea id="narration" placeholder="Enter here" rows={4} className="bg-white" />
              </div>
            </div>
          </div>

          {/* Checkbox */}
          <div className="flex items-center space-x-2">
            <Checkbox id="markAsDefault" checked={register.status === "Default"} disabled />
            <label htmlFor="markAsDefault" className="text-sm text-slate-700">
              Mark as Default (only one default register per company)
            </label>
          </div>
        </div>

        <Button className="mt-2 w-1/2 rounded-full bg-[#0F2763] hover:bg-[#0F2763]/80" onClick={onClose}>
          Save
        </Button>
      </div>
    </div>
  )
}

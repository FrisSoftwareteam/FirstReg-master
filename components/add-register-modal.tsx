"use client"

import { useState } from "react"
import { X, Users } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Checkbox } from "@/components/ui/checkbox"

interface AddRegisterModalProps {
  onClose: () => void
}

export function AddRegisterModal({ onClose }: AddRegisterModalProps) {
  const [formData, setFormData] = useState({
    registerName: "",
    registerCode: "",
    shareClassType: "Select Options",
    classCode: "",
    currency: "Select Options",
    parValue: "",
    taxRate: "Select Options",
    narration: "",
    markAsDefault: false,
  })

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
      <div className="relative max-h-[90vh] h-[80vh] w-full max-w-4xl overflow-y-auto rounded-lg bg-white p-6 shadow-xl flex flex-col items-center">
        <button onClick={onClose} className="absolute right-4 top-4 rounded-lg p-1 hover:bg-slate-100">
          <X className="h-5 w-5" />
        </button>

        <h2 className="mb-1 text-center font-ubuntu text-2xl font-bold text-[#1E293B]">Add New Register</h2>
        <p className="mb-6 text-center text-sm text-[#4B5563]">Create new register for companies</p>

        <div className="space-y-6 bg-[#F9FAFB] p-6 rounded-lg w-[90%]">
          {/* Register Information */}
          <div className="">
            <h3 className="mb-4 text-lg font-semibold font-ubuntu text-[#1E293B]">Register Information</h3>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="registerName">Register Name</Label>
                <div className="relative">
                  <Users className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                  <Input
                    id="registerName"
                    placeholder="Enter here"
                    value={formData.registerName}
                    onChange={(e) => setFormData({ ...formData, registerName: e.target.value })}
                    className="pl-9"
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="registerCode">Register COde</Label>
                <Input
                  id="registerCode"
                  placeholder="Enter here"
                  value={formData.registerCode}
                  onChange={(e) => setFormData({ ...formData, registerCode: e.target.value })}
                />
              </div>
            </div>
          </div>

          {/* Share Class Information */}
          <div>
            <h3 className="mb-4 text-lg font-semibold font-ubuntu text-slate-900">Share Class Information</h3>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="shareClassType">Share Class Type</Label>
                  <select
                    id="shareClassType"
                    value={formData.shareClassType}
                    onChange={(e) => setFormData({ ...formData, shareClassType: e.target.value })}
                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background"
                  >
                    <option>Select Options</option>
                    <option>Ordinary Shares</option>
                    <option>Preference Shares</option>
                  </select>
                </div>

                <div>
                  <Label htmlFor="classCode">Class Code</Label>
                  <Input
                    id="classCode"
                    placeholder="Enter here"
                    value={formData.classCode}
                    onChange={(e) => setFormData({ ...formData, classCode: e.target.value })}
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="currency">Currency</Label>
                  <select
                    id="currency"
                    value={formData.currency}
                    onChange={(e) => setFormData({ ...formData, currency: e.target.value })}
                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background"
                  >
                    <option>Select Options</option>
                    <option>NGN - Naira</option>
                    <option>USD - Dollar</option>
                  </select>
                </div>

                <div>
                  <Label htmlFor="parValue">Par Value</Label>
                  <Input
                    id="parValue"
                    placeholder="Enter here"
                    value={formData.parValue}
                    onChange={(e) => setFormData({ ...formData, parValue: e.target.value })}
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="taxRate">Tax Rate</Label>
                <select
                  id="taxRate"
                  value={formData.taxRate}
                  onChange={(e) => setFormData({ ...formData, taxRate: e.target.value })}
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background"
                >
                  <option>Select Options</option>
                  <option>10%</option>
                  <option>7.5%</option>
                </select>
              </div>

              <div>
                <Label htmlFor="narration">Narration</Label>
                <Textarea
                  id="narration"
                  placeholder="Enter here"
                  value={formData.narration}
                  onChange={(e) => setFormData({ ...formData, narration: e.target.value })}
                  rows={4}
                />
              </div>
            </div>
          </div>

          {/* Checkbox */}
          <div className="flex items-center space-x-2">
            <Checkbox
              id="markAsDefault"
              checked={formData.markAsDefault}
              onCheckedChange={(checked) => setFormData({ ...formData, markAsDefault: checked as boolean })}
            />
            <label htmlFor="markAsDefault" className="text-sm text-slate-700">
              Mark as Default (only one default register per company)
            </label>
          </div>
        </div>

        <Button className="mt-6 w-1/2 rounded-full bg-[#0F2763] hover:bg-[#0F2763]/80" onClick={onClose}>
          Save
        </Button>
      </div>
    </div>
  )
}

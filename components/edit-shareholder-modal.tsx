"use client"

import { X, User, Mail, MapPin, Phone, Upload } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

interface EditShareholderModalProps {
  onClose: () => void
}

export function EditShareholderModal({ onClose }: EditShareholderModalProps) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
      <div className="relative w-full max-w-4xl overflow-y-auto rounded-lg bg-white px-10 py-12 shadow-xl h-[90vh] flex flex-col gap-8 items-center">
        <button onClick={onClose} className="absolute right-4 top-4 rounded-lg p-1 hover:bg-slate-100">
          <X className="h-5 w-5" />
        </button>

        <h2 className="mb-6 text-center text-2xl font-ubuntu font-bold text-slate-900 text-[#0F2763]">Edit Shareholder Personal Information</h2>

        <div className="space-y-4 bg-[#F9FAFB] rounded-xl p-6 w-[90%]">
          <div>
            <h3 className="mb-4 text-lg font-semibold text-slate-900">Edit Personal Information</h3>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="firstName">First Name</Label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                    <Input id="firstName" defaultValue="Aminu" className="pl-9" />
                  </div>
                </div>

                <div>
                  <Label htmlFor="lastName">Last Name</Label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                    <Input id="lastName" defaultValue="Kano" className="pl-9" />
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="otherName">Other Name</Label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                    <Input id="otherName" defaultValue="Danburu" className="pl-9" />
                  </div>
                </div>

                <div>
                  <Label htmlFor="email">Email Address</Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                    <Input id="email" defaultValue="aminull@gmail.com" className="pl-9" />
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="phone">Phone Number</Label>
                  <div className="flex gap-2">
                    <select className="flex h-10 w-24 rounded-md border border-input bg-background px-3 py-2 text-sm">
                      <option>+234</option>
                    </select>
                    <Input id="phone" defaultValue="080 44 22 11 60" className="flex-1" />
                  </div>
                </div>

                <div>
                  <Label htmlFor="sex">Sex</Label>
                  <select className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm">
                    <option>Select Options</option>
                    <option>Male</option>
                    <option>Female</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="shareholderType">Shareholder Type</Label>
                  <select
                    id="shareholderType"
                    defaultValue="Individual"
                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                  >
                    <option>Individual</option>
                    <option>Corporate</option>
                  </select>
                </div>

                <div>
                  <Label htmlFor="nextOfKin">Next of Kin</Label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                    <Input id="nextOfKin" defaultValue="Kano Aisha" className="pl-9" />
                  </div>
                </div>
              </div>

              <div>
                <Label htmlFor="address">Address</Label>
                <div className="relative">
                  <MapPin className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                  <Input
                    id="address"
                    defaultValue="2 Aminu Kano Crescent, Ikoyi Lagos state, Nigeria"
                    className="pl-9"
                  />
                </div>
                <div className="mt-2 flex justify-end">
                  <span className="text-xs text-slate-500">powered by Google</span>
                </div>
              </div>

              <div>
                <Label>Upload Shareholder's Request</Label>
                <div className="mb-6 border-2 border-b bg-white text-center p-6 rounded-3xl">
              <div className="mb-6 p-4 border-2 border-dashed border-black bg-[#F2F2F2] rounded-3xl text-center">
                <Upload className="w-8 h-8 text-muted-foreground mx-auto mb-2" />
                <p className="text-sm font-medium text-foreground">
                  Upload Shareholder's Request
                </p>
                <p className="text-xs text-muted-foreground">JPG, JPEG, PNG</p>
              </div>
            </div>
              </div>
            </div>
          </div>
        </div>

        <Button className="mt-2 w-1/2 rounded-full bg-[#0F2763] hover:bg-[#0F2763]/80" onClick={onClose}>
          Save
        </Button>
      </div>
    </div>
  )
}

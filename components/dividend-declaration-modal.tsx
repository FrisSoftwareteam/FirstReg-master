"use client"
// Ifeanyi Ayodeji Ukomadu worked on this

import { useMemo, useState } from "react"
import { X, AlertTriangle, ChevronDown } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import Image from "next/image"

interface CompanySummary {
  issuerCode: string
  companyName: string
  rcNumber: string
  tinNumber: string
}

interface RegisterSummary {
  code: string
  name: string
  shareClass: string
  numberOfHolders: string
  taxRate?: string
}

interface DividendDeclarationModalProps {
  company: CompanySummary
  registers: RegisterSummary[]
  onClose: () => void
}

export function DividendDeclarationModal({ company, registers, onClose }: DividendDeclarationModalProps) {
  const [selected, setSelected] = useState<string[]>(() => registers.slice(0, 2).map((reg) => reg.code))
  const [step, setStep] = useState<1 | 2 | 3 | 4 | 5 | 6>(1)
  const [openReview, setOpenReview] = useState<"registers" | "declaration" | "dates" | "rules" | null>("registers")
  const [periodLabel, setPeriodLabel] = useState("")
  const [ratePerShare, setRatePerShare] = useState("5.00")
  const [description, setDescription] = useState("")
  const [closureDate, setClosureDate] = useState("")
  const [recordDate, setRecordDate] = useState("")
  const [paymentDate, setPaymentDate] = useState("")
  const [ruleExcludeCaution, setRuleExcludeCaution] = useState(true)
  const [ruleRequireMandate, setRuleRequireMandate] = useState(true)
  const [submitted, setSubmitted] = useState(false)

  const hasMissingTax = useMemo(
    () => registers.some((reg) => !reg.taxRate || reg.taxRate.trim() === ""),
    [registers]
  )

  const toggle = (code: string) => {
    setSelected((prev) => (prev.includes(code) ? prev.filter((item) => item !== code) : [...prev, code]))
  }

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center bg-black/40 p-6 overflow-y-auto">
      <div className="relative w-full max-w-5xl rounded-2xl bg-white px-10 py-8 shadow-xl">
        <button
          onClick={onClose}
          className="absolute -right-2 -top-2 rounded-full bg-white p-2 text-[#0F2763] shadow-md hover:bg-slate-50"
          aria-label="Close"
        >
          <X className="h-5 w-5" />
        </button>

        {submitted && (
          <div className="absolute inset-0 z-10 flex flex-col items-center justify-center rounded-2xl bg-white/95">
            <Image src="/icons/check-success.svg" alt="Success" width={140} height={140} />
            <div className="mt-4 text-lg font-semibold text-slate-700">Submission successful</div>
            <Button className="mt-6 rounded-md bg-[#172554] px-10 hover:bg-[#172554]/90" onClick={onClose}>
              Close
            </Button>
          </div>
        )}

        <div className="rounded-2xl bg-slate-50 px-6 py-4">
          <h2 className="text-lg font-semibold text-slate-800">
            Dividend Declaration - <span className="text-[#0F2763]">{company.companyName}</span>
          </h2>
          <div className="mt-2 text-sm text-slate-500">
            Register Code: {company.issuerCode} | Tax: {company.tinNumber} | TIN: {company.tinNumber} | Register:{" "}
            {registers.length}
          </div>
        </div>

        {step === 1 && (
          <div className="mt-8">
            <h3 className="text-base font-semibold text-[#0F2763]">01: Register Details</h3>
            <p className="mt-6 text-sm font-medium text-slate-600">Select Share Classes</p>

            <div className="mt-3 rounded-lg border border-slate-200">
              <table className="w-full">
                <thead className="bg-slate-100">
                  <tr>
                    <th className="w-10 px-4 py-3 text-left text-xs font-semibold text-slate-600"></th>
                    <th className="px-4 py-3 text-left text-xs font-semibold text-slate-600">Class Name</th>
                    <th className="px-4 py-3 text-left text-xs font-semibold text-slate-600">Class Type</th>
                    <th className="px-4 py-3 text-left text-xs font-semibold text-slate-600">Number of Holders</th>
                    <th className="px-4 py-3 text-left text-xs font-semibold text-slate-600">Tax rate</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200 bg-white">
                  {registers.map((reg) => (
                    <tr key={reg.code}>
                      <td className="px-4 py-3">
                        <Checkbox
                          checked={selected.includes(reg.code)}
                          onCheckedChange={() => toggle(reg.code)}
                          className="border-slate-300"
                        />
                      </td>
                      <td className="px-4 py-3 text-sm text-slate-700">{reg.name}</td>
                      <td className="px-4 py-3 text-sm text-slate-700">{reg.shareClass}</td>
                      <td className="px-4 py-3 text-sm text-slate-700">{reg.numberOfHolders}</td>
                      <td className="px-4 py-3 text-sm text-slate-700">{reg.taxRate || "—"}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {hasMissingTax && (
              <div className="mt-3 flex items-center gap-2 text-xs text-slate-500">
                <AlertTriangle className="h-4 w-4 text-amber-500" />
                <span>Share Class lacks tax setup</span>
              </div>
            )}
          </div>
        )}

        {step === 2 && (
          <div className="mt-8">
            <h3 className="text-base font-semibold text-[#0F2763]">02: Declaration Details</h3>
            <div className="mt-8 grid max-w-2xl gap-6">
              <div className="grid grid-cols-[140px_1fr] items-center gap-4">
                <label className="text-sm font-medium text-slate-600">Period Label:</label>
                <Input
                  placeholder="Enter here"
                  className="bg-white"
                  value={periodLabel}
                  onChange={(event) => setPeriodLabel(event.target.value)}
                />
              </div>
              <div className="grid grid-cols-[140px_1fr] items-center gap-4">
                <label className="text-sm font-medium text-slate-600">Rate per share:</label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-green-700">₦</span>
                  <Input
                    className="bg-white pl-8"
                    value={ratePerShare}
                    onChange={(event) => setRatePerShare(event.target.value)}
                  />
                </div>
              </div>
              <div className="grid grid-cols-[140px_1fr] items-start gap-4">
                <label className="pt-2 text-sm font-medium text-slate-600">Description:</label>
                <Textarea
                  placeholder="(Optional Description Field)"
                  rows={6}
                  className="bg-white"
                  value={description}
                  onChange={(event) => setDescription(event.target.value)}
                />
              </div>
            </div>
          </div>
        )}

        {step === 3 && (
          <div className="mt-8">
            <h3 className="text-base font-semibold text-[#0F2763]">03: Key Dates</h3>
            <div className="mt-6 text-sm font-semibold text-slate-600">Announcement Dates:</div>
            <div className="mt-6 grid max-w-xl gap-6">
              <div className="grid grid-cols-[140px_1fr] items-center gap-4">
                <label className="text-sm font-medium text-slate-600">Closure Date:</label>
                <Input
                  type="date"
                  className="bg-white"
                  value={closureDate}
                  onChange={(event) => setClosureDate(event.target.value)}
                />
              </div>
              <div className="grid grid-cols-[140px_1fr] items-center gap-4">
                <label className="text-sm font-medium text-slate-600">Record Date:</label>
                <Input
                  type="date"
                  className="bg-white"
                  value={recordDate}
                  onChange={(event) => setRecordDate(event.target.value)}
                />
              </div>
              <div className="grid grid-cols-[140px_1fr] items-center gap-4">
                <label className="text-sm font-medium text-slate-600">Payment Date:</label>
                <Input
                  type="date"
                  className="bg-white"
                  value={paymentDate}
                  onChange={(event) => setPaymentDate(event.target.value)}
                />
              </div>
            </div>
          </div>
        )}

        {step === 4 && (
          <div className="mt-8">
            <h3 className="text-base font-semibold text-[#0F2763]">04: Eligibility Rules</h3>
            <p className="mt-6 text-sm font-medium text-slate-600">Select Rules</p>

            <div className="mt-3 max-w-2xl rounded-lg border border-slate-200">
              <table className="w-full">
                <thead className="bg-slate-100">
                  <tr>
                    <th className="w-10 px-4 py-3 text-left text-xs font-semibold text-slate-600"></th>
                    <th className="px-4 py-3 text-left text-xs font-semibold text-slate-600">Action</th>
                    <th className="px-4 py-3 text-left text-xs font-semibold text-slate-600">Affected Holders</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200 bg-white">
                  <tr>
                    <td className="px-4 py-3">
                      <Checkbox
                        checked={ruleExcludeCaution}
                        onCheckedChange={() => setRuleExcludeCaution((prev) => !prev)}
                        className="border-slate-300"
                      />
                    </td>
                    <td className="px-4 py-3 text-sm text-slate-700">Exclude Accounts Under Caution</td>
                    <td className="px-4 py-3 text-sm text-slate-700">(19)</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-3">
                      <Checkbox
                        checked={ruleRequireMandate}
                        onCheckedChange={() => setRuleRequireMandate((prev) => !prev)}
                        className="border-slate-300"
                      />
                    </td>
                    <td className="px-4 py-3 text-sm text-slate-700">Require Active Bank Mandate</td>
                    <td className="px-4 py-3 text-sm text-slate-700">(11,922,500)</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="mt-3 flex items-center gap-2 text-xs text-slate-500">
              <AlertTriangle className="h-4 w-4 text-amber-500" />
              <span>Note: These rules affect payment eligibility, not entitlement calculation</span>
            </div>
          </div>
        )}

        {step === 5 && (
          <div className="mt-8">
            <h3 className="text-base font-semibold text-[#0F2763]">04: Declaration Summary</h3>
            <div className="mt-6 rounded-xl border border-slate-200 bg-white p-6">
              <div className="flex flex-wrap items-center justify-between gap-4">
                <h4 className="text-base font-semibold text-[#0F2763]">Dividend Summary</h4>
                <div className="flex flex-wrap items-center gap-8 text-sm text-slate-600">
                  <div className="flex items-center gap-2">
                    <Image
                      src="/icons/eligible-holder.png"
                      alt="Eligible holder"
                      width={16}
                      height={16}
                      className="h-4 w-4"
                    />
                    Eligible Holder: <span className="text-slate-900">1,022,022</span>
                  </div>
                  <div>
                    Total Gross: <span className="text-slate-900">₦1,022,022</span>
                  </div>
                  <div>
                    Total Net: <span className="text-slate-900">₦1,022,022</span>
                  </div>
                </div>
              </div>

              <div className="mt-6 overflow-x-auto rounded-lg border border-slate-200">
                <table className="w-full">
                  <thead className="bg-slate-100 text-xs text-slate-600">
                    <tr>
                      <th className="px-4 py-3 text-left font-semibold">Shareclass</th>
                      <th className="px-4 py-3 text-left font-semibold">Shareholder</th>
                      <th className="px-4 py-3 text-left font-semibold">Gross Amount</th>
                      <th className="px-4 py-3 text-left font-semibold">Tax Rate</th>
                      <th className="px-4 py-3 text-left font-semibold">Tax amount</th>
                      <th className="px-4 py-3 text-left font-semibold">Net Amount</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-200 bg-white text-sm text-slate-700">
                    <tr>
                      <td className="px-4 py-4">Main Register</td>
                      <td className="px-4 py-4">Amadu Pinock Gimba</td>
                      <td className="px-4 py-4">₦460,234.00</td>
                      <td className="px-4 py-4">10%</td>
                      <td className="px-4 py-4">₦46,234.00</td>
                      <td className="px-4 py-4">₦414,000.00</td>
                    </tr>
                    <tr>
                      <td className="px-4 py-4">Main Register</td>
                      <td className="px-4 py-4">Aminat Aminu Kano</td>
                      <td className="px-4 py-4">₦460,234.00</td>
                      <td className="px-4 py-4">10%</td>
                      <td className="px-4 py-4">₦46,234.00</td>
                      <td className="px-4 py-4">₦414,000.00</td>
                    </tr>
                    <tr>
                      <td className="px-4 py-4">Main Register</td>
                      <td className="px-4 py-4">Adeaze Chukukemeka</td>
                      <td className="px-4 py-4">₦460,234.00</td>
                      <td className="px-4 py-4">10%</td>
                      <td className="px-4 py-4">₦46,234.00</td>
                      <td className="px-4 py-4">₦414,000.00</td>
                    </tr>
                    <tr>
                      <td className="px-4 py-4">Main Register</td>
                      <td className="px-4 py-4">Adeaze Chukukemeka</td>
                      <td className="px-4 py-4">₦460,234.00</td>
                      <td className="px-4 py-4">10%</td>
                      <td className="px-4 py-4">₦46,234.00</td>
                      <td className="px-4 py-4">₦414,000.00</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <div className="mt-4 flex items-center justify-center gap-2 text-xs text-slate-500">
                <span className="rounded border border-slate-200 bg-[#172554] px-2 py-1 text-white">1</span>
                <span className="rounded border border-slate-200 px-2 py-1">2</span>
                <span className="rounded border border-slate-200 px-2 py-1">3</span>
                <span className="px-2 py-1">›</span>
              </div>
            </div>
          </div>
        )}

        {step === 6 && (
          <div className="mt-8">
            <h3 className="text-base font-semibold text-[#0F2763]">05: Review & Submit</h3>
            <div className="mt-8 space-y-4">
              <div className="space-y-4">
                <button
                  type="button"
                  onClick={() => setOpenReview(openReview === "registers" ? null : "registers")}
                  className={`flex w-full items-center justify-between rounded-xl border px-6 py-4 shadow-sm ${
                    openReview === "registers"
                      ? "border-[#0F2763] bg-[#172554] text-white"
                      : "border-slate-200 bg-white text-[#0F2763]"
                  }`}
                >
                  <div className="flex items-center gap-4 text-sm font-medium">
                    <span className="flex h-5 w-5 items-center justify-center rounded-sm bg-green-700 text-xs text-white">
                      ✓
                    </span>
                    Register & Share Class Details
                  </div>
                  <span
                    className={`flex h-6 w-6 items-center justify-center rounded-full border ${
                      openReview === "registers" ? "border-white/40 text-white" : "border-slate-300 text-slate-500"
                    }`}
                  >
                    <ChevronDown
                      className={`h-4 w-4 transition-transform ${openReview === "registers" ? "rotate-180" : ""}`}
                    />
                  </span>
                </button>

                {openReview === "registers" && (
                  <div className="rounded-xl border border-slate-200 bg-white p-5">
                    <div className="mb-3 text-sm font-medium text-slate-600">Share Classes</div>
                    <div className="overflow-x-auto rounded-lg border border-slate-200">
                      <table className="w-full">
                        <thead className="bg-slate-100">
                          <tr>
                            <th className="w-10 px-4 py-3 text-left text-xs font-semibold text-slate-600"></th>
                            <th className="px-4 py-3 text-left text-xs font-semibold text-slate-600">Class Name</th>
                            <th className="px-4 py-3 text-left text-xs font-semibold text-slate-600">Class Type</th>
                            <th className="px-4 py-3 text-left text-xs font-semibold text-slate-600">
                              Number of Holders
                            </th>
                            <th className="px-4 py-3 text-left text-xs font-semibold text-slate-600">Tax rate</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-200 bg-white text-sm text-slate-700">
                          {registers.map((reg) => (
                            <tr key={reg.code}>
                              <td className="px-4 py-3">
                                <Checkbox checked={selected.includes(reg.code)} className="border-slate-300" />
                              </td>
                              <td className="px-4 py-3">{reg.name}</td>
                              <td className="px-4 py-3">{reg.shareClass}</td>
                              <td className="px-4 py-3">{reg.numberOfHolders}</td>
                              <td className="px-4 py-3">{reg.taxRate || "—"}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                )}

                <button
                  type="button"
                  onClick={() => setOpenReview(openReview === "declaration" ? null : "declaration")}
                  className={`flex w-full items-center justify-between rounded-xl border px-6 py-4 shadow-sm ${
                    openReview === "declaration"
                      ? "border-[#0F2763] bg-[#172554] text-white"
                      : "border-slate-200 bg-white text-[#0F2763]"
                  }`}
                >
                  <div className="flex items-center gap-4 text-sm font-medium">
                    <span className="flex h-5 w-5 items-center justify-center rounded-sm bg-green-700 text-xs text-white">
                      ✓
                    </span>
                    Declaration Details
                  </div>
                  <span
                    className={`flex h-6 w-6 items-center justify-center rounded-full border ${
                      openReview === "declaration" ? "border-white/40 text-white" : "border-slate-300 text-slate-500"
                    }`}
                  >
                    <ChevronDown
                      className={`h-4 w-4 transition-transform ${openReview === "declaration" ? "rotate-180" : ""}`}
                    />
                  </span>
                </button>

                {openReview === "declaration" && (
                  <div className="rounded-xl border border-slate-200 bg-white p-5">
                    <h4 className="text-base font-semibold text-[#0F2763]">02: Declaration Details</h4>
                    <div className="mt-6 grid max-w-3xl gap-6">
                      <div className="grid grid-cols-[140px_1fr] items-center gap-4">
                        <label className="text-sm font-medium text-slate-600">Period Label:</label>
                        <Input
                          placeholder="Enter here"
                          className="bg-white"
                          value={periodLabel}
                          onChange={(event) => setPeriodLabel(event.target.value)}
                        />
                      </div>
                      <div className="grid grid-cols-[140px_1fr] items-center gap-4">
                        <label className="text-sm font-medium text-slate-600">Rate per share:</label>
                        <div className="relative">
                          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-green-700">₦</span>
                          <Input
                            className="bg-white pl-8"
                            value={ratePerShare}
                            onChange={(event) => setRatePerShare(event.target.value)}
                          />
                        </div>
                      </div>
                      <div className="grid grid-cols-[140px_1fr] items-start gap-4">
                        <label className="pt-2 text-sm font-medium text-slate-600">Description:</label>
                        <Textarea
                          placeholder="(Optional Description Field)"
                          rows={6}
                          className="bg-white"
                          value={description}
                          onChange={(event) => setDescription(event.target.value)}
                        />
                      </div>
                    </div>
                  </div>
                )}

                <button
                  type="button"
                  onClick={() => setOpenReview(openReview === "dates" ? null : "dates")}
                  className={`flex w-full items-center justify-between rounded-xl border px-6 py-4 shadow-sm ${
                    openReview === "dates"
                      ? "border-[#0F2763] bg-[#172554] text-white"
                      : "border-slate-200 bg-white text-[#0F2763]"
                  }`}
                >
                  <div className="flex items-center gap-4 text-sm font-medium">
                    <span className="flex h-5 w-5 items-center justify-center rounded-sm bg-green-700 text-xs text-white">
                      ✓
                    </span>
                    Key Dates
                  </div>
                  <span
                    className={`flex h-6 w-6 items-center justify-center rounded-full border ${
                      openReview === "dates" ? "border-white/40 text-white" : "border-slate-300 text-slate-500"
                    }`}
                  >
                    <ChevronDown
                      className={`h-4 w-4 transition-transform ${openReview === "dates" ? "rotate-180" : ""}`}
                    />
                  </span>
                </button>

                {openReview === "dates" && (
                  <div className="rounded-xl border border-slate-200 bg-white p-5">
                    <div className="text-sm font-semibold text-slate-600">Announcement Dates:</div>
                    <div className="mt-5 grid max-w-3xl gap-6">
                      <div className="grid grid-cols-[140px_1fr] items-center gap-4">
                        <label className="text-sm font-medium text-slate-600">Closure Date:</label>
                        <Input
                          type="date"
                          className="bg-white"
                          value={closureDate}
                          onChange={(event) => setClosureDate(event.target.value)}
                        />
                      </div>
                      <div className="grid grid-cols-[140px_1fr] items-center gap-4">
                        <label className="text-sm font-medium text-slate-600">Record Date:</label>
                        <Input
                          type="date"
                          className="bg-white"
                          value={recordDate}
                          onChange={(event) => setRecordDate(event.target.value)}
                        />
                      </div>
                      <div className="grid grid-cols-[140px_1fr] items-center gap-4">
                        <label className="text-sm font-medium text-slate-600">Payment Date:</label>
                        <Input
                          type="date"
                          className="bg-white"
                          value={paymentDate}
                          onChange={(event) => setPaymentDate(event.target.value)}
                        />
                      </div>
                    </div>
                  </div>
                )}

                <button
                  type="button"
                  onClick={() => setOpenReview(openReview === "rules" ? null : "rules")}
                  className={`flex w-full items-center justify-between rounded-xl border px-6 py-4 shadow-sm ${
                    openReview === "rules"
                      ? "border-[#0F2763] bg-[#172554] text-white"
                      : "border-slate-200 bg-white text-[#0F2763]"
                  }`}
                >
                  <div className="flex items-center gap-4 text-sm font-medium">
                    <span className="flex h-5 w-5 items-center justify-center rounded-sm bg-green-700 text-xs text-white">
                      ✓
                    </span>
                    Eligibility rules
                  </div>
                  <span
                    className={`flex h-6 w-6 items-center justify-center rounded-full border ${
                      openReview === "rules" ? "border-white/40 text-white" : "border-slate-300 text-slate-500"
                    }`}
                  >
                    <ChevronDown
                      className={`h-4 w-4 transition-transform ${openReview === "rules" ? "rotate-180" : ""}`}
                    />
                  </span>
                </button>

                {openReview === "rules" && (
                  <div className="rounded-xl border border-slate-200 bg-white p-5">
                    <h4 className="text-base font-semibold text-[#0F2763]">04: Eligibility Rules</h4>
                    <p className="mt-4 text-sm font-medium text-slate-600">Select Rules</p>

                    <div className="mt-3 max-w-2xl rounded-lg border border-slate-200">
                      <table className="w-full">
                        <thead className="bg-slate-100">
                          <tr>
                            <th className="w-10 px-4 py-3 text-left text-xs font-semibold text-slate-600"></th>
                            <th className="px-4 py-3 text-left text-xs font-semibold text-slate-600">Action</th>
                            <th className="px-4 py-3 text-left text-xs font-semibold text-slate-600">
                              Affected Holders
                            </th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-200 bg-white text-sm text-slate-700">
                          <tr>
                            <td className="px-4 py-3">
                              <Checkbox checked={ruleExcludeCaution} className="border-slate-300" />
                            </td>
                            <td className="px-4 py-3">Exclude Accounts Under Caution</td>
                            <td className="px-4 py-3">(19)</td>
                          </tr>
                          <tr>
                            <td className="px-4 py-3">
                              <Checkbox checked={ruleRequireMandate} className="border-slate-300" />
                            </td>
                            <td className="px-4 py-3">Require Active Bank Mandate</td>
                            <td className="px-4 py-3">(11,922,500)</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>

                    <div className="mt-3 flex items-center gap-2 text-xs text-slate-500">
                      <AlertTriangle className="h-4 w-4 text-amber-500" />
                      <span>Note: These rules affect payment eligibility, not entitlement calculation</span>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        <div className="mt-10 flex justify-end gap-3">
          {step > 1 && (
            <Button
              variant="outline"
              className="rounded-md px-10"
              onClick={() => {
                if (step === 6) setStep(5)
                else if (step === 5) setStep(4)
                else if (step === 4) setStep(3)
                else if (step === 3) setStep(2)
                else setStep(1)
              }}
            >
              Previous
            </Button>
          )}
          {step < 6 ? (
            <Button
              className="rounded-md bg-[#172554] px-10 hover:bg-[#172554]/90"
              onClick={() => {
                if (step === 1) setStep(2)
                if (step === 2) setStep(3)
                if (step === 3) setStep(4)
                if (step === 4) setStep(5)
                if (step === 5) setStep(6)
              }}
            >
              Next
            </Button>
          ) : (
            <>
              <Button variant="outline" className="rounded-md px-8">
                Save as Draft
              </Button>
              <Button
                className="rounded-md bg-[#172554] px-10 hover:bg-[#172554]/90"
                onClick={() => setSubmitted(true)}
              >
                Submit
              </Button>
            </>
          )}
        </div>
      </div>
    </div>
  )
}

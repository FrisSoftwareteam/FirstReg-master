"use client";

import { X, Upload } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";

interface EditModalProps {
  type: "personal" | "bank";
  shareholder: any;
  onClose: () => void;
}

export function EditModal({ type, shareholder, onClose }: EditModalProps) {
  const [formData, setFormData] = useState({
    firstName: "Aminu",
    lastName: "Kano",
    otherName: "Danburu",
    email: "aminul@gmail.com",
    phoneNumber: "080 44 22 11 60",
    sex: "",
    shareholderType: "Individual",
    nextOfKin: "Kano Aisha",
    address: "2 Aminu Kano Crescent, Ikoyi Lagos state, Nigeria",
    bankName: "Amadu Pinnock",
    accountNumber: "2002121458",
    accountType: "Current",
  });

  if (type === "personal") {
    return (
      <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
        <div className="bg-white rounded-lg shadow-lg w-full max-w-2xl max-h-[90vh] overflow-y-auto">
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-border">
            <h2 className="text-xl font-bold text-foreground">
              Edit Shareholder Personal Information
            </h2>
            <button
              onClick={onClose}
              className="text-muted-foreground hover:text-foreground"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          {/* Content */}
          <div className="p-6">
            <h3 className="text-lg font-semibold text-foreground mb-6">
              Edit Personal Information
            </h3>

            <div className="space-y-4 mb-6">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm text-foreground mb-2">
                    First Name
                  </label>
                  <input
                    type="text"
                    value={formData.firstName}
                    onChange={(e) =>
                      setFormData({ ...formData, firstName: e.target.value })
                    }
                    className="w-full px-3 py-2 border border-input rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                </div>
                <div>
                  <label className="block text-sm text-foreground mb-2">
                    Last Name
                  </label>
                  <input
                    type="text"
                    value={formData.lastName}
                    onChange={(e) =>
                      setFormData({ ...formData, lastName: e.target.value })
                    }
                    className="w-full px-3 py-2 border border-input rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm text-foreground mb-2">
                    Other Name
                  </label>
                  <input
                    type="text"
                    value={formData.otherName}
                    onChange={(e) =>
                      setFormData({ ...formData, otherName: e.target.value })
                    }
                    className="w-full px-3 py-2 border border-input rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                </div>
                <div>
                  <label className="block text-sm text-foreground mb-2">
                    Email Address
                  </label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) =>
                      setFormData({ ...formData, email: e.target.value })
                    }
                    className="w-full px-3 py-2 border border-input rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm text-foreground mb-2">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    value={formData.phoneNumber}
                    onChange={(e) =>
                      setFormData({ ...formData, phoneNumber: e.target.value })
                    }
                    className="w-full px-3 py-2 border border-input rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                </div>
                <div>
                  <label className="block text-sm text-foreground mb-2">
                    Sex
                  </label>
                  <select className="w-full px-3 py-2 border border-input rounded-lg focus:outline-none focus:ring-2 focus:ring-primary">
                    <option>Select Options</option>
                    <option>Male</option>
                    <option>Female</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm text-foreground mb-2">
                    Shareholder Type
                  </label>
                  <select
                    value={formData.shareholderType}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        shareholderType: e.target.value,
                      })
                    }
                    className="w-full px-3 py-2 border border-input rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                  >
                    <option>Individual</option>
                    <option>Corporate</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm text-foreground mb-2">
                    Next of Kin
                  </label>
                  <input
                    type="text"
                    value={formData.nextOfKin}
                    onChange={(e) =>
                      setFormData({ ...formData, nextOfKin: e.target.value })
                    }
                    className="w-full px-3 py-2 border border-input rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm text-foreground mb-2">
                  Address
                </label>
                <input
                  type="text"
                  value={formData.address}
                  onChange={(e) =>
                    setFormData({ ...formData, address: e.target.value })
                  }
                  className="w-full px-3 py-2 border border-input rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>
            </div>

            {/* File Upload */}
            <div className="mb-6 p-4 border-2 border-dashed border-border rounded-lg text-center">
              <Upload className="w-8 h-8 text-muted-foreground mx-auto mb-2" />
              <p className="text-sm font-medium text-foreground">
                Upload Shareholder's Request
              </p>
              <p className="text-xs text-muted-foreground">JPG, JPEG, PNG</p>
            </div>

            {/* Buttons */}
            <div className="flex gap-3">
              <Button
                onClick={onClose}
                className="flex-1 bg-white border border-input text-foreground hover:bg-muted"
              >
                Cancel
              </Button>
              <Button className="flex-1 bg-primary text-primary-foreground hover:bg-primary/90">
                Save
              </Button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-2xl">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-border">
          <h2 className="text-xl font-bold text-foreground">
            Edit Shareholder's Bank Mandate (E-Dividend)
          </h2>
          <button
            onClick={onClose}
            className="text-muted-foreground hover:text-foreground"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6">
          <h3 className="text-lg font-semibold text-foreground mb-6">
            Bank Mandate
          </h3>

          <div className="space-y-4 mb-6">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm text-foreground mb-2">
                  Bank Name
                </label>
                <input
                  type="text"
                  value={formData.bankName}
                  onChange={(e) =>
                    setFormData({ ...formData, bankName: e.target.value })
                  }
                  className="w-full px-3 py-2 border border-input rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>
              <div>
                <label className="block text-sm text-foreground mb-2">
                  Account Number
                </label>
                <input
                  type="text"
                  value={formData.accountNumber}
                  onChange={(e) =>
                    setFormData({ ...formData, accountNumber: e.target.value })
                  }
                  className="w-full px-3 py-2 border border-input rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm text-foreground mb-2">
                Account Type
              </label>
              <select
                value={formData.accountType}
                onChange={(e) =>
                  setFormData({ ...formData, accountType: e.target.value })
                }
                className="w-full px-3 py-2 border border-input rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
              >
                <option>Current</option>
                <option>Savings</option>
              </select>
            </div>
          </div>

          {/* Buttons */}
          <div className="flex gap-3">
            <Button
              onClick={onClose}
              className="flex-1 bg-white border border-input text-foreground hover:bg-muted"
            >
              Cancel
            </Button>
            <Button className="flex-1 bg-primary text-primary-foreground hover:bg-primary/90">
              Save
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

"use client";
import { useState } from "react";
import { SearchModal } from "@/components/search-modal";
import { ArrowLeft, Plus, AlertTriangle, FileText, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ShareholderSelector } from "@/components/shareholder-selector";
import { ShareholderInfo } from "@/components/shareholder-info";
import { ShareholderTabs } from "@/components/shareholder-tabs";
import { EditModal } from "@/components/edit-modal";
import { CautionModal } from "@/components/caution-modal";

const page = () => {
  const [selectedShareholder, setSelectedShareholder] = useState<any>(null);
  const [showSearch, setShowSearch] = useState(true);

  const handleSelectShareholder = (shareholder: any) => {
    setSelectedShareholder(shareholder);
    setShowSearch(false);
  };

  const handleBackToSearch = () => {
    setShowSearch(true);
    setSelectedShareholder(null);
  };
  return (
    <div className="min-h-screen">
      {showSearch ? (
        <SearchModal onSelectShareholder={handleSelectShareholder} />
      ) : (
        <ShareholderPage
          shareholder={selectedShareholder}
          onBack={handleBackToSearch}
        />
      )}
    </div>
  );
};

export default page;

interface ShareholderPageProps {
  shareholder: any;
  onBack: () => void;
}

function ShareholderPage({ shareholder, onBack }: ShareholderPageProps) {
  const [currentShareholder, setCurrentShareholder] = useState(shareholder);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [editType, setEditType] = useState<"personal" | "bank" | null>(null);
  const [cautionOpen, setCautionOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("holdings");

  const handleEditClick = (type: "personal" | "bank") => {
    setEditType(type);
    setEditModalOpen(true);
  };

  return (
    <div className="min-h-screen bg-[#F2F2F2]">
      <div className="min-h-screen px-4 sm:px-6 md:px-10 lg:px-14 py-6 md:py-8">
        <div className="mx-auto">
          {/* Title and Action Buttons */}
          <div className="flex flex-col justify-between md:flex-row mb-4 md:mb-8">
            <h1 className="text-2xl md:text-3xl font-bold text-slate-900 mb-3 md:mb-0">
              Shareholder Management
            </h1>
            <div className="flex gap-2 md:gap-3 md:justify-end overflow-x-auto">
              <Button className="border border-slate-300 bg-white text-slate-900 hover:bg-gray-50 gap-2 px-3 md:px-6 text-xs md:text-sm rounded-full">
                <Plus className="w-3 h-3 md:w-4 md:h-4" />
                <span className="sm:inline">New Shareholder</span>
              </Button>
              <Button className="border border-slate-300 bg-white text-slate-900 hover:bg-gray-50 px-3 md:px-6 text-xs md:text-sm rounded-full">
                <span className="sm:inline">Probate Administration</span>
              </Button>
              <Button
                onClick={() => setCautionOpen(true)}
                className="bg-red-600 text-white hover:bg-red-700 gap-2 px-3 md:px-6 text-xs md:text-sm rounded-full"
              >
                <AlertTriangle className="w-3 h-3 md:w-4 md:h-4" />
                <span className="sm:inline">Caution Account</span>
              </Button>
              <Button className="bg-slate-900 text-white hover:bg-slate-800 gap-2 px-3 md:px-6 text-xs md:text-sm rounded-full">
                <FileText className="w-3 h-3 md:w-4 md:h-4" />
                <span className="sm:inline">Generate Report</span>
              </Button>
            </div>
          </div>

          {/* Selector Section - Stacked on mobile */}
          <div className="rounded-lg mb-4 md:mb-8 md:h-[15vh]">
            <div className="flex flex-col md:flex-row md:gap-8 md:items-center gap-4 w-full justify-between h-full">
              {/* Avatar */}
              <div className="flex gap-4 w-full md:w-1/2 items-center h-full">
                <div className="w-16 h-16 md:w-36 md:h-36 rounded-full bg-gray-200 flex items-center justify-center mx-auto md:mx-0">
                  <Users className="w-8 h-8 md:w-12 md:h-12 text-gray-400" />
                </div>
                <div className="w-3/4 md:w-3/4 shadow p-4 bg-white h-full flex items-center rounded-lg">
                  <ShareholderSelector
                    currentShareholder={currentShareholder}
                    onSelectShareholder={setCurrentShareholder}
                  />
                </div>
              </div>

              {/* Selector and Info - Stacked on mobile, side by side on desktop */}
              <div className="md:flex md:gap-8 md:w-1/2 h-full">
                {/* Info Display - Full width on mobile, side by side on desktop */}
                {
                  // currentShareholder &&
                  <div className="bg-white rounded-lg p-4 md:p-4 md:min-w-fit shadow md:w-full">
                    <div className="flex flex-col gap-2">
                      <div>
                        <p className="text-gray-500 text-sm font-medium">
                          Holder No:{" "}
                          <span className="font-semibold text-slate-900 truncate">
                            {" "}
                            4
                          </span>
                        </p>
                      </div>
                      <div>
                        <p className="text-gray-500 text-sm font-medium">
                          Total No of Holdings:{" "}
                          <span className="font-semibold text-slate-900 truncate">
                            {" "}
                            10
                          </span>
                        </p>
                      </div>
                      <div>
                        <p className="text-gray-500 text-sm font-medium">
                          Company/Registers:{" "}
                          <span className="font-semibold text-slate-900 truncate">
                            {" "}
                            Oando
                          </span>
                        </p>
                      </div>
                      <div>
                        <p className="text-gray-500 text-sm font-medium">
                          Clearing House Number:{" "}
                          <span className="font-semibold text-slate-900 truncate">
                            {" "}
                            253738464
                          </span>
                        </p>
                      </div>
                    </div>
                  </div>
                }
              </div>
            </div>
          </div>

          {/* Personal Information and Bank Mandates Cards */}
          <div className="mb-4 md:mb-8">
            <ShareholderInfo
              shareholder={currentShareholder}
              onEditPersonal={() => handleEditClick("personal")}
              onEditBank={() => handleEditClick("bank")}
            />
          </div>

          {/* Tabs Section */}
          <div className="bg-white rounded-lg shadow overflow-hidden">
            <ShareholderTabs
              activeTab={activeTab}
              onTabChange={setActiveTab}
              shareholder={currentShareholder}
            />
          </div>
        </div>

        {/* Modals */}
        {editModalOpen && (
          <EditModal
            type={editType!}
            shareholder={currentShareholder}
            onClose={() => setEditModalOpen(false)}
          />
        )}

        {cautionOpen && <CautionModal onClose={() => setCautionOpen(false)} />}
      </div>

      {/* Modals */}
      {editModalOpen && (
        <EditModal
          type={editType!}
          shareholder={currentShareholder}
          onClose={() => setEditModalOpen(false)}
        />
      )}

      {cautionOpen && <CautionModal onClose={() => setCautionOpen(false)} />}
    </div>
  );
}

"use client";
import { useState, useEffect } from "react";
import { SearchModal } from "@/components/search-modal";
import { ArrowLeft, Plus, AlertTriangle, FileText, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ShareholderSelector } from "@/components/shareholder-selector";
import { ShareholderInfo } from "@/components/shareholder-info";
import { ShareholderTabs } from "@/components/shareholder-tabs";
import { EditModal } from "@/components/edit-modal";
import { CautionModal } from "@/components/caution-modal";
import { NewShareholderModal } from "@/components/new-shareholder-modal";
import { MergeAccountModal } from "@/components/merge-account-modal";
import { LinkHoldingModal } from "@/components/link-holding-modal";
import { ProbateAdministrationModal } from "@/components/probate-administration-modal";
import { LinkJointHolderModal } from "@/components/link-joint-holder-modal";
import { AmalgamateModal } from "@/components/amalgamate-modal";
import { CertificateSplitModal } from "@/components/certificate-split-modal";
import { CertificateUpdateModal } from "@/components/certificate-update-modal";
import { ShareholderManagementModal } from "@/components/shareholderManagementProps";
import { useRouter } from "next/navigation";
import { useSelector } from "react-redux";
import { toast } from "sonner";

const page = () => {
  const [selectedShareholder, setSelectedShareholder] = useState<any>(null);
  const [showSearch, setShowSearch] = useState(false);
  const [askModal, setAskModal] = useState(true);
  const [addModal, setAddModal] = useState(false);
  const router = useRouter();
  const { user, status } = useSelector((state: any) => state.auth);

  useEffect(() => {
    if (status === "loading") return;

    if (!user?.permissions?.includes("shares.view")) {
      toast.error("You are not authorized to view this module.");
      router.push("/dashboard");
    }
  }, [user, status, router]);

  const handleSelectShareholder = (shareholder: any) => {
    setSelectedShareholder(shareholder);
    setShowSearch(false);
  };

  const handleBackToSearch = () => {
    setShowSearch(true);
    setSelectedShareholder(null);
  };

  const onCreateNew = () => {
    setAddModal(true);
    setAskModal(false);
    setShowSearch(false);
  };

  const onSearchExisting = () => {
    setShowSearch(true);
    setAddModal(false);
    setAskModal(false);
  };

  const onClose = () => {
    setAskModal(false);
    router.push("/dashboard");
  };

  return (
    <div className="min-h-screen">
      {showSearch === true && askModal === false && addModal === false ? (
        <SearchModal
          onSelectShareholder={handleSelectShareholder}
          setShowSearch={setShowSearch}
        />
      ) : showSearch === false && askModal === false && addModal === false ? (
        <ShareholderPage
          shareholder={selectedShareholder}
          onBack={handleBackToSearch}
          setAddModal={setAddModal}
        />
      ) : showSearch === false && askModal === true && addModal === false ? (
        <ShareholderManagementModal
          onCreateNew={onCreateNew}
          onSearchExisting={onSearchExisting}
          onClose={onClose}
        />
      ) : showSearch === false && askModal === false && addModal === true ? (
        <NewShareholderModal
          onClose={() => setAddModal(false)}
          addModal={addModal}
          setAddModal={setAddModal}
        />
      ) : null}
    </div>
  );
};

export default page;

interface ShareholderPageProps {
  shareholder: any;
  onBack: () => void;
  setAddModal: (a: boolean) => void;
}

function ShareholderPage({
  shareholder,
  onBack,
  setAddModal,
}: ShareholderPageProps) {
  const [currentShareholder, setCurrentShareholder] = useState(shareholder);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [editType, setEditType] = useState<"personal" | "bank" | null>(null);
  const [cautionOpen, setCautionOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("holdings");
  const [newShareholderOpen, setNewShareholderOpen] = useState(false);
  const [mergeAccountOpen, setMergeAccountOpen] = useState(false);
  const [linkHoldingOpen, setLinkHoldingOpen] = useState(false);
  const [linkJointHolderOpen, setLinkJointHolderOpen] = useState(false);
  const [probateAdminOpen, setProbateAdminOpen] = useState(false);
  const [amalgamateOpen, setAmalgamateOpen] = useState(false);
  const [certificateSplitOpen, setCertificateSplitOpen] = useState(false);
  const [certificateUpdateOpen, setCertificateUpdateOpen] = useState(false);

  const handleEditClick = (type: "personal" | "bank") => {
    setEditType(type);
    setEditModalOpen(true);
  };

  useEffect(() => {
    setAddModal(false);
  }, []);

  return (
    <div className="min-h-screen bg-[#F2F2F2]">
      <div className="min-h-screen px-4 sm:px-6 md:px-10 lg:px-14 py-6 md:py-8">
        <div className="mx-auto flex flex-col gap-4 md:gap-8">
          {/* Title and Action Buttons */}
          <div className="flex flex-col justify-between md:flex-row">
            <h1 className="text-2xl md:text-3xl font-bold text-[#0F2763] font-ubuntu mb-3 md:mb-0">
              Shareholder Management
            </h1>
            <div className="flex gap-2 md:gap-3 md:justify-end overflow-x-auto">
              <Button
                onClick={() => setNewShareholderOpen(true)}
                className="border border-slate-300 bg-white text-slate-900 hover:bg-gray-50 gap-2 px-3 md:px-6 text-xs md:text-sm rounded-full"
              >
                <Plus className="w-3 h-3 md:w-4 md:h-4" />
                <span className="sm:inline">New Shareholder</span>
              </Button>
              <Button
                onClick={() => setLinkJointHolderOpen(true)}
                className="border border-slate-300 bg-white text-slate-900 hover:bg-gray-50 gap-2 px-3 md:px-6 text-xs md:text-sm rounded-full"
              >
                <Plus className="w-3 h-3 md:w-4 md:h-4" />
                <span className="sm:inline">Link Holder</span>
              </Button>
              <Button
                onClick={() => setProbateAdminOpen(true)}
                className="border border-slate-300 bg-white text-slate-900 hover:bg-gray-50 px-3 md:px-6 text-xs md:text-sm rounded-full"
              >
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
          <div className="rounded-lg md:h-[15vh] md:min-h-[15vh]">
            <div className="flex flex-col md:flex-row md:gap-8 md:items-center gap-4 w-full justify-between h-full">
              {/* Avatar */}
              <div className="flex gap-4 w-full md:w-1/2 items-center justify-between h-full">
                <div className="w-16 h-16 md:w-36 md:h-36 rounded-full bg-gray-200 flex items-center justify-center mx-auto md:mx-0 border-gray-300 border-[4px]">
                  <Users className="w-8 h-8 md:w-12 md:h-12 text-gray-400" />
                </div>
                <div className="w-3/4 md:w-[80%] shadow p-4 bg-white h-full flex items-center rounded-lg min-h-[120px] border-gray-400 border-[1px]">
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
                  <div className="bg-white rounded-lg p-4 md:p-4 md:min-w-fit shadow md:w-full flex flex-col gap-2 min-h-fit text-sm md:text-base">
                    {/* <div className="flex flex-col "> */}
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
                    {/* </div> */}
                  </div>
                }
              </div>
            </div>
          </div>

          {/* Personal Information and Bank Mandates Cards */}
          <div className="">
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
              onLinkNewRegister={() => setLinkHoldingOpen(true)}
              onMergeAccount={() => setMergeAccountOpen(true)}
              onLinkJointHolder={() => setLinkJointHolderOpen(true)}
              onAmalgamate={() => setAmalgamateOpen(true)}
              onCertificateSplit={() => setCertificateSplitOpen(true)}
              onCertificateUpdate={() => setCertificateUpdateOpen(true)}
            />
          </div>

          {/* Recent Activities section at the bottom */}
          <div className="bg-white rounded-lg shadow mt-6 p-4 md:p-6">
            <h2 className="text-lg md:text-xl font-bold text-slate-900 mb-4">
              Recent Activities/Log
            </h2>

            {/* Desktop table view */}
            <div className="hidden md:block overflow-x-auto border rounded-lg">
              <table className="w-full text-sm">
                <thead className="bg-gray-100 border-b">
                  <tr>
                    <th className="text-left px-4 py-3 font-semibold text-slate-900">
                      Date
                    </th>
                    <th className="text-left px-4 py-3 font-semibold text-slate-900">
                      Time
                    </th>
                    <th className="text-left px-4 py-3 font-semibold text-slate-900">
                      Action Type
                    </th>
                    <th className="text-left px-4 py-3 font-semibold text-slate-900">
                      Module
                    </th>
                    <th className="text-left px-4 py-3 font-semibold text-slate-900">
                      User
                    </th>
                    <th className="text-left px-4 py-3 font-semibold text-slate-900">
                      Status
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b hover:bg-gray-50">
                    <td className="px-4 py-3 text-gray-700">11-11-2025</td>
                    <td className="px-4 py-3 text-gray-700">04:04:43 PM</td>
                    <td className="px-4 py-3 text-gray-700">
                      Change of Address
                    </td>
                    <td className="px-4 py-3 text-gray-700">Shareholder Mgt</td>
                    <td className="px-4 py-3 text-gray-700">
                      Emmanuel Effiong
                    </td>
                    <td className="px-4 py-3 text-yellow-600 font-medium">
                      Pending
                    </td>
                  </tr>
                  <tr className="border-b hover:bg-gray-50">
                    <td className="px-4 py-3 text-gray-700">11-11-2025</td>
                    <td className="px-4 py-3 text-gray-700">04:04:43 PM</td>
                    <td className="px-4 py-3 text-gray-700">
                      Certificate Update
                    </td>
                    <td className="px-4 py-3 text-gray-700">Shareholder Mgt</td>
                    <td className="px-4 py-3 text-gray-700">Ifeanyi Ukomodu</td>
                    <td className="px-4 py-3 text-green-600 font-medium">
                      Approved
                    </td>
                  </tr>
                  <tr className="hover:bg-gray-50">
                    <td className="px-4 py-3 text-gray-700">11-11-2025</td>
                    <td className="px-4 py-3 text-gray-700">04:04:43 PM</td>
                    <td className="px-4 py-3 text-gray-700">
                      Dividend Payment
                    </td>
                    <td className="px-4 py-3 text-gray-700">Shareholder Mgt</td>
                    <td className="px-4 py-3 text-gray-700">
                      Emmanuel Effiong
                    </td>
                    <td className="px-4 py-3 text-yellow-600 font-medium">
                      Pending
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            {/* Mobile card view */}
            <div className="md:hidden space-y-3">
              {[
                {
                  date: "11-11-2025",
                  time: "04:04:43 PM",
                  action: "Change of Address",
                  module: "Shareholder Mgt",
                  user: "Emmanuel Effiong",
                  status: "Pending",
                },
                {
                  date: "11-11-2025",
                  time: "04:04:43 PM",
                  action: "Certificate Update",
                  module: "Shareholder Mgt",
                  user: "Ifeanyi Ukomodu",
                  status: "Approved",
                },
                {
                  date: "11-11-2025",
                  time: "04:04:43 PM",
                  action: "Dividend Payment",
                  module: "Shareholder Mgt",
                  user: "Emmanuel Effiong",
                  status: "Pending",
                },
              ].map((activity, i) => (
                <div key={i} className="bg-gray-50 p-3 rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <p className="font-semibold text-slate-900 text-sm">
                      {activity.action}
                    </p>
                    <p
                      className={`text-xs font-medium ${
                        activity.status === "Pending"
                          ? "text-yellow-600"
                          : "text-green-600"
                      }`}
                    >
                      {activity.status}
                    </p>
                  </div>
                  <p className="text-xs text-gray-600">
                    {activity.user} · {activity.module}
                  </p>
                  <p className="text-xs text-gray-500">
                    {activity.date} · {activity.time}
                  </p>
                </div>
              ))}
            </div>
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
      {newShareholderOpen && (
        <NewShareholderModal
          onClose={() => setNewShareholderOpen(false)}
          addModal={false}
        />
      )}
      {mergeAccountOpen && (
        <MergeAccountModal onClose={() => setMergeAccountOpen(false)} />
      )}
      {linkHoldingOpen && (
        <LinkHoldingModal onClose={() => setLinkHoldingOpen(false)} />
      )}
      {linkJointHolderOpen && (
        <LinkJointHolderModal onClose={() => setLinkJointHolderOpen(false)} />
      )}
      {probateAdminOpen && (
        <ProbateAdministrationModal
          onClose={() => setProbateAdminOpen(false)}
        />
      )}
      {amalgamateOpen && (
        <AmalgamateModal onClose={() => setAmalgamateOpen(false)} />
      )}
      {certificateSplitOpen && (
        <CertificateSplitModal onClose={() => setCertificateSplitOpen(false)} />
      )}
      {certificateUpdateOpen && (
        <CertificateUpdateModal
          onClose={() => setCertificateUpdateOpen(false)}
        />
      )}
    </div>
  );
}

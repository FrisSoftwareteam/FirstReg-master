import React from "react";

interface ModuleCardProps {
  title: string;
  description: string;
  onClick?: () => void;
  icon?: React.ReactNode;
}

const ModuleCard: React.FC<ModuleCardProps> = ({ title, description, onClick, icon }) => {
  return (
    <button
      onClick={onClick}
      className="bg-white rounded-lg px-8 py-10 shadow-sm border border-gray-100 transition-all duration-300 hover:shadow-md hover:bg-[rgba(253,253,250,0.5)] cursor-pointer relative max-w-[400px] min-w-[366px] w-full"
    >
      <div className="flex gap-1 mb-4">
        {icon ? icon : <div className="w-3 h-3 bg-primary" />}
      </div>
      <h3 className="text-lg font-poppins font-[700] text-primary mb-3">{title}</h3>
      <p className="text-gray-600 font-poppins text-[10px] font-[400] leading-relaxed">{description}</p>
    </button>
  );
};

export default ModuleCard;
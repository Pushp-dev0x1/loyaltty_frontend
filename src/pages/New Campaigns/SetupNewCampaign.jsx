import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import MainPreviewTemplate from "../../components/MainPreviewTemplate/MainPreviewTemplate";
import SelectPlatform from "./SelectPlatform/SelectPlatform";
import AboutCampaign from "./AboutCampaign/AboutCampaign";
import TermsConditions from "./TermsConditions/TermsConditions";
import CreateDesign from "./CreateDesign/CreateDesign";
import WhatsAppEdit from "./WhatsAppEdit​/WhatsAppEdit​";
import SMSEdit from "./SMSEdit​/SMSEdit​";
import EmailEdit from "./EmailEdit​/EmailEdit​";
import TargetCustomers from "./TargetCustomers/TargetCustomers";
import Budget from "./Budget/Budget";

const SetupNewCampaign = () => {
  const [selectedCampaignType, setSelectedCampaignType] = useState(null);
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(0);

  const handleBackClick = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    } else {
      navigate("/SelectTemplates");
    }
  };

  const handleContinueClick = () => {
    if (currentStep < 7) {
      setCurrentStep(currentStep + 1);
    } else {
      navigate("/FullSummary");
    }
  };

  const renderStep = () => {
    switch (currentStep) {
      case 0:
        return <SelectPlatform />;
      case 1:
        return <AboutCampaign />;
      case 2:
        return <TermsConditions />;
      case 3:
        return <CreateDesign />;
      case 4:
        return <WhatsAppEdit />;
      case 5:
        return <SMSEdit />;
      case 6:
        return <EmailEdit />;
      case 7:
        return <TargetCustomers />;
      default:
        return null;
    }
  };

  const renderPreview = () => {
    if (currentStep >= 1 && currentStep <= 6) {
      return <MainPreviewTemplate />;
    } else if (currentStep === 7) {
      return (
        <aside className="flex-1 bg-blue-50 rounded-2xl p-6 shadow-lg flex flex-col justify-center items-center overflow-y-auto max-h-full">
          <Budget />
        </aside>
      );
    } else {
      return (
        <aside className="flex-1 bg-blue-50 rounded-2xl p-6 shadow-lg flex flex-col justify-center items-center overflow-y-auto max-h-full">
          <div className="campaign-type-selector bg-transparent rounded-xl p-4 w-full max-w-2xl">
            <h2 className="text-xl font-bold mb-3 text-[#040869] text-center">
              What type of campaign do you want to run?
            </h2>
            <form className="flex justify-center">
              <div className="space-y-3 max-w-md w-full">
                {[
                  {
                    id: "discount",
                    label: "$ Discount",
                    example: "Get $5 off when you spend $30",
                    icon: "💰",
                  },
                  {
                    id: "percentDiscount",
                    label: "% Discount",
                    example: "Get 10% off when you spend $50",
                    icon: "📊",
                  },
                  {
                    id: "freeItem",
                    label: "Free Item",
                    example: "Get a coffee free when you spend $30",
                    icon: "🎁",
                  },
                  {
                    id: "buyOneGetOne",
                    label: "Buy 1 Get 1",
                    example: "Buy a beer and get a beer free",
                    icon: "🍻",
                  },
                  {
                    id: "nodiscount",
                    label: "No Discount",
                    example:
                      "Continue for now with no discount",
                    icon: "🎉",
                  },
                ].map((option) => (
                  <div
                    key={option.id}
                    className={`flex items-center p-2 border-2 rounded-lg transition-all duration-300 cursor-pointer group hover:bg-[#DCF8FF] hover:border-[#040869] ${
                      selectedCampaignType === option.id
                        ? "activeFilter border-[#040869] bg-[#DCF8FF]"
                        : "filter border-[#dcf8ff] bg-white"
                    }`}
                  >
                    <input
                      type="radio"
                      id={option.id}
                      name="campaignType"
                      value={option.id}
                      className="w-5 h-5 text-[#040869] border-[#040869] focus:ring-[#040869] cursor-pointer checked:bg-[#040869] transition-all duration-300"
                      onChange={() => setSelectedCampaignType(option.id)}
                      checked={selectedCampaignType === option.id}
                    />
                    <label
                      htmlFor={option.id}
                      className="ml-2 flex-grow cursor-pointer"
                    >
                      <span className="text-base font-semibold text-[#040869] flex items-center">
                        <span className="mr-1 text-lg">{option.icon}</span>
                        {option.label}
                      </span>
                      <span className="text-xs text-gray-600 block mt-0.5 transition-colors duration-300 group-hover:text-[#040869]">
                        {option.example}
                      </span>
                    </label>
                  </div>
                ))}
              </div>
            </form>
          </div>
        </aside>
      );
    }
  };

  return (
    <section className="flex items-center justify-center h-screen text-[#040869] bg-gradient-to-br from-[#040869] to-[#DCF8FF] p-4 selection:text-white selection:bg-[#040869]">
      <div className="flex flex-col lg:flex-row gap-8 w-full max-w-7xl h-full p-8 bg-white rounded-3xl shadow-2xl overflow-hidden">
        {/* Main Content */}
        <div className="flex-1 flex flex-col space-y-6 overflow-y-auto max-h-full">
          <div className="flex justify-between items-center ">
            <button
              onClick={handleBackClick}
              className="bg-transparent text-[#040869] text-sm underline hover:text-[#060c92] transition duration-300"
            >
              Back
            </button>
            <span>{currentStep + 1}/8</span>
            <button
              onClick={handleContinueClick}
              className="bg-[#040869] text-white px-6 py-2 rounded-md shadow hover:bg-[#060c92] transition duration-300"
              // disabled={currentStep === 0 && !selectedCampaignType}
            >
              Continue
            </button>
          </div>

          <ProgressBar currentStep={currentStep} />

          {renderStep()}
        </div>

        {renderPreview()}
      </div>
    </section>
  );
};

const ProgressBar = ({ currentStep }) => (
  <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
    <div
      className="bg-[#040869] h-2 rounded-full transition-all duration-500 ease-in-out"
      style={{ width: `${((currentStep + 1) / 8) * 100}%` }}
    />
  </div>
);

export default SetupNewCampaign;

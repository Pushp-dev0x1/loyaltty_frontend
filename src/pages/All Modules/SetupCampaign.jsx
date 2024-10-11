import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import MainPreviewTemplate from "../../components/MainPreviewTemplate/MainPreviewTemplate";
import SelectPlatform from "./SelectPlatform/SelectPlatform";
import AboutCampaign from "./AboutCampaign/AboutCampaign";
import TermsConditions from "./TermsConditions/TermsConditions";
import SelectUsers from "./SelectUsers/SelectUsers";
import Summary from "./Summary/Summary";

const SetupCampaign = () => {
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
    if (currentStep < 3) {
      setCurrentStep(currentStep + 1);
    } else {
      navigate("/summary");
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
        return <SelectUsers />;
      default:
        return null;
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
            <button
              onClick={handleContinueClick}
              className="bg-[#040869] text-white px-6 py-2 rounded-md shadow hover:bg-[#060c92] transition duration-300"
            >
              Continue
            </button>
          </div>

          <ProgressBar currentStep={currentStep} />

          {renderStep()}
        </div>

        {/* Sidebar */}

        <MainPreviewTemplate
          maintitle={"Jai Hind! Enjoy 20% Off on this Kargil Victory Day!"}
        />
      </div>
    </section>
  );
};

const ProgressBar = ({ currentStep }) => (
  <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
    <div
      className="bg-[#040869] h-2 rounded-full transition-all duration-500 ease-in-out"
      style={{ width: `${((currentStep + 1) / 4) * 100}%` }}
    />
  </div>
);

export default SetupCampaign;

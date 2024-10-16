import React, { useEffect, useState } from "react";
import { MessageSquare, Mail, MessagesSquare } from "lucide-react";
import { FaWhatsapp } from "react-icons/fa";
import {
  useGetAllActiveTemplatesQuery,
  useGetTemplatesByCategoryQuery,
  useGetTemplatesByRewardTypeQuery,
} from "../../../store/services/templateService";
import PromotionalCard from "../../../components/Card/PromotionalCard";
import SmallPromotionalCard from "../../../components/Card/SmallPromotionalCard";

const SelectCampaign = ({
  selectedCampaignType,
  handleCheckboxChange,
  selectedOptions,
}) => {
  const { data: allcards, isLoading: isblogsloading } =
    useGetTemplatesByRewardTypeQuery(selectedCampaignType);
  const [continueClicked, setcontinueClicked] = useState(false);
  const rendertempleStep = () => {
    switch (selectedCampaignType) {
      case "amount":
        return "/images/discount.png";
      case "percent":
        return "/images/percent.png";
      case "freeItem":
        return "/images/freeitem.png";
      case "buyOneGetOne":
        return "/images/buyonegetone.png";
      case "nodiscount":
        return "/images/nodiscount.png";
      default:
        return undefined;
    }
  };

  useEffect(() => {
    if (selectedCampaignType) {
      setcontinueClicked(false);
    }
  }, [selectedCampaignType]);

  return (
    <div className="rounded-xl p-4 sm:p-8 w-full max-w-3xl">
      <h2 className="text-xl sm:text-3xl font-extrabold tracking-tight text-indigo-900 mb-2 sm:mb-4">
        {!continueClicked ? "Template Library" : "Select Recommended Type"}
      </h2>
      <p className="text-sm sm:text-lg leading-relaxed text-indigo-700 mb-4 sm:mb-8">
        {continueClicked &&
          "Choose your preferred discount type to see suggestions"}
      </p>
      {!continueClicked ? (
        <div className="flex flex-col justify-center mt-8 sm:mt-16 bg-white">
          <img
            loading="lazy"
            src={rendertempleStep()}
            alt=""
            className="object-contain w-full border border-solid rounded-[20px] sm:rounded-[35px]"
          />
          <button
            onClick={() => setcontinueClicked(true)}
            className="flex p-2 mt-4 sm:mt-5 text-xl sm:text-3xl items-center justify-center text-white border-solid bg-[#040869] border-[2px] border-black border-opacity-10 min-h-[40px] sm:min-h-[52px] rounded-[20px] sm:rounded-[32px] w-full sm:w-[300px] max-w-[564px] mx-auto sm:absolute sm:bottom-5 sm:left-1/2 sm:transform sm:-translate-x-1/2"
          >
            <span className="text-lg sm:text-xl h-full flex items-center justify-center w-full">
              Continue
            </span>
          </button>
        </div>
      ) : (
        <div className="image-grid mt-4 grid grid-cols-1 sm:grid-cols-2 gap-2">
          {allcards?.data?.map((card, index) => (
            <div key={index} className="image-container">
              <SmallPromotionalCard
                key={index}
                {...card}
                onGift={() => console.log("Gift button clicked")}
                onShare={() => console.log("Share button clicked")}
              />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SelectCampaign;

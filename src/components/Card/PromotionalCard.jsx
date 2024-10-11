import { RiWhatsappFill } from "react-icons/ri";
import React, { useState } from "react";
import { Boxes, CircleDollarSign, CirclePercent, CircleX, Gift } from "lucide-react";
import './main.css';
import { Link, useNavigate } from "react-router-dom";
import { resetStepAndCampaignId } from "../../store/reducers/authReducer";
import { useDispatch } from "react-redux";

const PromotionalCard = ({
  bannerImage,
  draft,
  name,
  description,
  rewardtype,
  discount,
  onGift,
  _id,
  onShare,
}) => {
  const [isFlipped, setIsFlipped] = useState(false);
  const navigate = useNavigate();
  const rendertempleStep = () => {
      
    switch (rewardtype) {
      
      case "amount":
        return <CircleDollarSign  className="h-5 w-5 sm:h-6 sm:w-6 text-green-900"/>
      case "percent":
        
        return  <CirclePercent  className="h-5 w-5 sm:h-6 sm:w-6 text-green-900" />; // Lock to "Whatsapp"
      case "freeItem":
        return  <Gift className="h-5 w-5 sm:h-6 sm:w-6 text-green-900" />; // Lock to "Whatsapp"
      case "buyOneGetOne":
        return <Boxes className="h-5 w-5 sm:h-6 sm:w-6 text-green-900" />; // Lock to "SMS"
      case "nodiscount":
        return <CircleX className="h-5 w-5 sm:h-6 sm:w-6 text-green-900" />; 
      default:
        return undefined;
    }
  };
  const rewardheading = () => {
      
    switch (rewardtype) {
      
      case "amount":
        return "$ OFF"
      case "percent":
        
        return  "% OFF"; // Lock to "Whatsapp"
      case "freeItem":
        return  "Free"; // Lock to "Whatsapp"
      case "buyOneGetOne":
        return "Buy One Get One"; // Lock to "SMS"
      case "nodiscount":
        return "--"; 
      default:
        return undefined;
    }
  };


  const handleMouseEnter = () => setIsFlipped(true);
  const handleMouseLeave = () => setIsFlipped(false);
  const dispatch = useDispatch();
  const handleCardClick = (e) => {
    e.preventDefault();

    dispatch(resetStepAndCampaignId());


    const path = draft ? `/editDraft/${_id}` : `/editcamp/${_id}`;
    navigate(path);
    window.scrollTo(0, 0);
  };

  return (
    <div
      onClick={handleCardClick}
      className="relative w-44 h-52 sm:w-56 sm:h-72 md:w-60 md:h-80 transform transition-all duration-500 ease-in-out hover:drop-shadow-xl rounded-2xl overflow-hidden shadow-md cursor-pointer"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div
        className={`absolute inset-0 w-full h-full transition-transform duration-500 ease-in-out ${isFlipped ? "drop-shadow-xl" : ""

          }`}
        style={{ transformStyle: "preserve-3d" }}
      >
        <div className="absolute inset-0 w-full h-full backface-hidden">
          <img
            className="w-full h-full object-cover rounded-2xl"
            src={bannerImage}
            alt={`Promotional image for ${name}`}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-transparent to-black/80 flex flex-col justify-between p-2 sm:p-3 rounded-2xl">
            <div className="flex flex-col items-start">
              <div className="mb-2">
                <span className="bg-red-500 text-white text-xs sm:text-sm font-bold px-2 py-1 rounded-full shadow-sm">
                  {rewardheading()}
                </span>
              </div>
              <h2 className="text-base sm:text-lg font-bold text-white leading-tight">
                {name}
                
              </h2>
            </div>
            <div className="flex justify-start gap-1 sm:gap-2 items-center mt-auto">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onGift();
                }}
                aria-label="Send as gift"
                className="p-1 sm:p-1 bg-white rounded-full"
              >
               {rendertempleStep()}
              </button>
            </div>
          </div>
        </div>

        {/* <div className="absolute inset-0 w-full h-full bg-gray-200 flex flex-col justify-center items-center p-3 sm:p-4 backface-hidden rotate-y-180 rounded-2xl">
          <h2 className="text-sm sm:text-base font-bold mb-2 text-gray-900 leading-tight text-center">
            {name}
          </h2>
          <p className="text-xs sm:text-sm text-gray-700 text-center mb-2">{description}</p>
          <div className="flex justify-center gap-2 sm:gap-3 items-center">
            <button
              onClick={(e) => {
                e.stopPropagation();
                onGift();
              }}
              aria-label="Send as gift"
              className="p-1 sm:p-2 bg-white rounded-full shadow hover:bg-gray-100 transition"
            >
              <Gift className="h-3 w-3 sm:h-4 sm:w-4 text-green-900" />
            </button>
            {platformContents?.length === 3 && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onShare();
                }}
                aria-label="Share on WhatsApp"
                className="p-1 sm:p-2 bg-white rounded-full shadow hover:bg-gray-100 transition"
              >
                <RiWhatsappFill className="h-3 w-3 sm:h-4 sm:w-4 text-green-600" />
              </button>
            )}
          </div>
        </div> */}
      </div>
    </div>
  );
};

export default PromotionalCard;
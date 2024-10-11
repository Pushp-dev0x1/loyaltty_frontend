import { RiWhatsappFill } from "react-icons/ri";
import React, { useState } from "react";
import { Gift } from "lucide-react";
import './main.css';
import { Link } from "react-router-dom";

const SmallPromotionalCard = ({
  bannerImage,
  draft,
  name,
  description,
  platformContents,
  discount,
  onGift,
  _id,
  onShare,
}) => {
  const [isFlipped, setIsFlipped] = useState(false);

  const handleMouseEnter = () => setIsFlipped(true);
  const handleMouseLeave = () => setIsFlipped(false);

  // Function to scroll to top when navigating
  const handleClick = () => {
    window.scrollTo(0, 0);
  };

  return (
    <Link to={draft ? `/editDraft/${_id}` : `/editcamp/${_id}`} onClick={handleClick}>
      <div
        className="relative w-38 h-54 sm:w-64 sm:h-80 md:w-58 md:h-70 transform transition-all duration-500 ease-in-out hover:drop-shadow-xl rounded-2xl overflow-hidden shadow-md"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <div
          className={`absolute inset-0 w-full h-full transition-transform duration-500 ease-in-out `}
          style={{ transformStyle: "preserve-3d" }}
        >
          <div className="absolute inset-0 w-full h-full backface-hidden">
            <img
              className="w-full h-full object-cover rounded-2xl"
              src={bannerImage}
              alt={`Promotional image for ${name}`}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent flex flex-col justify-between p-2 sm:p-3 md:p-4 rounded-2xl">
              <div className="absolute top-2 right-2 sm:top-3 sm:right-3 md:top-4 md:right-4">
                <span className="bg-red-500 text-white text-xs sm:text-sm md:text-base font-bold px-2 py-1 rounded-full shadow-sm">
                  {discount}% OFF
                </span>
              </div>
              <div className="flex justify-start gap-1 sm:gap-2 items-center mt-auto">
                <button
                  onClick={(e) => { e.preventDefault(); onGift(); }}
                  aria-label="Send as gift"
                  className="p-1 sm:p-2 bg-white rounded-full"
                >
                  <Gift className="h-3 w-3 sm:h-4 sm:w-4 md:h-5 md:w-5 text-green-900" />
                </button>
                {platformContents?.length === 3 && (
                  <button
                    onClick={(e) => { e.preventDefault(); onShare(); }}
                    aria-label="Share on WhatsApp"
                    className="p-1 sm:p-2 bg-white rounded-full"
                  >
                    <RiWhatsappFill className="h-3 w-3 sm:h-4 sm:w-4 md:h-5 md:w-5 text-green-600" />
                  </button>
                )}
              </div>
            </div>
          </div>
          <div className="absolute inset-0 w-full h-full bg-gray-200 flex flex-col justify-center items-center p-3 sm:p-4 md:p-5 backface-hidden rotate-y-180 rounded-2xl">
            <h2 className="text-sm sm:text-base md:text-lg font-bold mb-2 text-gray-900 leading-tight text-center">
              {name}
            </h2>
            <p className="text-xs sm:text-sm md:text-base text-gray-700 text-center mb-2">{description}</p>
            <div className="flex justify-center gap-2 sm:gap-3 items-center">
              <button
                onClick={(e) => { e.preventDefault(); onGift(); }}
                aria-label="Send as gift"
                className="p-1 sm:p-2 bg-white rounded-full shadow hover:bg-gray-100 transition"
              >
                <Gift className="h-3 w-3 sm:h-4 sm:w-4 md:h-5 md:w-5 text-green-900" />
              </button>
              {platformContents?.length === 3 && (
                <button
                  onClick={(e) => { e.preventDefault(); onShare(); }}
                  aria-label="Share on WhatsApp"
                  className="p-1 sm:p-2 bg-white rounded-full shadow hover:bg-gray-100 transition"
                >
                  <RiWhatsappFill className="h-3 w-3 sm:h-4 sm:w-4 md:h-5 md:w-5 text-green-600" />
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default SmallPromotionalCard;
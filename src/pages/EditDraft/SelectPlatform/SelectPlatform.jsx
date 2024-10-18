import React from "react";
import { MessageSquare, Mail, MessagesSquare } from "lucide-react";
import { FaWhatsapp } from "react-icons/fa";
import { useMediaQuery } from "@mui/material";

const SelectPlatform = ({
  maindata,
  handleCheckboxChange,
  selectedOptions,
  bannerImage,
}) => {
  const isMobile = useMediaQuery("(max-width: 600px)");
  const isTablet = useMediaQuery("(min-width: 601px) and (max-width: 1024px)");

  return (
    <>
      <div className="flex flex-col mx-auto w-full text-3xl font-semibold leading-none text-gray-900 bg-white rounded-3xl p-4 sm:p-6 md:p-8">
        <h2 className="text-lg sm:text-xl md:text-2xl font-semibold text-gray-800 mb-2">
          How do you want to send the Campaign?
        </h2>

        <p className="text-xs sm:text-sm md:text-base text-gray-500 mb-4">
          Choose your preferred communication channels
        </p>

        {maindata.map((item, index) => {
          const Icon =
            item.platformId.type === "whatsapp"
              ? "https://cdn.builder.io/api/v1/image/assets/TEMP/eedee36cff5fc292dceae6980b1fda5b74659ce945c0feb2cad04c718988ae92?placeholderIfAbsent=true&apiKey=d0018788f321472fb76f0852605a7e1f"
              : item.platformId.type === "email"
              ? "https://cdn.builder.io/api/v1/image/assets/TEMP/ccfdca0b8f4a8882d438a4bcfb7d0977e85429c0e35245f44a752a0cc95cad03?placeholderIfAbsent=true&apiKey=d0018788f321472fb76f0852605a7e1f"
              : item.platformId.type === "sms"
              ? "https://cdn.builder.io/api/v1/image/assets/TEMP/955b66fbf0f91ff53047e485a2e2f52b4b90675a14ba86b942d0b65fdd9cda8a?placeholderIfAbsent=true&apiKey=d0018788f321472fb76f0852605a7e1f"
              : "https://cdn.builder.io/api/v1/image/assets/TEMP/955b66fbf0f91ff53047e485a2e2f52b4b90675a14ba86b942d0b65fdd9cda8a?placeholderIfAbsent=true&apiKey=d0018788f321472fb76f0852605a7e1f";
          return (
            <div
              key={index}
              onClick={() => handleCheckboxChange(item.platformId.type)}
              className="flex flex-wrap gap-2 sm:gap-3 md:gap-5 justify-between items-center px-3 py-3 sm:px-5 sm:py-4 md:px-9 md:py-4 mt-4 w-full border border-solid border-blue-950 rounded-full cursor-pointer transition-all duration-300 hover:bg-gray-50"
            >
              <div className="flex gap-3 sm:gap-4 md:gap-9 items-center">
                {selectedOptions[item.platformId.type] ? (
                  <img
                    loading="lazy"
                    src="https://cdn.builder.io/api/v1/image/assets/TEMP/e3eeb287db08fcbff99ed0ff48250aa0ecbd18b4132c15fb194bfb45fbe97092?placeholderIfAbsent=true&apiKey=d0018788f321472fb76f0852605a7e1f"
                    alt="Selected icon"
                    className="object-contain shrink-0 rounded-md w-8 sm:w-10 md:w-[39px] aspect-square"
                  />
                ) : (
                  <div
                    className="flex shrink-0 h-8 sm:h-10 md:h-10 rounded-md border border-solid w-8 sm:w-10 md:w-[39px]"
                    role="presentation"
                  />
                )}

                <div className="text-base sm:text-lg md:text-2xl font-medium">
                  {item.platformId.name}
                </div>
              </div>

              <img
                loading="lazy"
                src={Icon}
                alt={`${item.platformId.name} icon`}
                className="object-contain shrink-0 w-8 sm:w-10 md:w-[47px] aspect-square"
              />
            </div>
          );
        })}
      </div>
    </>
  );
};

export default SelectPlatform;

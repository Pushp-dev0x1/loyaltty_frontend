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
  return (
    <>
      <div className="flex flex-col  mx-auto w-full text-3xl font-semibold leading-none text-gray-900 bg-white rounded-3xl  max-md:max-w-full">
        <h2 className="text-base sm:text-2xl font-semibold text-gray-800 max-md:mr-2.5 max-md:max-w-full mr-9">
          How do you want to send the Campaign?
        </h2>

        <p className="self-start text-xs md:text-base text-gray-500">
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
              onClick={() => handleCheckboxChange(item.platformId.type)}
              className="flex flex-wrap gap-2 md:gap-5 justify-between px-2 py-2 md:px-9 md:py-4 mt-7 w-full whitespace-nowrap border border-solid border-blue-950 rounded-[100px] max-md:px-5 max-md:max-w-full"
            >
              <div className="flex  gap-5  md:gap-9 my-auto items-center">
                {selectedOptions[item.platformId.type] ? (
                  <img
                    loading="lazy"
                    src={
                      "https://cdn.builder.io/api/v1/image/assets/TEMP/e3eeb287db08fcbff99ed0ff48250aa0ecbd18b4132c15fb194bfb45fbe97092?placeholderIfAbsent=true&apiKey=d0018788f321472fb76f0852605a7e1f"
                    }
                    alt={` icon`}
                    className="object-contain shrink-0 rounded-md aspect-[0.97] w-[39px]"
                  />
                ) : (
                  <div
                    className="flex shrink-0 h-10 rounded-md border border-solid w-[39px]"
                    role="presentation"
                  />
                )}

                <div className="text-xl sm:text-2xl">
                  {item.platformId.name}
                </div>
              </div>

              <img
                loading="lazy"
                src={Icon}
                alt={`active icon`}
                className="object-contain shrink-0 aspect-square w-[47px]"
              />
            </div>
          );
        })}

        {/* <img
          src={`${bannerImage}`}
    className=" cover"
    style={{
      // backgroundImage: `url('${formState.bannerImage}')`,
      // backgroundSize: 'contain', // Ensure the bannerImage covers the frame
      // backgroundPosition: 'center',
      // backgroundRepeat: 'no-repeat',
      height:isMobile ? "15%": '13%', // Fill the container
      width: '13%', // Fill the container
      alignSelf:"center",
      position:"absolute",
      top:isMobile ?10:40,
      borderRadius:10,
      right:isMobile ?10:80
    }}
         / > */}
      </div>
    </>
  );
};

export default SelectPlatform;

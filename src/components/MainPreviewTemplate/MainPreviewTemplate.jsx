import React, { useEffect, useState, useRef } from "react";
import ReactDevicePreview from "react-device-preview";
import CampaignCard from "../TemplateCard/TemplateCard";
import SmsCard from "../SMSCard/SmsCard";
import WhatsappPreview from "../WhatsappPreview/WhatsappPreview";
import "swiper/css";
import "swiper/css/effect-cards";
import { Swiper, SwiperSlide } from "swiper/react";
import { EffectCards } from "swiper/modules";
import EmailCampaignCard from "../TemplateCard/EmailTemplateCard";
import { useMediaQuery } from "@mui/material";
import EmailCard from "../EmailCard/EmailCard";

const MainPreviewTemplate = ({
  formdata,
  themeform,
  whatsappcontent,
  whatsappparameters,
  defaultButton,
  smscontent,
  smsparams,
  emailcontent,
  emailparams,
  main_url,
  checkedPlatforms,
  selectedwhatsappIndex,
  selected_SMSindex,
  selected_Emailindex,
  setCurrentStep
  
}) => {
  const allButtons = ["Creative", "Whatsapp", "SMS", "Email"];
  const buttons = allButtons.filter((button) => {
    if (button === "SMS" && !checkedPlatforms.sms) return false;
    if (button === "Whatsapp" && !checkedPlatforms.whatsapp) return false;
    if (button === "Email" && !checkedPlatforms.email) return false;
    return true;
  });

  const isMobile = useMediaQuery("(max-width: 600px)");
  const isTablet = useMediaQuery("(min-width: 601px) and (max-width: 1024px)");
  const [activeButton, setActiveButton] = useState(
    defaultButton !== undefined ? buttons[defaultButton] : "Creative"
  );
  console.log(defaultButton, "main button");

  const swiperRef = useRef(null);
  const [transitioning, setTransitioning] = useState(false);
  const [currentButton, setCurrentButton] = useState(activeButton);

  const handleClick = (buttonName) => {
    setActiveButton(buttonName);
    if(buttonName === "Email"){
      setCurrentStep(6)
    } else if (buttonName === "SMS"){
      setCurrentStep(5)
    } else if (buttonName === "Whatsapp"){
      setCurrentStep(4)
    } else if (buttonName === "Creative"){
      setCurrentStep(3)
    } 
    if (defaultButton === undefined || buttonName === buttons[defaultButton]) {
      if (activeButton === "Creative" && buttonName === "Email") {
        setTransitioning(true);
        setTimeout(() => {
          setActiveButton(buttonName);
        }, 300);
        setTimeout(() => {
          setCurrentButton(activeButton);
          setTransitioning(false);
        }, 400);
      } else {
        setActiveButton(buttonName);
        setCurrentButton(activeButton);
      }
    }
    const buttonIndex = buttons.indexOf(buttonName);
    if (swiperRef.current && swiperRef.current.swiper) {
      swiperRef.current.swiper.slideTo(buttonIndex);
    }
  };

  

  useEffect(() => {
    if (defaultButton !== undefined) {
      setActiveButton(buttons[defaultButton]);
      if (swiperRef.current && swiperRef.current.swiper) {
        swiperRef.current.swiper.slideTo(defaultButton);
      }
    } else {
      setActiveButton("Creative");
    }
  }, [defaultButton]);

 

  return (
    <aside
    className="flex-1 flex flex-col justify-start overflow-hidden max-h-full"
    style={{ scrollbarWidth: "none" }}
  >
    <div className="flex items-center justify-center sm:mb-2 mt-3 mb-2">
      <div
        className="rounded-full py-1 px-1 sm:px-2 mx-0 sm:mx-3 sm:py-1 flex justify-between overflow-x-auto border border-[#040869]"
        style={{
          scrollbarWidth: "none",
          width: `${buttons.length * (isMobile ? 80 : 100)}px`,
          maxWidth: "100%",
        }}
      >
        {buttons.map((button) => (
          <button
            key={button}
            className={`px-1 sm:px-3 py-1 sm:py-1 text-xs sm:text-sm rounded-full transition-colors duration-300 whitespace-nowrap ${
              activeButton === button
                ? "bg-[#040869] text-white shadow-md"
                : "text-[#040869]"
            }`}
            onClick={() => handleClick(button)}
          >
            {button}
          </button>
        ))}
      </div>
    </div>
  
    <
    >
      {activeButton === "Creative" ? (
        <>
          <CampaignCard
            transitioning={transitioning ? "animate-popout" : ""}
            {...formdata}
            bannerImage={themeform.bannerImage}
            rewardtype={themeform.rewardtype}
            logo={themeform.logo}
            textColor={themeform.textColor}
            themeColor={themeform.themeColor}
            contactno={themeform.contactno}
            main_url={main_url}
          />
        </>
      ) : (
        <div
          className="relative flex flex-col justify-start items-center max-w-full overflow-hidden mt-0"
          style={{
            backgroundImage: "url('/images/mobileframe2.png')",
            backgroundSize: "contain",
            backgroundPosition: "top", // Align the image to the top
            backgroundRepeat: "no-repeat",
            height: isMobile
              ? "calc(46vh)"
              : isTablet
              ? "calc(80vh)"
              : "calc(490px)",
            position: "sticky", // Stick the image to the top
            top: 0, // Position it at the top of the viewport
            zIndex: 10, // Keep the image above other content
          }}
        >
          <div className={`flex justify-center items-center w-full h-full m-0 p-0`}>
            {activeButton === "SMS" && (
              <SmsCard
                content={smscontent}
                parameters={smsparams}
                main_url={main_url}
                activeParameterIndex={selected_SMSindex}
              />
            )}
            {activeButton === "Whatsapp" && (
              <WhatsappPreview
                activeParameterIndex={selectedwhatsappIndex}
                logo={themeform.logo}
                content={whatsappcontent}
                parameters={whatsappparameters}
                main_url={main_url}
              />
            )}
            {activeButton === "Email" && (
              <div
                className={`flex justify-center items-center w-full h-full m-0 p-0`}
              >
                <EmailCard
                  content={emailcontent}
                  parameters={emailparams}
                  main_url={main_url}
                  activeParameterIndex={selected_Emailindex}
                />
              </div>
            )}
          </div>
        </div>
      )}
    </>
  </aside>
  
  );
};

export default MainPreviewTemplate;

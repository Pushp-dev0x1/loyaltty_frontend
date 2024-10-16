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

const MainPreviewTemplate = ({
  formdata,
  themeform,
  whatsappcontent,
  whatsappparameters,
  defaultButton,
  smscontent,
  smsparams,
  main_url,
  checkedPlatforms,
  selectedwhatsappIndex,
  selected_SMSindex,
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
    if (defaultButton === undefined || buttonName === buttons[defaultButton]) {
      if (activeButton == "Creative" && buttonName == "Email") {
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

  const handleSlideChange = (swiper) => {
    const newIndex = swiper.activeIndex;
    setActiveButton(buttons[newIndex]);
  };

  useEffect(() => {
    if (defaultButton !== undefined) {
      setActiveButton(buttons[defaultButton]);
      if (swiperRef.current && swiperRef.current.swiper) {
        swiperRef.current.swiper.slideTo(defaultButton);
      }
    }
  }, [defaultButton]);

  return (
    <aside
      className="flex-1 flex flex-col justify-start overflow-y-auto max-h-full"
      style={{ scrollbarWidth: "none" }}
    >
      <div className="flex items-center justify-center sm:mb-6 mt-5 mb-4">
        <div
          className="rounded-full py-1 px-1 sm:px-2 mx-1 sm:mx-8 sm:py-2 flex justify-between overflow-x-auto border border-[#040869]"
          style={{
            scrollbarWidth: "none",
            width: `${buttons.length * (isMobile ? 80 : 100)}px`,
            maxWidth: "100%",
          }}
        >
          {buttons.map((button) => (
            <button
              key={button}
              className={`px-2 sm:px-6 py-1 sm:py-2 text-xs sm:text-sm rounded-full transition-colors duration-300 whitespace-nowrap ${
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

      <aside
        className="flex-1 flex flex-col justify-end max-h-full"
        style={{ scrollbarWidth: "none" }}
      >
        {activeButton == "Creative" ? (
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
            className="relative flex justify-center items-center max-w-full overflow-hidden"
            style={{
              backgroundImage: "url('/images/mobileframe.png')",
              backgroundSize: "contain",
              backgroundPosition: "center",
              backgroundRepeat: "no-repeat",
              height: isMobile
                ? "calc(46vh)"
                : isTablet
                ? "calc(80vh)"
                : "calc(490px)",
            }}
          >
            <div className={`flex justify-center items-center w-full h-full`}>
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
                  className={`flex mt-[24vh] sm:mt-[20vh] flex-col items-center justify-center max-w-full p-2 sm:p-4`}
                >
                  <img
                    className="w-10 h-18 sm:w-15 sm:h-18 mb-2 sm:mb-4"
                    src="https://cdn.builder.io/api/v1/image/assets/TEMP/ccfdca0b8f4a8882d438a4bcfb7d0977e85429c0e35245f44a752a0cc95cad03?placeholderIfAbsent=true&apiKey=d0018788f321472fb76f0852605a7e1f"
                    alt="Email icon"
                  />

                  <div className="w-full">
                    <CampaignCard
                      {...formdata}
                      logo={themeform.logo}
                      bannerImage={themeform.bannerImage}
                      textColor={themeform.textColor}
                      themeColor={themeform.themeColor}
                      contactno={themeform.contactno}
                      main_url={main_url}
                    />
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </aside>
    </aside>
  );
};

export default MainPreviewTemplate;

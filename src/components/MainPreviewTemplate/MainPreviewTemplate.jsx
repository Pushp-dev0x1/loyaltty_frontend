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
  selected_SMSindex
}) => {
  const allButtons = ["Creative", "Whatsapp", "SMS", "Email"];
  const buttons = allButtons.filter((button) => {
    if (button === "SMS" && !checkedPlatforms.sms) return false;
    if (button === "Whatsapp" && !checkedPlatforms.whatsapp) return false;
    if (button === "Email" && !checkedPlatforms.email) return false;
    return true;
  });

  const isMobile = useMediaQuery("(max-width: 600px)");
  const [activeButton, setActiveButton] = useState(
    defaultButton !== undefined ? buttons[defaultButton] : "Creative"
  );
  console.log(defaultButton, "main button");
  // const handleClick = (buttonName) => {
  //   if (defaultButton === undefined || buttonName === buttons[defaultButton]) {
  //     setActiveButton(buttonName);
  //   }
  // };

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
        }, 400); // Duration of the animation
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

  // New function to handle slide change
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
      className="flex-1  flex flex-col justify-start overflow-y-auto max-h-full"
      style={{ scrollbarWidth: "none" }}
    >
      <div className="flex items-center justify-center  sm:mb-6 mt-5">
        <div
          className=" rounded-full py-1 px-1 sm:px-2 mx-1 sm:mx-8 sm:py-2 flex justify-between overflow-x-auto border  border-[#040869]"
          style={{
            scrollbarWidth: "none",
            width: `${buttons.length * 100}px`, // Adjust the width based on the number of buttons
            maxWidth: "100%", // Ensure it doesn't exceed the container's width
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
        className="flex-1  flex flex-col justify-end max-h-full"
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

              height: "calc(490px)", // Aspect ratio same as your image
            }}
          >
            <div className={`flex justify-center items-center `}>
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
                  className={`flex mt-[25vh] flex-col  items-center justify-center max-w-full p-2 sm:p-4 `}
                >
                  <img
                    className="w-24 h-18 sm:w-32 sm:h-18 mb-2 sm:mb-4"
                    src="https://i.pinimg.com/originals/7e/dd/76/7edd76af1a3e20a914247921f9cd3dda.png"
                    alt="Email icon"
                  />
                  <h5 className="email-subject text-xs -mt-10 sm:text-sm mb-2 sm:mb-4 text-center">
                    {formdata.subject}
                  </h5>
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

      {/* <Swiper
        effect={'cards'}
        grabCursor={true}
        modules={[EffectCards]}
        className="mySwiper"
        ref={swiperRef}
        cardsEffect={{
          slideShadows: false,
        }}
        onSlideChange={handleSlideChange}
        style={{ width: '400px', height: 'auto' }}
      >
        <SwiperSlide style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-start', borderRadius: '40px', height: '700px', width: '400px' }}>
          <EmailCampaignCard {...formdata} bannerImage={themeform.bannerImage} rewardtype={themeform.rewardtype} logo={themeform.logo} textColor={themeform.textColor} themeColor={themeform.themeColor} contactno={themeform.contactno} main_url={main_url} />
        </SwiperSlide>
        {checkedPlatforms.whatsapp && (
          <SwiperSlide style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: '40px' }}>
            <div className="w-full sm:w-auto overflow-y-auto sm:overflow-y-hidden" style={{ scrollbarWidth: "none" }}>
              <ReactDevicePreview device="iphonex" scale={window.innerWidth < 640 ? "0.5" : "0.75"} style={{ height: "auto", minHeight: "100%" }}>
                <WhatsappPreview content={whatsappcontent} parameters={whatsappparameters} main_url={main_url} />
              </ReactDevicePreview>
            </div>
          </SwiperSlide>
        )}

        {checkedPlatforms.sms && (
          <SwiperSlide style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: '40px' }}>
            <div className="w-full sm:w-auto overflow-y-auto sm:overflow-y-hidden" style={{ scrollbarWidth: "none" }}>
              <ReactDevicePreview device="iphonex" scale={window.innerWidth < 640 ? "0.5" : "0.75"} style={{ height: "auto", minHeight: "100%" }}>
                <SmsCard content={smscontent} parameters={smsparams} main_url={main_url} />
              </ReactDevicePreview>
            </div>
          </SwiperSlide>
        )}
        {checkedPlatforms.email && (
          <SwiperSlide style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: '40px' }}>
            <div className="w-full sm:w-auto overflow-y-auto sm:overflow-y-hidden" style={{ scrollbarWidth: "none" }}>
              <ReactDevicePreview device="iphonex" scale={window.innerWidth < 640 ? "0.5" : "0.75"} style={{ height: "auto", minHeight: "100%" }}>
                <div className="flex flex-col h-full items-center justify-center max-w-full p-2 sm:p-4">
                  <img
                    className="w-24 h-24 sm:w-32 sm:h-32 mb-2 sm:mb-4"
                    src="https://i.pinimg.com/originals/7e/dd/76/7edd76af1a3e20a914247921f9cd3dda.png"
                    alt="Email icon"
                  />
                  <h5 className="email-subject text-xs sm:text-sm mb-2 sm:mb-4 text-center">{formdata.subject}</h5>
                  <div className="w-full">
                    <CampaignCard {...formdata}  rewardtype={themeform.rewardtype} bannerImage={themeform.bannerImage} logo={themeform.logo} textColor={themeform.textColor} themeColor={themeform.themeColor} contactno={themeform.contactno} main_url={main_url} />
                  </div>
                </div>
              </ReactDevicePreview>
            </div>
          </SwiperSlide>
        )}
      </Swiper> */}
    </aside>

    // {/* <div className="flex justify-end">
    //   {activeButton == "Creative" && <CampaignCard {...formdata} bannerImage={themeform.bannerImage} textColor={themeform.textColor} themeColor={themeform.themeColor} contactno={themeform.contactno} main_url={main_url} />}

    //   {activeButton !== "Creative" && (
    //     <div className="w-full sm:w-auto overflow-y-auto sm:overflow-y-hidden" style={{ scrollbarWidth: "none" }}>
    //       <ReactDevicePreview device="iphonex" scale={window.innerWidth < 640 ? "0.5" : "0.75"} style={{ height: "auto", minHeight: "100%" }}>
    //         {activeButton === "SMS" && <SmsCard content={smscontent} parameters={smsparams} main_url={main_url} />}
    //         {activeButton === "Email" && (
    //           <div className="flex flex-col h-full items-center justify-center max-w-full p-2 sm:p-4">
    //             <img
    //               className="w-24 h-24 sm:w-32 sm:h-32 mb-2 sm:mb-4"
    //               src="https://i.pinimg.com/originals/7e/dd/76/7edd76af1a3e20a914247921f9cd3dda.png"
    //               alt="Email icon"
    //             />
    //             <h5 className="email-subject text-xs sm:text-sm mb-2 sm:mb-4 text-center">{formdata.subject}</h5>
    //             <div className="w-full">
    //               <CampaignCard {...formdata} bannerImage={themeform.bannerImage} textColor={themeform.textColor} themeColor={themeform.themeColor} contactno={themeform.contactno} main_url={main_url} />
    //             </div>
    //           </div>
    //         )}
    //         {activeButton === "Whatsapp" && <WhatsappPreview content={whatsappcontent} parameters={whatsappparameters} main_url={main_url} />}
    //       </ReactDevicePreview>
    //     </div>
    //   )}
    // </div> */}
  );
};

export default MainPreviewTemplate;

import React, { useState, useCallback, useMemo } from "react";
import { Link } from "react-router-dom";
import { Plus, Search } from "lucide-react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, A11y, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/a11y";

import PromotionalCard from "../../components/Card/PromotionalCard";
import ScratchCard from "../../components/Card/ScratchCard";
import RenderCards from "../../components/Card/RenderCards";
import Schedules from "../Schedules/Schedules";
import { useGetAllCategoriesQuery } from "../../store/services/templateCategoryService";
import {
  useGetTemplatesByCategoryQuery,
  useGetTemplatesByRewardTypeQuery,
} from "../../store/services/templateService";
import {
  useGetCampaignsByMerchantIdQuery,
  useGetCampaignsWithStatusZeroByMerchantQuery,
} from "../../store/services/campaignHistoryService";
import FilterBar from "../../components/FilterBar/FilterBar";
import { resetStepAndCampaignId } from "../../store/reducers/authReducer";
import { useDispatch } from "react-redux";
import RenderDiscountCards from "../../components/Card/RenderDiscountCards";
import { IoIosInformationCircleOutline } from "react-icons/io";

const SelectTemplates = () => {
  const [activeTab, setActiveTab] = useState(0);
  const [searchTerm, setSearchTerm] = useState("");
  const { data: allCategories, isLoading: isCategoriesLoading } =
    useGetAllCategoriesQuery();
  const {
    data: draftcampaigns,
    error,
    isLoading,
  } = useGetCampaignsWithStatusZeroByMerchantQuery("66b2858654354cd7467e5e7c");
  const {
    data: historycampaigns,
    error: historyerror,
    isLoading: historyloading,
  } = useGetCampaignsByMerchantIdQuery("66b2858654354cd7467e5e7c");
  const [selectmaincat, setselectmaincat] = useState(null);
  const [selecteddiscount_Type, setselecteddiscount_Type] = useState("All");
  const { data: alldisocuntcards, isLoading: isblogsloading } =
    useGetTemplatesByRewardTypeQuery(selecteddiscount_Type?.id);
  // const cardData = useMemo(() => [
  //   {
  //     imageUrl: "https://reelo-assets.s3.ap-south-1.amazonaws.com/static/campaigns/templates/banners/YypPBKargilVictoryDay77092f16983882313191698390203875.jpg",
  //     title: "Let's celebrate Kargil Victory Day with a FREE Dessert",
  //     description: "Get amazing discounts on summer essentials!",
  //     discount: 20,
  //   },
  //   {
  //     imageUrl: "https://reelo-assets.s3.ap-south-1.amazonaws.com/static/campaigns/templates/banners/YypPBKargilVictoryDay77092f16983882313191698390203875.jpg",
  //     title: "Let's celebrate Kargil Victory Day with a FREE Dessert",
  //     description: "Get amazing discounts on summer essentials!",
  //     discount: 20,
  //   },
  //   {
  //     imageUrl: "https://reelo-assets.s3.ap-south-1.amazonaws.com/static/campaigns/templates/banners/YypPBKargilVictoryDay77092f16983882313191698390203875.jpg",
  //     title: "Let's celebrate Kargil Victory Day with a FREE Dessert",
  //     description: "Get amazing discounts on summer essentials!",
  //     discount: 20,
  //   },
  //   {
  //     imageUrl: "https://reelo-assets.s3.ap-south-1.amazonaws.com/static/campaigns/templates/banners/YypPBKargilVictoryDay77092f16983882313191698390203875.jpg",
  //     title: "Let's celebrate Kargil Victory Day with a FREE Dessert",
  //     description: "Get amazing discounts on summer essentials!",
  //     discount: 20,
  //   },
  //   {
  //     imageUrl: "https://reelo-assets.s3.ap-south-1.amazonaws.com/static/campaigns/templates/banners/YypPBKargilVictoryDay77092f16983882313191698390203875.jpg",
  //     title: "Let's celebrate Kargil Victory Day with a FREE Dessert",
  //     description: "Get amazing discounts on summer essentials!",
  //     discount: 20,
  //   },
  //   {
  //     imageUrl: "https://reelo-assets.s3.ap-south-1.amazonaws.com/static/campaigns/templates/banners/YypPBKargilVictoryDay77092f16983882313191698390203875.jpg",
  //     title: "Let's celebrate Kargil Victory Day with a FREE Dessert",
  //     description: "Get amazing discounts on summer essentials!",
  //     discount: 20,
  //   },
  //   // ... (other card data)
  // ], []);

  const swiperParams = useMemo(
    () => ({
      modules: [Navigation, Pagination, A11y, Autoplay],
      spaceBetween: 20,
      slidesPerView: "auto",
      navigation: false,
      pagination: false,
      autoplay: false,
      loop: false,
      freeMode: true,
      centeredSlides: false,
      breakpoints: {
        320: { slidesPerView: 1.7, spaceBetween: 5 },
        480: { slidesPerView: 2, spaceBetween: 15 },
        640: { slidesPerView: 3, spaceBetween: 20 },
        768: { slidesPerView: 2.5, spaceBetween: 25 },
        1024: { slidesPerView: 3.5, spaceBetween: 30 },
        1280: { slidesPerView: 5.5, spaceBetween: 10 },
      },
      a11y: {
        prevSlideMessage: "Previous slide",
        nextSlideMessage: "Next slide",
      },
    }),
    []
  );

  const renderCards = useCallback(
    (cards) => (
      <Swiper {...swiperParams} className="pb-10">
        {cards?.map((card, index) => (
          <SwiperSlide key={index} className="flex justify-center">
            <PromotionalCard
              draft
              rewardtype={card.rewardtype}
              bannerImage={card.bannerImage}
              name={card.name}
              description={card.description}
              platformContents={card.platformDetails}
              discount={card.rewardtype}
              _id={card._id}
              onGift={() => console.log("Gift button clicked")}
              onShare={() => console.log("Share button clicked")}
            />
          </SwiperSlide>
        ))}
      </Swiper>
    ),
    [swiperParams]
  );

  const scratchCardSwiperParams = useMemo(
    () => ({
      modules: [Navigation, Pagination, A11y],
      spaceBetween: 20,
      slidesPerView: "auto",
      navigation: false,
      pagination: false,
      loop: false,
      freeMode: true,
      breakpoints: {
        320: { slidesPerView: 1.8, spaceBetween: 8 },
        480: { slidesPerView: 1.8, spaceBetween: 10 },
        640: { slidesPerView: 2.2, spaceBetween: 15 },
        768: { slidesPerView: 2.5, spaceBetween: 20 },
        1024: { slidesPerView: 3.2, spaceBetween: 25 },
        1280: { slidesPerView: 4, spaceBetween: 30 },
        1536: { slidesPerView: 4.5, spaceBetween: 35 },
      },
    }),
    []
  );
  const dispatch = useDispatch();

  const renderScratchCard = useCallback(
    (cards) => (
      <div className="mb-6 ml-1">
        <Swiper {...scratchCardSwiperParams} className="pb-5">
          <SwiperSlide>
            <Link
              to="/setup-new-campaign"
              className="flex justify-center"
              onClick={() => {
                dispatch(resetStepAndCampaignId());
              }}
            >
              <div className="w-full max-w-[171.84px] h-[54.18px] sm:w-full sm:max-w-[350px] sm:h-[110px] mx-auto bg-gradient-to-br from-[#F5F5F5] to-[#E0E0E0] border border-[#040869] rounded-2xl shadow-md flex items-center justify-center p-3 sm:p-6 relative overflow-hidden my-2 hover:scale-105 hover:shadow-lg transition-all duration-300">
                <Plus
                  className="text-[#040869] mr-2 sm:mr-3"
                  size={16}
                  sm={20}
                />
                <p className="text-[#040869] font-semibold text-xs sm:text-lg">
                  Start from Scratch
                </p>
              </div>
            </Link>
          </SwiperSlide>

          {cards?.map((card, index) => (
            <SwiperSlide key={index}>
              <div
                className="flex justify-center my-2"
                onClick={() => setselectmaincat(card)}
              >
                <ScratchCard
                  {...card}
                  onGift={() => console.log("Gift button clicked")}
                  onShare={() => console.log("Share button clicked")}
                />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    ),
    [scratchCardSwiperParams]
  );

  if (isCategoriesLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <iframe src="https://lottie.host/embed/2e7ca909-46f6-4b81-9b5f-38f88c80a91c/7xYyDsUrfG.json"></iframe>
      </div>
    );
  }

  const filteredCategories = allCategories?.filter((category) =>
    category.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // const data = [
  //   {
  //     _id: "1",
  //     title: "Halloween Sale Promotion",
  //     time: "15:37:37",
  //     amount: "20.00",
  //     date: "01/03/2024",
  //     status: "Excellent",
  //   },
  //   {
  //     _id: "2",
  //     title: "Christmas Special Offer",
  //     time: "09:45:22",
  //     amount: "50.00",
  //     date: "25/12/2023",
  //     status: "Well",
  //   },
  //   {
  //     _id: "3",
  //     title: "New Year's Eve Countdown",
  //     time: "23:59:59",
  //     amount: "100.00",
  //     date: "31/12/2023",
  //     status: "Excellent",
  //   },
  //   {
  //     _id: "4",
  //     title: "Valentine's Day Romance Package",
  //     time: "14:00:00",
  //     amount: "75.00",
  //     date: "14/02/2024",
  //     status: "Well",
  //   },
  //   {
  //     _id: "5",
  //     title: "Spring Break Getaway Deal",
  //     time: "12:30:45",
  //     amount: "150.00",
  //     date: "15/03/2024",
  //     status: "Average",
  //   },
  //   {
  //     _id: "6",
  //     title: "Summer Clearance Event",
  //     time: "10:00:00",
  //     amount: "200.00",
  //     date: "01/07/2024",
  //     status: "Excellent",
  //   },
  //   {
  //     _id: "7",
  //     title: "Back to School Promotion",
  //     time: "08:15:30",
  //     amount: "80.00",
  //     date: "15/08/2024",
  //     status: "Well",
  //   },
  //   {
  //     _id: "8",
  //     title: "Black Friday Mega Sale",
  //     time: "00:01:00",
  //     amount: "300.00",
  //     date: "29/11/2024",
  //     status: "Excellent",
  //   },
  //   {
  //     _id: "9",
  //     title: "Cyber Monday Tech Deals",
  //     time: "00:00:01",
  //     amount: "250.00",
  //     date: "02/12/2024",
  //     status: "Average",
  //   },
  //   {
  //     _id: "10",
  //     title: "End of Year Clearance",
  //     time: "18:00:00",
  //     amount: "175.00",
  //     date: "30/12/2024",
  //     status: "Well",
  //   },
  // ];

  const data =
    historycampaigns?.data?.map((campaign) => ({
      _id: campaign._id,
      title: campaign.title,
      time: campaign.createdAt
        ? new Date(campaign.createdAt).toLocaleTimeString()
        : "",
      amount: campaign.amount || "0.00",
      date: campaign.createdAt
        ? new Date(campaign.createdAt).toLocaleDateString()
        : "",
      status: campaign.status || "Excellent",
    })) || [];

  https: return (
    <section className="flex items-center justify-center min-h-screen text-[#040869]  p-4 selection:text-white selection:bg-[#040869]">
      <div className="container mx-auto p-4 sm:p-10">
        {/* <header className="text-center mb-8 sm:mb-12">
          <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-[#040869] sm:text-6xl mb-4">
            Select Templates
          </h1>
          <p className="text-lg sm:text-xl text-[#040869] mb-6 sm:mb-8">
            Choose from our wide range of customizable templates
          </p>
          <div className="inline-flex bg-gray-200 rounded-lg p-1 shadow-sm gap-2">
            {["campaigns", "schedules"].map((tab) => (
              <button
                key={tab}
                className={`px-3 sm:px-4 py-2 text-xs sm:text-sm font-medium rounded-md transition-colors ${activeTab === tab
                    ? "bg-white text-[#040869] shadow"
                    : "text-[#040869] hover:bg-[#F6F6F7]"
                  }`}
                onClick={() => setActiveTab(tab)}
              >
                {tab.charAt(0).toUpperCase() + tab.slice(1)}
              </button>
            ))}
          </div>
        </header> */}
        {/* Responsive header section */}
        <header className="relative flex flex-col w-full overflow-hidden rounded-3xl bg-gradient-to-br from-[#040869] via-[#2E33A4] to-[#585DCB] text-white p-4 sm:p-6 md:p-8 lg:p-10">
          <div className="flex flex-col sm:flex-row justify-between items-center sm:items-start gap-4 sm:gap-5 mb-6 sm:mb-8">
            {/* Logo and user icon */}
            <div className="flex justify-between w-full sm:w-auto">
              <img
                loading="lazy"
                src="https://cdn.builder.io/api/v1/image/assets/TEMP/bba26802c32fba952206773c1d3bb2793592695dc4327657cf361e828b91e45f?placeholderIfAbsent=true&apiKey=416251b402e2495eab402c9d5ac956ab"
                alt="Logo"
                className="w-12 sm:w-20 md:w-24 object-contain"
              />
              <img
                loading="lazy"
                src="https://cdn.builder.io/api/v1/image/assets/TEMP/86491dd2f1b1790333f093e844ac81dc45890eb61d9cd89f3c629a08d2eaee2a?placeholderIfAbsent=true&apiKey=416251b402e2495eab402c9d5ac956ab"
                alt="User"
                className="w-8 sm:w-10 object-contain sm:hidden"
              />
            </div>

            {/* Title and subtitle */}
            <div className="text-center sm:text-center flex-grow">
              <h1 className="text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-semibold tracking-tighter leading-tight mb-2 sm:mb-3">
                Select Templates
              </h1>
              <p className="text-sm sm:text-lg md:text-xl font-medium leading-relaxed">
                Choose from our wide range of customizable templates
              </p>
            </div>

            {/* User icon for larger screens */}
            <img
              loading="lazy"
              src="https://cdn.builder.io/api/v1/image/assets/TEMP/86491dd2f1b1790333f093e844ac81dc45890eb61d9cd89f3c629a08d2eaee2a?placeholderIfAbsent=true&apiKey=416251b402e2495eab402c9d5ac956ab"
              alt="User"
              className="hidden sm:block w-8 sm:w-10 object-contain"
            />
          </div>

          {/* Tab switcher */}
          <div className="flex justify-center mb-4 sm:mb-8">
            <div className="flex gap-1 sm:gap-2 p-1 sm:p-2 border border-[#FFF] rounded-full">
              {["Campaigns", "History"].map((tab, index) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(index)}
                  className={`px-3 sm:px-6 py-1 sm:py-3 text-xs sm:text-base font-medium rounded-full transition-all ${
                    activeTab === index
                      ? "bg-white text-blue-950 shadow-lg"
                      : "text-white hover:bg-white hover:bg-opacity-10"
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>
          </div>

          {/* Search bar */}
          <div className="flex justify-center w-full">
            <form className="flex items-center w-full max-w-3xl bg-white rounded-full overflow-hidden">
              <img
                loading="lazy"
                src="https://cdn.builder.io/api/v1/image/assets/TEMP/7ff1b8731ea09e88e3dca22d9850366c2d0399bb058b00d04d5a9e77eec0074b?placeholderIfAbsent=true&apiKey=416251b402e2495eab402c9d5ac956ab"
                alt="Search"
                className="w-4 sm:w-5 h-4 sm:h-5 ml-3 sm:ml-4"
              />
              <input
                type="text"
                id="searchTemplates"
                placeholder="Search templates..."
                className="flex-grow bg-transparent border-none focus:outline-none px-3 sm:px-4 py-2 sm:py-3 text-xs sm:text-base text-gray-700"
              />
            </form>
          </div>
        </header>

        {activeTab === 0 ? (
          <>
            <section className="mt-8 sm:mt-12">
              <div className="flex flex-col sm:flex-row items-start sm:items-end mb-4 sm:mb-6">
                <h2 className="text-xl sm:text-2xl font-semibold text-black mb-2 sm:mb-0">
                  What would you like to send today?
                </h2>
                <p className="text-sm sm:text-base text-black sm:ml-2">
                  Choose from hundreds of templates pre-built for you!
                </p>
              </div>
              {renderScratchCard(filteredCategories)}
            </section>

            {selectmaincat ? (
              <section className="mb-8 sm:mb-12">
                <h2 className="text-xl sm:text-2xl font-semibold mb-4 sm:mb-6 text-[#040869]">
                  More about {selectmaincat.title}
                </h2>
                <RenderCards cards={selectmaincat} />
              </section>
            ) : null}

            <div className="flex justify-start mb-10">
              <FilterBar
                selectedfilter={selecteddiscount_Type}
                setselectedfilter={setselecteddiscount_Type}
              />
            </div>
            {alldisocuntcards?.data?.length > 0 ? (
              <section className="mb-8 sm:mb-12">
                <h2 className="text-xl sm:text-2xl font-semibold mb-4 sm:mb-6 text-[#040869]">
                  {selecteddiscount_Type?.label}
                </h2>
                <RenderDiscountCards allcards={alldisocuntcards} />
              </section>
            ) : null}
            {draftcampaigns?.data.length > 0 && (
              <section className="mb-8 sm:mb-12">
                <div className="flex flex-row items-end  mb-4 sm:mb-6">
                  <h2 className="text-xl sm:text-2xl font-semibold text-black">
                    Drafts |
                  </h2>
                  <h2 className="text-xl sm:text-2xl font-semibold text-[#4B5563CC] mx-2 ">
                    Custom Campaigns
                  </h2>
                  <IoIosInformationCircleOutline size={28} />
                </div>
                {renderCards(draftcampaigns?.data)}
              </section>
            )}

            {filteredCategories?.map((category, index) => (
              <section className="mb-8 sm:mb-12" key={index}>
                <div className="flex flex-row items-end  mb-4 sm:mb-6">
                  <h2 className="text-xl sm:text-2xl font-semibold text-black mr-2">
                    {category.title}
                  </h2>
                  <IoIosInformationCircleOutline size={28} />
                </div>

                <RenderCards cards={category} />
              </section>
            ))}
          </>
        ) : (
          <div className="mt-10">
            {/* <Schedules data={historycampaigns.data} /> */}
            <Schedules data={data} />
          </div>
        )}
      </div>
    </section>
  );
};

export default SelectTemplates;

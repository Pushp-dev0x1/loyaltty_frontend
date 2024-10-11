import React, { useMemo } from "react";
import { Cloud } from "lucide-react";
import { Link } from "react-router-dom";
import PromotionalCard from "./PromotionalCard";
import { useGetTemplatesByCategoryQuery } from "../../store/services/templateService";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, A11y, Autoplay } from 'swiper/modules';

const RenderCards = ({ cards }) => {
    const { data: allcards, isLoading: isblogsloading } = useGetTemplatesByCategoryQuery(cards._id);

  // Function to scroll to top when navigating
  const handleCardClick = () => {
    window.scrollTo(0, 0);
  };

  
  const swiperParams = useMemo(() => ({
    modules: [Navigation, Pagination, A11y, Autoplay],
    spaceBetween: 20,
    slidesPerView: 'auto',
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
      prevSlideMessage: 'Previous slide',
      nextSlideMessage: 'Next slide',
    },
  }), []);

  return (
    <>
    <Swiper {...swiperParams} className="pb-10">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {allcards?.data?.map((card, index) => (
           <SwiperSlide key={index} className="flex justify-center">
          <div key={index} onClick={handleCardClick}>
            <PromotionalCard
              {...card}
              onGift={() => console.log("Gift button clicked")}
              onShare={() => console.log("Share button clicked")}
            />
          </div>
          </SwiperSlide>
        ))}
      </div>
      </Swiper>
    </>
  );
};

export default RenderCards;

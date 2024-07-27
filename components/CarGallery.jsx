import { useState } from "react"

import {Swiper, SwiperSlide} from "swiper/react";
import { FreeMode, Navigation, Thumbs } from 'swiper/modules';

import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/navigation';
import 'swiper/css/thumbs';

import './styles.css';
import ClockIcon from "@/components/icons/ClockIcon";

const CarGallery = ({ images, isPublished }) => {
  const [thumbsSwiper, setThumbsSwiper] = useState(null);

  return (
    <div className="relative">
      {!isPublished &&(<p className="absolute top-2 left-2 z-[3] bg-dark rounded-3xl py-2 px-4 pl-2 flex items-center gap-2 ">
        <ClockIcon className="w-5 h-5 md:w-7 md:h-7 stroke-orange" />
        <span className="text-light text-xs md:text-sm font-medium select-none">Listing will be posted after moderation approval</span>
      </p>)}
      <Swiper
        loop={(images.length > 1)}
        style={{
          '--swiper-navigation-color': '#FF5700',
          '--swiper-pagination-color': '#fff',
        }}
        spaceBetween={10}
        navigation={true}
        thumbs={{ swiper: thumbsSwiper }}
        modules={[FreeMode, Navigation, Thumbs]}
        className="mySwiper2 mb-[10px]"
      >
        {images.map((image, index) => (
          <SwiperSlide key={index}>
            <img src={image} />
          </SwiperSlide>
        ))}

      </Swiper>
      {images.length > 1 && (<Swiper
        onSwiper={setThumbsSwiper}
        spaceBetween={10}
        slidesPerView={4}
        freeMode={true}
        watchSlidesProgress={true}
        modules={[FreeMode, Navigation, Thumbs]}
        className="mySwiper"
      >
        {images.map((image, index) => (
          <SwiperSlide key={index}>
            <img src={image} />
          </SwiperSlide>
        ))}
      </Swiper>)}
    </div>
  )
}

export default CarGallery
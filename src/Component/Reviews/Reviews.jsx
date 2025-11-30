import React, { use } from 'react';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Navigation, Autoplay, EffectCoverflow } from 'swiper/modules';
import { FaQuoteLeft } from 'react-icons/fa';
import ReviewCard from './ReviewCard';

const Reviews = ({ reviewsPromise }) => {
    const reviews = use(reviewsPromise);

    return (
        <div className="my-10">
            <div className="text-center">
                <h3 className="text-3xl font-bold">Reviews</h3>
                <p className="max-w-2xl mx-auto text-gray-600 mt-2">
                    Here’s what our customers say about our service.
                </p>
            </div>

            {/* Swiper Slider */}
            <div className="mt-10">
                <Swiper
  effect={'coverflow'}
  slidesPerView={3}
  spaceBetween={20}
  pagination={{ clickable: true }}
  navigation={true}
  autoplay={{ delay: 3000 }}
  coverflowEffect={{
    rotate: 30,
    stretch: 50,
    depth: 200,
    scale: 0.75,
    modifier: 1,
    slideShadows: true,
  }}
  modules={[Pagination, Navigation, EffectCoverflow, Autoplay]}
  className="mySwiper"
>
  {reviews.map((reviewed, idx) => (
    <SwiperSlide key={idx}>
      <ReviewCard reviewed={reviewed} />
    </SwiperSlide>
  ))}
</Swiper>

            </div>
        </div>
    );
};

export default Reviews;

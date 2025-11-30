import React from 'react';
import 'swiper/css';
import { Swiper, SwiperSlide } from 'swiper/react';
import amazon from "../../assets/brands/amazon.png";
import amazon_victor from "../../assets/brands/amazon_vector.png"
import casio from "../../assets/brands/casio.png"
import moonstar from "../../assets/brands/moonstar.png"
import randstad from "../../assets/brands/randstad.png"
import star from "../../assets/brands/star.png"
import start_people from "../../assets/brands/start_people.png"
import { Autoplay } from 'swiper/modules';
const brandLogos =[amazon,amazon_victor,casio,moonstar,randstad,star,start_people]






const Brand = () => {
    return (
        <>
            <Swiper
            loop={true}
                slidesPerView={4}     
                centeredSlides={true}
                grabCursor={true}
                spaceBetween={20}   
                modules={[Autoplay]}
                autoplay ={{
                    delay:1000,
                    disableOnInteraction:false
                }}
            >

                {
                    brandLogos.map((logo,index) =><SwiperSlide key={index}> <img src={logo} alt="" /></SwiperSlide>)
                }
                
            </Swiper>
        </>
    );
};

export default Brand;

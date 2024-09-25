'use client';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/autoplay';
import Image from 'next/image';
import SwiperCore, { Autoplay } from 'swiper';

// Swiperモジュールの使用を宣言
SwiperCore.use([Autoplay]);

const Hero = () => {
  return (
    <div className="relative w-full overflow-hidden" style={{ height: '500px' }}>
      <Swiper
        className="absolute top-0 left-0 w-full h-full"
        spaceBetween={0}
        slidesPerView={1}
        loop={true}
        autoplay={{ delay: 8000 }} // 6秒ごとにスライド
        speed={2500}
        effect="slide" // スライド効果を指定
      >
        <SwiperSlide>
          <div style={{ position: 'relative', width: '100%', height: '100%' }}>
            <Image
              src="/images/hero/both3rd4th.jpg"
              alt="Image 1"
              fill
              style={{ objectFit: 'cover' }}
              priority
            />
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div style={{ position: 'relative', width: '100%', height: '100%' }}>
            <Image
              src="/images/hero/only3rd.jpg"
              alt="Image 2"
              fill
              style={{ objectFit: 'cover' }}
            />
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div style={{ position: 'relative', width: '100%', height: '100%' }}>
            <Image
              src="/images/hero/deleteThis.jpg"
              alt="Image 3"
              fill
              style={{ objectFit: 'cover' }}
            />
          </div>
        </SwiperSlide>
      </Swiper>

      <div className="absolute inset-0 flex flex-col items-center justify-center bg-black bg-opacity-50 text-white text-center" style={{ zIndex: 10 }}>
        <h1 className="text-4xl font-bold mb-4">Welcome to Yamazemi</h1>
        <p className="text-lg mb-8">Discover our activities</p>
        <button className="bg-white text-black px-4 py-2 rounded">Get Started</button>
      </div>
    </div>
  );
};

export default Hero;
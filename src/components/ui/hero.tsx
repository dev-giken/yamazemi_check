'use client';

import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/autoplay';
import 'swiper/swiper-bundle.css';
import { Autoplay, Pagination } from 'swiper/modules';
import Image from 'next/image';

const Hero = () => {
  return (
    <div
      className="relative w-full overflow-hidden"
      style={{ aspectRatio: '16/11', maxHeight: '650px' }} // 縦幅の最大値を650pxに設定
    >
      <Swiper
        modules={[Autoplay, Pagination]}
        className="absolute top-0 left-0 w-full h-full"
        spaceBetween={0} // 隙間をなくす
        slidesPerView={1}
        loop={true}
        autoplay={{ delay: 6000, disableOnInteraction: false }}
        speed={2500}
        effect="slide"
      >
        {/* SwiperSlide全体の横幅をしっかりと埋めるように設計 */}
        <SwiperSlide>
          <div style={{ position: 'relative', width: '100%', height: '100%' }}>
            <Image
              src="/images/hero/both3rd4th.webp"
              alt="Image 1"
              fill
              style={{ objectFit: 'cover', maxWidth: '100%' }} // 最大幅を設定し、拡大を制限
              priority
            />
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div style={{ position: 'relative', width: '100%', height: '100%' }}>
            <Image
              src="/images/hero/only3rd.webp"
              alt="Image 2"
              fill
              style={{ objectFit: 'cover', maxWidth: '100%' }}
              loading='lazy'
            />
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div style={{ position: 'relative', width: '100%', height: '100%' }}>
            <Image
              src="/images/hero/summer_camp.webp"
              alt="Image 3"
              fill
              style={{ objectFit: 'cover', maxWidth: '100%' }}
              loading='lazy'
            />
          </div>
        </SwiperSlide>
      </Swiper>

      <div
        className="absolute inset-0 flex flex-col items-center justify-center bg-black bg-opacity-50 text-white text-center"
        style={{ zIndex: 10 }}
      >
        <p>
          <br />
          <br />
        </p>
        <h1 className="text-1xl sm:text-3xl font-bold mb-4 sm:mb-6">
          慶應義塾大学商学部 山本勲研究会 『山ゼミ』
        </h1>
        <p className="text-xs sm:text-[15px] mb-8 sm:mb-12">
          計量経済学をツールに総合力を身につける
        </p>
        <button className="text-[10px] sm:text-sm bg-white text-black px-2 py-2 rounded">
          ゼミ員ブログ
        </button>
      </div>
    </div>
  );
};

export default Hero;
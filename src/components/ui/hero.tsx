'use client';

import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/autoplay';
import 'swiper/swiper-bundle.css';
import { Autoplay, Pagination } from 'swiper/modules';
import Image from 'next/image';
import Link from 'next/link';

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
        autoplay={{ delay: 4000, disableOnInteraction: false }}
        speed={2500}
        effect="slide"
      >
        {/* SwiperSlide全体の横幅をしっかりと埋めるように設計 */}
        <SwiperSlide>
          <div style={{ position: 'relative', width: '100%', height: '100%' }}>
            <Image
              src="/images/hero/both18th19th_noDesk.webp"
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
              src="/images/hero/takaakiFlexing.webp"
              alt="Image 2"
              fill
              style={{ objectFit: 'cover', maxWidth: '100%' }}
              loading="lazy"
            />
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div style={{ position: 'relative', width: '100%', height: '100%' }}>
            <Image
              src="/images/hero/wideAngle_whiteRoom.webp"
              alt="Image 3"
              fill
              style={{ objectFit: 'cover', maxWidth: '100%' }}
            />
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div style={{ position: 'relative', width: '100%', height: '100%' }}>
            <Image
              src="/images/hero/summer_camp.webp"
              alt="Image 4"
              fill
              style={{ objectFit: 'cover', maxWidth: '100%' }}
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
        <p className="text-xs sm:text-[15px] mb-10 sm:mb-14">
          計量経済学をツールに総合力を身につける
        </p>
        <Link href="/blog">
          <button
            className="text-[10px] sm:text-sm bg-white text-black px-4 py-3 rounded-lg"
            style={{
              background: 'rgba(255, 255, 255, 0.5)', // 半透明の背景
              boxShadow: '0 4px 30px rgba(0, 0, 0, 0.2)', // ぼんやりした影
              backdropFilter: 'blur(5px)', // ガラスっぽいぼかし効果
              WebkitBackdropFilter: 'blur(5px)', // Safari対応
              border: '1px solid rgba(255, 255, 255, 0.3)', // 微妙な境界線
              marginTop: '0.7rem', // ボタンの位置を下げる
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'scale(1.05)'; // 少し拡大
              e.currentTarget.style.boxShadow = '0 6px 40px rgba(0, 0, 0, 0.2)'; // 影を強調
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'scale(1)'; // 元のサイズに戻す
              e.currentTarget.style.boxShadow = '0 4px 30px rgba(0, 0, 0, 0.1)'; // 元の影に戻す
            }}
          >
            ゼミ員ブログ
          </button>
        </Link>
      </div>
    </div>
  );
};

export default Hero;
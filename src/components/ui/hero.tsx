'use client';

// 修正版 hero.tsx
import { useEffect } from 'react'; // useEffectのインポートを忘れずに　デバッグ用
import { Swiper, SwiperSlide } from 'swiper/react'; // SwiperとSwiperSlideを正しくインポート
import 'swiper/css'; // Swiperの基本CSSをインポート
import 'swiper/css/autoplay'; // Autoplay用のCSSをインポート
import { Autoplay, Pagination } from 'swiper/modules'; // AutoplayとPaginationモジュールをインポート
import Image from 'next/image';


const Hero = () => {
  // useEffectフックを追加して、Swiperが正しくインポートされているか確認
  useEffect(() => {
    console.log(Swiper); // Swiperインスタンスが正しく表示されるか確認
  }, []);
  
  return (
    <div className="relative w-full overflow-hidden" style={{ height: '500px' }}>
      <Swiper
        modules={[Autoplay, Pagination]} // AutoplayとPaginationを有効化
        className="absolute top-0 left-0 w-full h-full"
        spaceBetween={0}
        slidesPerView={1}
        loop={true}
        autoplay={{ delay: 6000, disableOnInteraction: false }} // 数秒ごとにスライド
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
              src="/images/hero/summer_camp.jpg"
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

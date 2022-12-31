import styles from "./styles.module.scss";
import { useRef } from "react";
// Import Swiper React components
import { Swiper, SwiperRef, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

// import required modules
import { Autoplay } from "swiper";
import { useEffect } from "react";
import Image from "next/image";

type ProductSwiperProps = {
  // images: {
  //   url: string;
  // }[];
  images: any;
};

export default function ProductSwiper({ images }: ProductSwiperProps) {
  const swiperRef = useRef<SwiperRef>(null);
  useEffect(() => {
    if (swiperRef.current) {
      swiperRef.current.swiper.autoplay.stop();
    }
  }, [swiperRef]);
  return (
    <div
      className={styles.swiper}
      onMouseEnter={() => {
        swiperRef.current?.swiper.autoplay.start();
      }}
      onMouseLeave={() => {
        swiperRef.current?.swiper.autoplay.stop();
        // swiperRef.current?.swiper.slideTo(0);
      }}
    >
      <Swiper
        ref={swiperRef}
        centeredSlides={true}
        autoplay={{ delay: 500, stopOnLastSlide: false }}
        speed={500}
        modules={[Autoplay]}
      >
        {images.map((img: any, idx: number) => (
          <SwiperSlide key={img.url + idx}>
            <Image width={260} height={350} src={img.url} alt="product" />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}

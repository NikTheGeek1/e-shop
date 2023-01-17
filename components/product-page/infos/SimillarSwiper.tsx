import Link from "next/link";
import { simillar_products } from "../../../data/products";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

// import required modules
import { Navigation } from "swiper";
import Image from "next/image";
export default function SimillarSwiper() {
  return (
    <Swiper
      slidesPerView={4}
      spaceBetween={5}
      slidesPerGroup={3}
      navigation={true}
      modules={[Navigation]}
      className="swiper simillar_swiper products__swiper"
      breakpoints={{
        640: {
          width: 640,
          slidesPerView: 5,
        },
      }}
    >
      {simillar_products.map((p, idx) => (
        <SwiperSlide key={p + idx}>
          <Link href="">
            <Image width={124} height={200} src={p} alt="similar_product" />
          </Link>
        </SwiperSlide>
      ))}
    </Swiper>
  );
}

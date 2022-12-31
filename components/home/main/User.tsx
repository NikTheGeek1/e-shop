import { useSession } from "next-auth/react";
import Link from "next/link";
import styles from "./styles.module.scss";
import { IoSettingsOutline } from "react-icons/io5";
import { HiOutlineClipboardList } from "react-icons/hi";
import { BsHeart } from "react-icons/bs";
import { AiOutlineMessage } from "react-icons/ai";
import React from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/effect-cards";
// import required modules
import { EffectCards, Navigation } from "swiper";
import { userSwiperArray } from "../../../data/home";
import Image from "next/image";
export default function User() {
  const { data: session } = useSession();
  return (
    <div className={styles.user}>
      <Image
        width={500}
        height={100}
        src="/images/userheader.jpg"
        alt="user_header"
        className={styles.user__header}
      />
      <div className={styles.user__container}>
        {session ? (
          <div className={styles.user__infos}>
            <Image
              width={200}
              height={200}
              src={session.user?.image || ""}
              alt="user_img"
            />
            <h4>{session.user?.name}</h4>
          </div>
        ) : (
          <div className={styles.user__infos}>
            <Image
              width={200}
              height={200}
              src="https://res.cloudinary.com/dmhcnhtng/image/upload/v1664642478/992490_b0iqzq.png"
              alt="user_img"
            />
            <div className={styles.user__infos_btns}>
              <button>Register</button>
              <button>Login</button>
            </div>
          </div>
        )}
        <ul className={styles.user__links}>
          <li>
            <Link href="/profile">
              <IoSettingsOutline />
            </Link>
          </li>
          <li>
            <Link href="">
              <HiOutlineClipboardList />
            </Link>
          </li>
          <li>
            <Link href="">
              <AiOutlineMessage />
            </Link>
          </li>
          <li>
            <Link href="">
              <BsHeart />
            </Link>
          </li>
        </ul>
        <div className={styles.user__swiper}>
          <Image
            width={50}
            height={50}
            src="https://assets.stickpng.com/images/5a5a6d2414d8c4188e0b088d.png"
            alt="new_offers"
            className={styles.new}
          />
          <Swiper
            effect={"cards"}
            grabCursor={true}
            navigation={true}
            modules={[EffectCards, Navigation]}
            className="user__swiper"
            style={{
              maxWidth: "180px",
              height: "240px",
              marginTop: "1rem",
            }}
          >
            {userSwiperArray.map((item, idx) => (
              <SwiperSlide key={item.image + idx}>
                <Link href="">
                  <Image
                    width={100}
                    height={150}
                    src={item.image}
                    alt="product"
                  />
                </Link>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
      <Image
        width={500}
        height={100}
        src="/images/userheader.jpg"
        alt="header"
        className={styles.user__footer}
      />
    </div>
  );
}

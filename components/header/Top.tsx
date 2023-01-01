import styles from "./styles.module.scss";
import { AiOutlineSecurityScan } from "react-icons/ai";
import { BsSuitHeart } from "react-icons/bs";
import { RiAccountPinCircleLine, RiArrowDropDownFill } from "react-icons/ri";
import Link from "next/link";
import { useState } from "react";
import UserMenu from "./UserMenu";
import { CountryType } from "../../types/country";
import { useSession } from "next-auth/react";
import Image from "next/image";

type TopProps = {
  country: CountryType;
};

export default function Top({ country }: TopProps) {
  const [isUserMenuVisible, setIsUserMenuVisible] = useState(false);
  const { data: session } = useSession();

  return (
    <div className={styles.top}>
      <div className={styles.top__container}>
        <div></div>
        <ul className={styles.top__list}>
          <li>
            <Image
              width={28}
              height={28}
              src={country.flag}
              alt="country-flag"
            />
            <span>
              {country.name} / {country.currency}
            </span>
          </li>
          <li>
            <AiOutlineSecurityScan />
            <span>Buyer Protection</span>
          </li>
          <li>
            <span>Customer Service</span>
          </li>
          <li>
            <span>Help</span>
          </li>
          <li>
            <BsSuitHeart />
            <Link href="/profile/wishlist">
              <span>Wishlist</span>
            </Link>
          </li>
          <li
            onMouseOver={() => setIsUserMenuVisible(true)}
            onMouseLeave={() => setIsUserMenuVisible(false)}
          >
            {session ? (
              <div>
                <div className={styles.flex}>
                  <Image
                    width={28}
                    height={28}
                    // src="https://img.freepik.com/free-vector/mysterious-mafia-man-smoking-cigarette_52683-34828.jpg?w=2000"
                    src={(session.user?.image as string) || ""}
                    alt="avatar"
                  />
                  <span>{session.user?.name}</span>
                  <RiArrowDropDownFill />
                </div>
              </div>
            ) : (
              <div>
                <div className={styles.flex}>
                  <RiAccountPinCircleLine />
                  <span>Account</span>
                  <RiArrowDropDownFill />
                </div>
              </div>
            )}
            {isUserMenuVisible && <UserMenu session={session} />}
          </li>
        </ul>
      </div>
    </div>
  );
}

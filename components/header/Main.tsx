import Link from "next/link";
import { RiSearch2Line } from "react-icons/ri";
import { FaOpencart } from "react-icons/fa";
import styles from "./styles.module.scss";
import { useSelector } from "react-redux";
import { IRootState } from "../../store";
import Image from "next/image";

export default function Main() {
  const { cart } = useSelector((state: IRootState) => ({...state}));

  return (
    <div className={styles.main}>
      <div className={styles.main__container}>
        <Link href="/" className={styles.logo}>
          <Image width={140} height={60} src="/logo.png" alt="logo" />
        </Link>
        <div className={styles.search}>
          <input type="text" placeholder="Search for products" />
          <div className={styles.search__icon}>
            <RiSearch2Line />
          </div>
        </div>
        <Link href={"/cart"} className={styles.cart}>
          <FaOpencart />
          <span>{cart.length}</span>
        </Link>
      </div>
    </div>
  );
}

import { Session } from "next-auth";
import Link from "next/link";
import styles from "./styles.module.scss";
import { signOut, signIn } from "next-auth/react";
import Image from "next/image";

type UserMenuProps = {
  session: Session | null;
};

export default function UserMenu({ session }: UserMenuProps) {
  return (
    <div className={styles.menu}>
      <h4>Welcome to E-shop</h4>
      {session ? (
        <div className={styles.flex}>
          <Image
            width={100}
            height={100}
            src={session.user?.image as string || ""}
            alt=""
            className={styles.menu__img}
          />
          <div className={styles.col}>
            <span>Welcome back,</span>
            <h3>{session.user?.name}</h3>
            <span onClick={() => signOut()}>Sign Out</span>
          </div>
        </div>
      ) : (
        <div className={styles.flex}>
            <button className={styles.btn_primary}>Register</button>
            <button className={styles.btn_outlined} onClick={() => signIn()}>Login</button>
        </div>
      )}
      <ul>
        <li>
            <Link href="/profile">Account</Link>
        </li>
        <li>
            <Link href="/profile/orders">My Orders</Link>
        </li>
        <li>
            <Link href="/profile/messages">Message Center</Link>
        </li>
        <li>
            <Link href="/profile/address">Address</Link>
        </li>
        <li>
            <Link href="/profile/wishlist">Wishlist</Link>
        </li>
      </ul>
    </div>
  );
}

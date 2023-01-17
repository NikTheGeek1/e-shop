import { useState, useEffect } from "react";
import styles from "../../styles/Checkout.module.scss";
import { getSession } from "next-auth/react";
import User, { AddressType, IUser, SessionUser } from "../../models/User";
import Cart from "../../models/Cart";
import db from "../../utils/db/db";
import Header from "../../components/cart/header";
import Shipping from "../../components/checkout/shipping";
import Products from "../../components/checkout/products";
import Payment from "../../components/checkout/payment";
import Summary from "../../components/checkout/summary";
import { GetServerSidePropsContext } from "next";
import { CartType } from "../../types/cart";

type CheckoutProps = {
    cart: CartType;
    user: IUser;
};

export default function Checkout({ cart, user }: CheckoutProps) {
  const [addresses, setAddresses] = useState(user?.address || []);
  const [paymentMethod, setPaymentMethod] = useState("");
  const [totalAfterDiscount, setTotalAfterDiscount] = useState<string | number>("");
  const [selectedAddress, setSelectedAddress] = useState<AddressType | null>(null);

  useEffect(() => {
    const check = addresses.find((ad) => ad.active == true);
    if (check) {
      setSelectedAddress(check);
    } else {
      setSelectedAddress(null);
    }
  }, [addresses]);
  return (
    <>
      <Header />
      <div className={`${styles.container} ${styles.checkout}`}>
        <div className={styles.checkout__side}>
          <Shipping
            user={user}
            addresses={addresses}
            setAddresses={setAddresses}
          />
          <Products cart={cart} />
        </div>
        <div className={styles.checkout__side}>
          <Payment
            paymentMethod={paymentMethod}
            setPaymentMethod={setPaymentMethod}
          />
          <Summary
            totalAfterDiscount={totalAfterDiscount}
            setTotalAfterDiscount={setTotalAfterDiscount}
            user={user}
            cart={cart}
            paymentMethod={paymentMethod}
            selectedAddress={selectedAddress}
          />
        </div>
      </div>
    </>
  );
}
export async function getServerSideProps(context: GetServerSidePropsContext) {
  db.connect();
  const session = await getSession(context);
    if (!session) {
        return {
        redirect: {
            destination: "/login",
        },
        };
    }
  const user: IUser | null = await User.findById((session.user as SessionUser)?.id);
  if (!user) {
    return {
      redirect: {
        destination: "/login",
      },
    };
  }
  const cart = await Cart.findOne({ user: user._id });
  db.disconnect();
  if (!cart) {
    return {
      redirect: {
        destination: "/cart",
      },
    };
  }
  return {
    props: {
      cart: JSON.parse(JSON.stringify(cart)),
      user: JSON.parse(JSON.stringify(user)),
    },
  };
}

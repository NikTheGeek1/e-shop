import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import Empty from "../../components/cart/empty";
import Header from "../../components/cart/header";
import Product from "../../components/cart/product";
import styles from "../../styles/Cart.module.scss";
import CartHeader from "../../components/cart/cart-header";
import Checkout from "../../components/cart/checkout";
import PaymentMethods from "../../components/cart/payment-methods";
import ProductsSwiper from "../../components/products-swiper";
import { women_swiper } from "../../data/home";
import { useSession, signIn } from "next-auth/react";
import { useRouter } from "next/router";
import { saveCart } from "../../requests/user";
import { IRootState } from "../../store";
import { CartProductType } from "../../types/product";
import axios from "axios";
import { updateCart } from "../../store/cart-slice";

export default function Cart() {
  const Router = useRouter();
  const { data: session } = useSession();
  const [selected, setSelected] = useState<Array<CartProductType>>([]);
  const { cart } = useSelector((state: IRootState) => ({ ...state }));
  //-----------------------
  const [shippingFee, setShippingFee] = useState(0);
  const [subtotal, setSubtotal] = useState(0);
  const [total, setTotal] = useState(0);
  const dispatch = useDispatch();

  useEffect(() => {
    // ensuring cart is always up-to-date
    const update = async () => {
      const { data } = await axios.post("/api/update-cart", {
        products: cart.cartItems,
      });
      dispatch(updateCart(data));
    };
    if (cart.cartItems.length > 0) {
      update();
    }
  }, []);

  useEffect(() => {
    setShippingFee(
      +selected.reduce((a, c) => a + Number(c.shipping), 0).toFixed(2)
      );
    setSubtotal(+selected.reduce((a, c) => a + c.price * c.cartQty!, 0).toFixed(2));
    setTotal(
      +(
        selected.reduce((a, c) => a + c.price * c.cartQty!, 0) + Number(shippingFee)
      ).toFixed(2)
    );
  }, [selected]);
  //-----------------------
  const saveCartToDbHandler = async () => {
    if (session) {
      const res = await saveCart(selected);
      // error handling
      if (res.status === 200 || res.status === 201) {
        Router.push("/checkout");
      } else {
        console.log(res.data.message);
      }
    } else {
      signIn();
    }
  };
  return (
    <>
      <Header />
      <div className={styles.cart}>
        {cart.cartItems.length > 0 ? (
          <div className={styles.cart__container}>
            <CartHeader
              cartItems={cart.cartItems}
              selected={selected}
              setSelected={setSelected}
            />
            <div className={styles.cart__products}>
              {cart.cartItems.map((product) => (
                <Product
                  product={product}
                  key={product._id + Math.random()}
                  selected={selected}
                  setSelected={setSelected}
                />
              ))}
            </div>
            <Checkout
              subtotal={subtotal}
              shippingFee={shippingFee}
              total={total}
              selected={selected}
              saveCartToDbHandler={saveCartToDbHandler}
            />
            <PaymentMethods />
          </div>
        ) : (
          <Empty />
        )}
        <div className={styles.swiper}>
          <ProductsSwiper products={women_swiper} />
        </div>
      </div>
    </>
  );
}

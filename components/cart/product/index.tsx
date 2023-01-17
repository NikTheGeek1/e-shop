import styles from "./styles.module.scss";
import { BsHeart } from "react-icons/bs";
import { AiOutlineDelete } from "react-icons/ai";
import { MdOutlineKeyboardArrowRight } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { updateCart } from "../../../store/cart-slice";
import { useState, useEffect } from "react";
import { CartProductType } from "../../../types/product";
import { IRootState } from "../../../store";

type ProductProps = {
  product: CartProductType;
  selected: CartProductType[];
  setSelected: (selected: CartProductType[]) => void;
};

export default function Product({ product, selected, setSelected }: ProductProps) {
  const { cart } = useSelector((state: IRootState) => ({ ...state }));
  const [active, setActive] = useState(false);

  useEffect(() => {
    const check:boolean = !!selected.find((p) => p._uid == product._uid);
    setActive(check);
  }, [selected]);

  const dispatch = useDispatch();

  const updateQty = (type: "minus" | "plus") => {
    const newCart = cart.cartItems.map((p) => {
      if (p._uid == product._uid) {
        return {
          ...p,
          cartQty: type == "plus" ? product.cartQty! + 1 : product.cartQty! - 1,
        };
      }
      return p;
    });
    dispatch(updateCart(newCart));
  };

  const removeProduct = (id: string) => {
    let newCart = cart.cartItems.filter((p) => {
      return p._uid != id;
    });
    dispatch(updateCart(newCart));
  };
  const handleSelect = () => {
    if (active) {
      setSelected(selected.filter((p) => p._uid !== product._uid));
    } else {
      setSelected([...selected, product]);
    }
  };
  return (
    <div className={`${styles.card} ${styles.product}`}>
      {product.stockQty < 1 && <div className={styles.blur}></div>}
      <div className={styles.product__header}>
        <img src="../../../images/store.webp" alt="" />
        M74JJI Official Store
      </div>
      <div className={styles.product__image}>
        <div
          className={`${styles.checkbox} ${active ? styles.active : ""}`}
          onClick={() => handleSelect()}
        ></div>
        <img src={product.images[0].url} alt="" />
        <div className={styles.col}>
          <div className={styles.grid}>
            <h1>
              {product.name.length > 30
                ? `${product.name.substring(0, 30)}`
                : product.name}
            </h1>
            <div style={{ zIndex: "2" }}>
              <BsHeart />
            </div>
            <div
              style={{ zIndex: "2" }}
              onClick={() => removeProduct(product._uid || "")}
            >
              <AiOutlineDelete />
            </div>
          </div>
          <div className={styles.product__style}>
            <img src={product.color.image} alt="" />
            {product.size && <span>{product.size}</span>}
            {product.price && <span>{product.price.toFixed(2)}$</span>}
            <MdOutlineKeyboardArrowRight />
          </div>
          <div className={styles.product__priceQty}>
            <div className={styles.product__priceQty_price}>
              <span className={styles.price}>
                USD{(product.price * product.cartQty!).toFixed(2)}$
              </span>
              {product.price !== product.priceBefore && (
                <span className={styles.priceBefore}>
                  USD{product.priceBefore}$
                </span>
              )}
              {product.discount > 0 && (
                <span className={styles.discount}>-{product.discount}%</span>
              )}
            </div>
            <div className={styles.product__priceQty_qty}>
              <button
                disabled={product.cartQty! < 2}
                onClick={() => updateQty("minus")}
              >
                -
              </button>
              <span>{product.cartQty}</span>
              <button
                disabled={product.cartQty == product.stockQty}
                onClick={() => updateQty("plus")}
              >
                +
              </button>
            </div>
          </div>
          <div className={styles.product__shipping}>
            {product.shipping
              ? `+${product.shipping}$ Shipping fee`
              : "Free Shipping"}
          </div>
          {product.stockQty < 1 && (
            <div className={styles.notAvailable}>
              This product is out of stock, Add it to your whishlist it may get
              restocked.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

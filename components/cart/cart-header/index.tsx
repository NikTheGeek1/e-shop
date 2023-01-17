import styles from "./styles.module.scss";
import { useState, useEffect } from "react";
import { compareArrays } from "../../../utils/helpers/array-helpers";
import { CartProductType } from "../../../types/product";

type CartHeaderProps = {
  cartItems: CartProductType[];
  selected: CartProductType[];
  setSelected: (value: CartProductType[]) => void;
};

export default function CartHeader({ cartItems, selected, setSelected }: CartHeaderProps) {
  const [active, setActive] = useState<boolean>(false);
  useEffect(() => {
    const check = compareArrays(cartItems, selected);
    setActive(check);
  }, [selected]);
  const handleSelect = () => {
    if (selected.length !== cartItems.length) {
      setSelected(cartItems);
    } else {
      setSelected([]);
    }
  };

  return (
    <div className={`${styles.cart__header} ${styles.card}`}>
      <h1>Item Summary({cartItems.length})</h1>
      <div className={styles.flex} onClick={() => handleSelect()}>
        <div
          className={`${styles.checkbox} ${active ? styles.active : ""}`}
        ></div>
        <span>Select all items</span>
      </div>
    </div>
  );
}

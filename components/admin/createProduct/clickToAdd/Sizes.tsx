import { ChangeEvent, useState } from "react";
import { BsFillPatchMinusFill, BsFillPatchPlusFill } from "react-icons/bs";
import { sizesList } from "../../../../data/sizes";
import { LeanProductType, SizeType } from "../../../../types/product";
import styles from "./styles.module.scss";

type SizesProps = {
  sizes: SizeType[];
  product: LeanProductType;
  setProduct: React.Dispatch<React.SetStateAction<LeanProductType>>;
};

export default function Sizes({ sizes, product, setProduct }: SizesProps) {
  const [noSize, setNoSize] = useState(false);

  const handleSize = (i: number, e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const values = [...sizes];
    values[i][e.target.name] = e.target.value;
    setProduct({ ...product, sizes: values } as LeanProductType);
  };
  const handleRemove = (i: number) => {
    if (sizes.length > 1) {
      const values = [...sizes];
      values.splice(i, 1);
      setProduct({ ...product, sizes: values } as LeanProductType);
    }
  };
  return (
    <div>
      <div className={styles.header}>Sizes / Quantity /Price</div>
      <button
        type="reset"
        className={styles.click_btn}
        onClick={() => {
          const data = sizes.map((item) => {
            return {
              qty: item.qty,
              price: item.price,
              size: item.size || "",
            };
          });
          setProduct({ ...product, sizes: data } as LeanProductType);
          setNoSize((prev) => !prev);
        }}
      >
        {noSize ? "Click if product has size" : "Click if product has no size"}
      </button>
      {sizes
        ? sizes.map((size, i) => (
            <div className={styles.clicktoadd} key={i}>
              <select
                name="size"
                value={noSize ? "" : size.size}
                disabled={noSize}
                style={{ display: `${noSize ? "none" : ""}` }}
                onChange={(e) => handleSize(i, e)}
              >
                <option value="">Select a size</option>
                {sizesList.map((s) => (
                  <option value={s} key={s}>
                    {s}
                  </option>
                ))}
              </select>
              <input
                type="number"
                name="qty"
                placeholder={noSize ? "Product Quantity" : "Size Quantity"}
                min={1}
                value={size.qty}
                onChange={(e) => handleSize(i, e)}
              />
              <input
                type="number"
                name="price"
                placeholder={noSize ? "Product Price" : "Size Price"}
                min={1}
                value={size.price}
                onChange={(e) => handleSize(i, e)}
              />
              {!noSize ? (
                <>
                  <BsFillPatchMinusFill onClick={() => handleRemove(i)} />
                  <BsFillPatchPlusFill
                    onClick={() => {
                      setProduct({
                        ...product,
                        sizes: [
                          ...sizes,
                          {
                            size: "",
                            qty: 0,
                            price: 0,
                          } as SizeType,
                        ],
                      } as LeanProductType);
                    }}
                  />
                </>
              ) : (
                ""
              )}
            </div>
          ))
        : ""}
    </div>
  );
}

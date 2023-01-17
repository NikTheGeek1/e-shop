import { ChangeEvent } from "react";
import { BsFillPatchMinusFill, BsFillPatchPlusFill } from "react-icons/bs";
import { LeanProductType, ProductDetailsType } from "../../../../types/product";
import styles from "./styles.module.scss";

type DetailsProps = {
  details: ProductDetailsType[];
  product: LeanProductType;
  setProduct: React.Dispatch<React.SetStateAction<LeanProductType>>;
};

export default function Details({ details, product, setProduct }: DetailsProps) {
  const handleDetails = (i: number, e: ChangeEvent<HTMLInputElement>) => {
    const values = [...details];
    values[i][e.target.name] = e.target.value;
    setProduct({ ...product, details: values } as LeanProductType);
  };
  const handleRemove = (i: number) => {
    if (details.length > 0) {
      const values = [...details];
      values.splice(i, 1);
      setProduct({ ...product, details: values } as LeanProductType);
    }
  };
  console.log("product details", product.details);
  return (
    <div>
      <div className={styles.header}>Details</div>
      {details.length == 0 && (
        <BsFillPatchPlusFill
          className={styles.svg}
          onClick={() => {
            setProduct({
              ...product,
              details: [
                ...details,
                {
                  name: "",
                  value: "",
                },
              ],
            } as LeanProductType);
          }}
        />
      )}
      {details
        ? details.map((detail, i) => (
            <div className={styles.clicktoadd} key={i}>
              <input
                type="text"
                name="name"
                placeholder="Name"
                value={detail.name}
                onChange={(e) => handleDetails(i, e)}
              />
              <input
                type="text"
                name="value"
                placeholder="Value"
                value={detail.value}
                onChange={(e) => handleDetails(i, e)}
              />

              <>
                <BsFillPatchMinusFill onClick={() => handleRemove(i)} />
                <BsFillPatchPlusFill
                  onClick={() => {
                    setProduct({
                      ...product,
                      details: [
                        ...details,
                        {
                          name: "",
                          value: "",
                        },
                      ],
                    } as LeanProductType);
                  }}
                />
              </>
            </div>
          ))
        : ""}
    </div>
  );
}

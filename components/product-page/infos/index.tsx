import { LeanProductType } from "../../../types/product";
import styles from "./styles.module.scss";
import Rating from "@mui/material/Rating";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { slugStyleToNumber } from "../../../utils/helpers/product/slug-parameters-parser";
import Link from "next/link";
import Image from "next/image";
import { TbMinus, TbPlus } from "react-icons/tb";
import { BsHandbagFill, BsHeart } from "react-icons/bs";
import Share from "./share";
import AccordionComponent from "./Accordion";
type InfosProps = {
  product: LeanProductType;
  setActiveImg: (img: string) => void;
};

export default function Infos({ product, setActiveImg }: InfosProps) {
  const router = useRouter();
  const [size, setSize] = useState(router.query.size);
  const [qty, setQty] = useState(1);

  useEffect(() => {
    setSize("");
    setQty(1);
  }, [router.query.size]);

  useEffect(() => {
    if (qty > product.quantity) setQty(product.quantity);
  }, [router.query.size]);
  return (
    <div className={styles.infos}>
      <div className={styles.infos__container}>
        <h1 className={styles.infos__name}>{product.name}</h1>
        <h2 className={styles.infos__sku}>{product.sku}</h2>
        <div className={styles.infos__rating}>
          <Rating
            name="half-rating"
            defaultValue={product.rating}
            precision={0.5}
            readOnly
            style={{ color: "#FACF19" }}
          />{" "}
          {product.numReviews}({product.numReviews > 1 ? " reviews" : " review"}
          )
        </div>
        <div className={styles.infos__price}>
          {!size ? (
            <h2>{`From ${product.priceRange[0]} to ${product.priceRange[1]}$`}</h2>
          ) : (
            <h1>${product.price}</h1>
          )}
          {product.discount ? (
            <h3>
              {size && <span>{product.priceBefore}$</span>}
              <span>(-{product.discount}%)</span>
            </h3>
          ) : (
            ""
          )}
        </div>
        <span className={styles.infos__shipping}>
          {product.shipping
            ? `+ ${product.shipping}$ shipping`
            : "Free shipping"}
        </span>
        <span>
          {size
            ? product.quantity
            : product.sizes.reduce((start, next) => start + next.qty, 0)}{" "}
          pieces available.
        </span>
        <div className={styles.infos__sizes}>
          <h4>Select a size: </h4>
          <div className={styles.infos__sizes_wrap}>
            {product.sizes.map((size, index) => (
              <Link
                key={index}
                href={`/product/${product.slug}?style=${slugStyleToNumber(
                  router.query.style
                )}&size=${index}`}
              >
                <div
                  className={`${styles.infos__sizes_size} ${
                    index.toString() == router.query.size && styles.active_size
                  }`}
                  onClick={() => setSize(size.size)}
                >
                  {size.size}
                </div>
              </Link>
            ))}
          </div>
        </div>
        <div className={styles.infos__colors}>
          {product.colors &&
            product.colors.map((color, index) => (
              <span
              key={index + color.image}
                className={
                  index.toString() == router.query.style
                    ? styles.active_color
                    : ""
                }
                onMouseOver={() =>
                  setActiveImg(product.subProducts[index].images[0].url)
                }
                onMouseLeave={() => setActiveImg("")}
              >
                <Link href={`/product/${product.slug}?style=${index}`}>
                  <Image
                    alt="colour"
                    width={50}
                    height={50}
                    src={color.image}
                  />
                </Link>
              </span>
            ))}
        </div>
        <div className={styles.infos__qty}>
          <button onClick={() => qty > 1 && setQty((prev) => prev - 1)}>
            <TbMinus />
          </button>
          <span>{qty}</span>
          <button
            onClick={() => qty < product.quantity && setQty((prev) => prev + 1)}
          >
            <TbPlus />
          </button>
        </div>
        <div className={styles.infos__actions}>
          <button
            disabled={product.quantity < 1}
            style={{
              cursor: product.quantity < 1 ? "not-allowed" : "pointer",
            }}
          >
            <BsHandbagFill />
            <b>ADD TO CART</b>
          </button>
          <button>
            <BsHeart />
            WISHLIST
          </button>
        </div>
        <Share />
        <AccordionComponent description={product.description} details={[...product.details]} />
      </div>
    </div>
  );
}

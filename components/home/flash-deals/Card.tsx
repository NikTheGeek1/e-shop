import Link from "next/link";
import styles from "./styles.module.scss";
import { MdFlashOn } from "react-icons/md";
import Image from "next/image";

type FlashCardProps = {
  product: {
    image: string;
    link: string;
    discount: number;
    price: number;
    sold: number;
  };
};

export default function FlashCard({ product }: FlashCardProps) {
  return (
    <div className={styles.card}>
      <div className={styles.card__img}>
        <Link href={product.link}>
          <Image width={150} height={230} src={product.image} alt="product" />
        </Link>
        <div className={styles.flash}>
          <MdFlashOn />
          <span>-{product.discount}%</span>
        </div>
      </div>
      <div className={styles.card__price}>
        <span>
          USD{(product.price - product.price / product.discount).toFixed(2)}$
        </span>
        <span>
          -USD
          {(
            product.price -
            (product.price - product.price / product.discount)
          ).toFixed(2)}
          $
        </span>
      </div>
      <div className={styles.card__bar}>
        <div
          className={styles.card__bar_inner}
          style={{ width: `${product.sold}%` }}
        ></div>
      </div>
      <div className={styles.card__percentage}>Sold: {product.sold}%</div>
    </div>
  );
}

import { BsArrowRightCircle } from "react-icons/bs";
import styles from "./styles.module.scss";
import { useMediaQuery } from "react-responsive";
import Image from "next/image";

type CategoryProps = {
  header: string;
  products: {
    image: string;
  }[];
  background: string;
};

export default function Category({
  header,
  products,
  background,
}: CategoryProps) {
  const isMedium = useMediaQuery({ query: "(max-width:1300px)" });
  const isMobile = useMediaQuery({ query: "(max-width:550px)" });
  return (
    <div className={styles.category} style={{ background: `${background}` }}>
      <div className={styles.category__header}>
        <h1>{header}</h1>
        <BsArrowRightCircle />
      </div>
      <div className={styles.category__products}>
        {products
          .slice(0, isMobile ? 6 : isMedium ? 4 : 6)
          .map((product, idx) => (
            <div key={product.image + idx} className={styles.product}>
              <Image
                width={150}
                height={150}
                src={product.image}
                alt="product_img"
              />
            </div>
          ))}
      </div>
    </div>
  );
}

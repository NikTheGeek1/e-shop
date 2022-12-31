import { useMediaQuery } from "react-responsive";
import {
  women_accessories,
  women_dresses,
  women_shoes,
} from "../../../data/home";
import Category from "./category";
import styles from "./styles.module.scss";

export default function Categories() {
  const isMedium = useMediaQuery({ query: "(max-width:850px)" });
  const isMobile = useMediaQuery({ query: "(max-width:550px)" });
  return (
    <div className={styles.home__categories}>
      <Category
        header="Dresses"
        products={women_dresses}
        background="#5a31f4"
      />
      {!isMedium && (
        <Category header="Shoes" products={women_shoes} background="#3c811f" />
      )}
      {isMobile && (
        <Category header="Shoes" products={women_shoes} background="#3c811f" />
      )}
      <Category
        header="Accessories"
        products={women_accessories}
        background="#000"
      />
    </div>
  );
}

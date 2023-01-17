import { CouponSchemaType } from "../../../models/Coupon";
import ListItem from "./ListItem";
import styles from "./styles.module.scss";

type ListProps = {
  coupons: CouponSchemaType[];
  setCoupons: React.Dispatch<React.SetStateAction<CouponSchemaType[]>>;
};

export default function List({ coupons, setCoupons }: ListProps) {
  return (
    <ul className={styles.list}>
      {coupons.map((coupon) => (
        <ListItem coupon={coupon} key={coupon._id} setCoupons={setCoupons} />
      ))}
    </ul>
  );
}

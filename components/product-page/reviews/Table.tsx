import { Pagination } from "@mui/material";
import { ChangeEvent, useState } from "react";
import { ReviewType } from "../../../models/Product";
import { ColorType, SizeType } from "../../../types/product";
import usePagination from "./Pagination";
import Review from "./Review";
import styles from "./styles.module.scss";
import TableHeader from "./TableHeader";

type TableProps = {
  reviews: ReviewType[];
  allSizes: SizeType[];
  colors: ColorType[];
};

export default function Table({ reviews, allSizes, colors }: TableProps) {
  const [page, setPage] = useState(1);
  const PER_PAGE = 3;
  const count = Math.ceil(reviews.length / PER_PAGE);
  const _DATA = usePagination(reviews, PER_PAGE);
  const handleChange = (e: ChangeEvent<unknown>, p: number) => {
    setPage(p);
    _DATA.jump(p);
  };
  return (
    <div className={styles.table}>
      <TableHeader
        allSizes={[{ size: "All", price: 0, qty: 0 }, ...allSizes]}
        colors={[{ color: "all", image: "" }, ...colors]}
      />
      <div className={styles.table__data}>
        {_DATA.currentData().map((review, i) => (
          <Review review={review} key={i} />
        ))}
      </div>
      <div className={styles.pagination}>
        <Pagination
          count={count}
          page={page}
          // variant="round"
          shape="rounded"
          onChange={handleChange}
        />
      </div>
    </div>
  );
}

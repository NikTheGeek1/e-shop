import { useState } from "react";
import { ColorType, SizeType } from "../../../types/product";
import styles from "./styles.module.scss";
import TableSelect from "./TableSelect";

type TableHeaderProps = {
  allSizes: SizeType[];
  colors: ColorType[];
};



export default function TableHeader({ allSizes, colors }: TableHeaderProps) {
  const [rating, setRating] = useState<RatingType | undefined>();
  const [size, setSize] = useState("");
  const [style, setStyle] = useState<ColorType | undefined>();
  const [order, setOrder] = useState<OrderType | undefined>();

  const handleSelect = (type: "size" | "style" | "rating" | "order", value: RatingType | OrderType | string | ColorType | SizeType) => {
    if (type === "size") {
      setSize(value as string);
    } else if (type === "style") {
      setStyle(value as ColorType);
    } else if (type === "rating") {
      setRating(value as RatingType);
    } else if (type === "order") {
      setOrder(value as OrderType);
    }
  };


  return (
    <div className={styles.table__header}>
      <TableSelect
        property={rating}
        text="Rating"
        data={ratings}
        handleChange={(value) => handleSelect("rating", value)}
      />
      <TableSelect
        property={size || ""}
        text="Size"
        data={allSizes}
        handleChange={(value) => handleSelect("size", value)}
      />
      <TableSelect
        property={style || ""}
        text="Style"
        data={colors}
        handleChange={(value) => handleSelect("style", value)}
      />
      <TableSelect
        property={order || ""}
        text="Order"
        data={orderOptions}
        handleChange={(value) => handleSelect("order", value)}
      />
    </div>
  );
}
export type RatingType = {
  text: string;
  value: number | string;
};

const ratings: RatingType[] = [
  {
    text: "All",
    value: "All",
  },
  {
    text: "5 star",
    value: 5,
  },
  {
    text: "4 star",
    value: 4,
  },
  {
    text: "3 star",
    value: 3,
  },
  {
    text: "2 star",
    value: 2,
  },
  {
    text: "1 star",
    value: 1,
  },
];

export type OrderType = {
  text: string;
  value: string;
};

const orderOptions: OrderType[] = [
  {
    text: "Recommended",
    value: "Recommended",
  },
  {
    text: "Most recent to oldest",
    value: "Most recent to oldest",
  },
  {
    text: "Oldest to most recent",
    value: "Oldest to most recent",
  },
];

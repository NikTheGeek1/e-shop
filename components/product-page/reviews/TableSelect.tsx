import styles from "./styles.module.scss";
import { IoArrowDown } from "react-icons/io5";
import { useState } from "react";
import { ColorType, SizeType } from "../../../types/product";
import { OrderType, RatingType } from "./TableHeader";

type TableSelectProps = {
  property:
    | OrderType
    | RatingType
    | ColorType
    | SizeType
    | string
    | number
    | undefined;
  text: "Style" | "Size" | "Rating" | "Order";
  data: SizeType[] | ColorType[] | string[] | RatingType[] | OrderType[];
  handleChange: (value: string | ColorType | SizeType) => void;
};

export default function TableSelect({
  property,
  text,
  data,
  handleChange,
}: TableSelectProps) {
  const [visible, setVisible] = useState(false);

  let styleBackground = "none";
  if (text == "Style" && (property as ColorType).color === "all") {
    styleBackground = "none";
  } else if (text == "Style" && (property as ColorType).color) {
    styleBackground = `${(property as ColorType).color}`;
  }
  return (
    <div className={styles.select}>
      {text}:
      <div
        className={styles.select__header}
        onMouseOver={() => setVisible(true)}
        onMouseLeave={() => setVisible(false)}
        style={{
          background: `${text == "Style" && styleBackground}`,
        }}
      >
        <span
          className={`${styles.flex} ${styles.select__header_wrap}`}
          style={{
            padding: "0 5px",
          }}
        >
          <>
            {text == "Rating" || text == "Size" || text == "Order" ? (
              property || `Select ${text}`
            ) : text == "Style" && (property as ColorType).image ? (
              <img src={(property as ColorType).image} alt="" />
            ) : text == "Style" && (property as ColorType).color === "all" ? (
              "All Styles"
            ) : (
              "Select Style"
            )}
            <IoArrowDown />
          </>
        </span>
        {visible && (
          <ul
            className={styles.select__header_menu}
            onMouseOver={() => setVisible(true)}
            onMouseLeave={() => setVisible(false)}
            style={{ width: text === "Order" ? "200px" : "" }}
          >
            {data.map((item: any, i: any) => {
              if (text == "Rating") {
                return (
                  <li key={i} onClick={() => handleChange(item.value)}>
                    <span>{item.text}</span>
                  </li>
                );
              }
              if (text == "Size") {
                return (
                  <li key={i} onClick={() => handleChange(item.size)}>
                    <span>{item.size}</span>
                  </li>
                );
              }
              if (text == "Style") {
                return (
                  <li
                    key={i}
                    onClick={() => handleChange(item)}
                    style={{ backgroundColor: `${item.color}` }}
                  >
                    <span>
                      {item.image ? (
                        <img src={item.image} alt="" />
                      ) : (
                        "All Styles"
                      )}
                    </span>
                  </li>
                );
              }
              if (text == "Order") {
                return (
                  <li
                    style={{ width: text == "Order" ? "200px" : "" }}
                    key={i}
                    onClick={() => handleChange(item.value)}
                  >
                    <span>{item.text}</span>
                  </li>
                );
              }
            })}
          </ul>
        )}
      </div>
    </div>
  );
}

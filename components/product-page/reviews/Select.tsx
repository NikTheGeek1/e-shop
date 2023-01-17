import styles from "./styles.module.scss";
import { IoArrowDown } from "react-icons/io5";
import { useState } from "react";
import { SizeType, ColorType } from "../../../types/product";

type SelectProps = {
  property: ColorType | SizeType | string | null;
  text: "Style" | "Size" | "How does it fit";
  data: SizeType[] | ColorType[] | string[];
  handleChange: (value: string | ColorType | SizeType) => void;
};

export default function Select({
  property,
  text,
  data,
  handleChange,
}: SelectProps) {
  const [visible, setVisible] = useState(false);
  return (
    <div className={styles.select}>
      {text}:
      <div
        className={styles.select__header}
        onMouseOver={() => setVisible(true)}
        onMouseLeave={() => setVisible(false)}
        style={{
          background: `${
            text == "Style" && (property as ColorType).color && `${(property as ColorType).color}`
          }`,
        }}
      >
        <span
          className={`${styles.flex} ${styles.select__header_wrap}`}
          style={{
            padding: "0 5px",
          }}
        >
          <>
            {text == "Size" ? (
              property || `Select ${text}`
            ) : text == "Style" && (property as ColorType).image ? (
              <img src={(property as ColorType).image} alt="" />
            ) : text == "How does it fit" && property ? (
              property
            ) : !property && text == "How does it fit" ? (
              "How Does it fit"
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
          >
            {data.map((item, i) => {
              if (text == "Size") {
                const sizeItem = item as SizeType;
                return (
                  <li key={i} onClick={() => handleChange(sizeItem.size)}>
                    <span>{sizeItem.size}</span>
                  </li>
                );
              }
              if (text == "Style") {
                const styleItem = item as ColorType;
                return (
                  <li
                    key={i}
                    onClick={() => handleChange(item)}
                    style={{ backgroundColor: `${styleItem.color}` }}
                  >
                    <span>
                      <img src={styleItem.image} alt="" />
                    </span>
                  </li>
                );
              }
              if (text == "How does it fit") {
                return (
                  <li key={i} onClick={() => handleChange(item)}>
                    <span>{item as any}</span>
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

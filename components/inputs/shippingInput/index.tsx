import styles from "./styles.module.scss";
import { useField, ErrorMessage, FieldHookConfig } from "formik";
import { useEffect, useState, useRef } from "react";

interface ShippingInputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  placeholder: string;
}

export default function ShippingInput({
  placeholder,
  ...props
}: ShippingInputProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [field, meta] = useField(props as FieldHookConfig<string>);
  const [move, setMove] = useState(false);

  useEffect(() => {
    if (field.value.length > 0) {
      setMove(true);
    } else {
      setMove(false);
    }
  }, [field.value]);

  return (
    <div
      className={`${styles.input} ${
        meta.touched && meta.error && styles.error__shipping
      }`}
    >
      <div
        className={styles.input__wrapper}
        onFocus={() => setMove(true)}
        onBlur={() => setMove(field.value.length > 0 ? true : false)}
      >
        <input ref={inputRef} {...field} {...props} />
        <span
          className={move ? styles.move : ""}
          onClick={() => {
            inputRef.current?.focus();
            setMove(true);
          }}
        >
          {placeholder}
        </span>
      </div>
      <p>{meta.touched && meta.error && <ErrorMessage name={field.name} />}</p>
    </div>
  );
}

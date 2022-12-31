import { useField, FieldHookConfig, ErrorMessage } from "formik";
import { IconType } from "react-icons";
import styles from "./styles.module.scss";
interface LoginInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  IconComponent?: IconType;
  placeholder: string;
}

export default function LoginInput({
  IconComponent,
  placeholder,
  ...props
}: LoginInputProps) {
  const [field, meta] = useField(props as FieldHookConfig<string>);

  return (
    <div
      className={`${styles.input} ${
        meta.touched && meta.error ? styles.error : ""
      }`}
    >
      {IconComponent && <IconComponent />}
      <input {...field} {...props} placeholder={placeholder} />
      {meta.touched && meta.error ? (
        <div className={styles.error__popup}>
          <span></span>
          <ErrorMessage name={field.name} />
        </div>
      ) : null}
    </div>
  );
}

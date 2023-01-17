import { ErrorMessage, FieldHookConfig, useField } from "formik";
import styles from "./styles.module.scss";

interface AdminInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  placeholder: string;
  label: string;
}

export default function AdminInput({
  placeholder,
  label,
  ...props
}: AdminInputProps) {
  const [field, meta] = useField(props as FieldHookConfig<string>);
  return (
    <div>
      <label
        className={`${styles.label} ${
          meta.touched && meta.error ? styles.inputError : ""
        }`}
      >
        <span>{label}</span>
        <input {...field} {...props} placeholder={placeholder} />
      </label>
      {meta.touched && meta.error && (
        <div className={styles.inputError__msg}>
          <span></span>
          <ErrorMessage name={field.name} />
        </div>
      )}
    </div>
  );
}

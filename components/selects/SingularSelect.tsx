import { MenuItem, StandardTextFieldProps, TextField } from "@mui/material";
import { ErrorMessage, FieldHookConfig, useField } from "formik";
import { ICountryData } from "../../data/countries";
import styles from "./styles.module.scss";

interface SingularSelectProps extends StandardTextFieldProps{
  data: ICountryData[] | any;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder: string;
  header?: string;
  disabled?: boolean;
};

export default function SingularSelect({
  data,
  handleChange,
  placeholder,
  header,
  disabled,
  ...rest
}: SingularSelectProps) {
  const [field, meta] = useField(rest as FieldHookConfig<string>);
  return (
    <div style={{ marginBottom: "1rem" }}>
      {header && (
        <div
          className={`${styles.header} ${
            meta.error ? styles.header__error : ""
          }`}
        >
          <div className={styles.flex}>
            {meta.error && (
              <img src="../../../images/warning.png" alt="warning" />
            )}
            {header}
          </div>
        </div>
      )}
      <TextField
        variant="outlined"
        name={field.name}
        select
        label={placeholder}
        disabled={disabled}
        value={field.value}
        onChange={handleChange}
        className={`${styles.select} ${
          meta.touched && meta.error && styles.error__select
        }`}
      >
        <MenuItem key={""} value={""}>
          No Selected / Or Empty
        </MenuItem>
        {data.map((option: ICountryData[] | any) => (
          <MenuItem key={option._id || option.name} value={option._id || option.name}>
            {option.name}
          </MenuItem>
        ))}
      </TextField>
      {meta.touched && meta.error && (
        <p className={styles.error__msg}>
          <ErrorMessage name={field.name} />
        </p>
      )}
    </div>
  );
}

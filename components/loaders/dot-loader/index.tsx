import styles from "./styles.module.scss";
import DotLoader from "react-spinners/DotLoader";

type DotLoaderProps = {
  loading: boolean;
};
export default function DotLoaderComponent({ loading }: DotLoaderProps) {
  return (
    <div className={styles.loader}>
      <DotLoader color="#2f82ff" loading={loading} />
    </div>
  );
}

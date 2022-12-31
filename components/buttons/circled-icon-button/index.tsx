import { IconType } from "react-icons";
import styles from "./styles.module.scss";

interface CircledIconButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  title: string;
  IconComponent: IconType;
}

export default function CircledIconButton({
  title,
  IconComponent,
}: CircledIconButtonProps) {
  return (
    <button className={styles.button}>
      {title}
      <div className={styles.svg__wrap}>
        <IconComponent />
      </div>
    </button>
  );
}

import styles from "./styles.module.scss";
import { BiLeftArrowAlt } from "react-icons/bi";
import Link from "next/link";

type LoginHeaderProps = {
    title: string;
    subtitle: string;
};
export default function LoginHeader({ title, subtitle }: LoginHeaderProps) {
  return (
    <div className={styles.header}>
      <div className={styles.back__svg}>
        <BiLeftArrowAlt />
      </div>
      <span>
        {title}<Link href="/">{subtitle}</Link>
      </span>
    </div>
  );
}

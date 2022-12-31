import { CountryType } from "../../utils/server-props/get-country";
import Ad from "./Ad";
import Main from "./Main";
import styles from "./styles.module.scss";
import Top from "./Top";

type HeaderProps = {
  country: CountryType;
};
export default function Header({ country }: HeaderProps) {
  return (
    <header className={styles.header}>
      <Ad />
      <Top country={country}/>
      <Main />
    </header>
  );
}

import { CountryType } from "../../types/country";
import Copyright from "./Copyright";
import Links from "./Links";
import Newsletter from "./Newsletter";
import Payment from "./Payment";
import Socials from "./Socials";
import styles from "./styles.module.scss";

type FooterProps = {
    country: CountryType;
};

export default function Footer({ country }: FooterProps) {
    return (
        <footer className={styles.footer}>
            <div className={styles.footer__container}>
                <Links />
                <Socials />
                <Newsletter />
                <Payment />
                <Copyright country={country}/>
            </div>
        </footer>
    );
}
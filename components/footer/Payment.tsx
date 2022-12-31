import Image from "next/image";
import styles from "./styles.module.scss";

export default function Payment() {
  return (
    <div className={styles.footer__payment}>
      <h3>WE ACCEPT</h3>
      <div className={styles.footer__flexwrap}>
        <Image width={60} height={36} src="/images/payment/visa.webp" alt="payment_visa" />
        <Image width={60} height={36} src="/images/payment/mastercard.webp" alt="payment_mastercard" />
        <Image width={60} height={36} src="/images/payment/paypal.webp" alt="payment_paypal" />
      </div>
    </div>
  );
}

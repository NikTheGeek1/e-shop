import Header from "./Header";
import Menu from "./Menu";
import HomeOffers from "./Offers";
import styles from "./styles.module.scss";
import Swiper from "./Swiper";
import User from "./User";

export default function HomeMain() {
  return (
    <div className={styles.main}>
      <Header />
      <Menu />
      <Swiper />
      <HomeOffers />
      <User />
    </div>
  );
}

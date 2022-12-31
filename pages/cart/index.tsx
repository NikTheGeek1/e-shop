import Footer from "../../components/footer";
import Header from "../../components/header";
import { CountryType } from "../../utils/server-props/get-country";

type CartProps = {
  country: CountryType;
};

export default function Cart({ country }: CartProps) {
  return (
    <div>
      <Header country={country} />
      cart
      <Footer country={country} />
    </div>
  );
}

export { default as getServerSideProps } from "../../utils/server-props/get-country";

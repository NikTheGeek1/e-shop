import { useSession } from "next-auth/react";
import Footer from "../components/footer";
import Header from "../components/header";
import getCountryServerSideProps from "../utils/server-props/get-country";
import styles from "../styles/Home.module.scss";
import HomeMain from "../components/home/main";
import FlashDeals from "../components/home/flash-deals";
import Categories from "../components/home/categories";
import { GetServerSidePropsContext } from "next";
import db from "../utils/db/db";
import Product, { ProductType } from "../models/Product";
import { women_swiper } from "../data/home";
import ProductsSwiper from "../components/products-swiper";
import ProductCard from "../components/product-card";
import { CountryType } from "../types/country";

type HomeProps = {
  country: CountryType;
  products: ProductType[];
};

export default function Home({ country, products }: HomeProps) {
  const { data: session } = useSession();

  return (
    <>
      <Header country={country} />
      <div className={styles.home}>
        <div className={styles.container}>
          <HomeMain />
          <FlashDeals />  
          <Categories />
          <ProductsSwiper products={women_swiper} />
          <div className={styles.products}>
            {products.map((product) => (
              <ProductCard product={product} key={product._id} />
            ))}
          </div>
        </div>
      </div>
      <Footer country={country} />
    </>
  );
}

// export async function getStaticProps() {
//   const countryServProps = await getCountryServerSideProps();
//   await db.connect();
//   let products = await Product.find().sort({ createdAt: -1 }).lean();
//   db.disconnect();
//   console.log("in static props")
//   return {
//     props: {
//       ...countryServProps.props,
//       products: JSON.parse(JSON.stringify(products)) || [],
//     },
//     revalidate: 10, // the page will be regenerated every x seconds, in between the page will be served from the cache
//   };
// }

export async function getServerSideProps(context: GetServerSidePropsContext) {
  // this function is called on every request
  const countryServProps = await getCountryServerSideProps();
  await db.connect();
  const products = await Product.find().sort({ createdAt: -1 }).lean(); // lean() is used to convert mongoose document to plain javascript object
  db.disconnect();
  return {
    props: {
      ...countryServProps.props,
      products: JSON.parse(JSON.stringify(products)) || [], // JSON.parse(JSON.stringify()) is used to convert mongoose document to plain javascript object
    },
  };
}
import { GetServerSidePropsContext } from "next";
import styles from "../../styles/Product.module.scss";
import db from "../../utils/db/db";
import Product from "../../models/Product";
import { ProductType as FullProductType } from "../../models/Product";
import { LeanProductType } from "../../types/product";
import fullToLean from "../../utils/helpers/product/full-to-lean";
import {
  slugSizeToNumber,
  slugStyleToNumber,
} from "../../utils/helpers/product/slug-parameters-parser";
import Head from "next/head";
import Header from "../../components/header";
import Footer from "../../components/footer";
import { CountryType } from "../../types/country";
import getCountryProps from "../../utils/server-props/get-country";
import Category from "../../models/Category";
import SubCategory from "../../models/SubCategory";
import MainSwiper from "../../components/product-page/main-swiper";
import { useState } from "react";
import Infos from "../../components/product-page/infos";

type ProductProps = {
  product: LeanProductType;
  country: CountryType;
};

export default function ProductPage({ product, country }: ProductProps) {
  const [activeImg, setActiveImg] = useState("");
  return (
    <>
      <Head>
        <title>{product.name}</title>
      </Head>
      <Header country={country} />
      <div className={styles.product}>
        <div className={styles.container}>
          <div className={styles.path}>
            Home / {product.category.name} / {
              product.subCategories.map((subCategory) => <span>/{subCategory.name}</span>)
            }
          </div>
          <div className={styles.product__main}>
            <MainSwiper images={product.images} activeImg={activeImg} />
            <Infos product={product} setActiveImg={setActiveImg}/>
          </div>
        </div>
      </div>
      <Footer country={country} />
    </>
  );
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
  await db.connect();
  const { query } = context;
  const slug = query.slug;

  const sizeNumber = slugSizeToNumber(query.size);
  const styleNumber = slugStyleToNumber(query.style);

  const product: FullProductType = await Product.findOne({ slug })
    .populate({path: "category", model: Category}) // we need to populate the Category field (using the category id) to get the category name
    .populate({path: "subCategories", model: SubCategory})
    .lean();

  if (!product) {
    return {
      notFound: true,
    };
  }
  const leanProduct: LeanProductType = fullToLean(
    product,
    styleNumber,
    sizeNumber
  );
  const countryProps = await getCountryProps();
  db.disconnect();
  return {
    props: {
      country: countryProps.props.country,
      product: JSON.parse(JSON.stringify(leanProduct)), // we need to parse and stringify the object to remove mongoose methods
    },
  };
}

import { CategoryType } from "../models/Category";
import { ProductType } from "../models/Product";
import { SubCategoryType } from "../models/SubCategory";

export interface LeanProductType extends ProductType {
    name: string;
    slug: string;
    images: {url: string, public_url: string}[];
    sizes: {
      size: string;
      qty: number;
      price: number;
    }[];
    discount: number;
    sku: string;
    colors: {
      color: string;
      image: string;
    }[];
    priceRange: number[];
    price: number;
    priceBefore: number;
    quantity: number;
    category: CategoryType;
    subCategories: SubCategoryType[];
  };
  
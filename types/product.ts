import { CategoryType } from "../models/Category";
import { ProductType } from "../models/Product";
import { SubCategoryType } from "../models/SubCategory";

export interface LeanProductType extends ProductType {
  name: string;
  slug: string;
  style: number;
  images: { url: string; public_url: string }[];
  sizes: SizeType[];
  discount: number;
  sku: string;
  colors: ColorType[];
  priceRange: number[];
  price: number;
  priceBefore: number;
  quantity: number;
  category: CategoryType;
  subCategories: SubCategoryType[];
  ratings: RatingType[];
  allSizes: SizeType[];
}

export interface CartProductType {
  _uid?: string;
  _id: string;
  style: number;
  name: string;
  description: string;
  slug: string;
  sku: string;
  brand: string;
  category: CategoryType;
  subCategories: SubCategoryType[];
  shipping: number;
  images: {
    url: string;
    public_url: string;
  }[];
  color: ColorType;
  size: string;
  price: number;
  priceBefore: number;
  stockQty: number;
  cartQty?: number;
  discount: number;
}

export type RatingType = {
  percentage: number;
  rating: number;
  ratingCount: number;
};

export type SizeType = {
  size: string;
  qty: number;
  price: number;
  [key: string]: string | number;
};

export type ColorType = {
  color: string;
  image: string;
};

export type ProductQuestionType = {
  question: string;
  answer: string;
  [key: string]: string;
};

export type ProductDetailsType = {
  name: string;
  value: string;
  [key: string]: string;
};

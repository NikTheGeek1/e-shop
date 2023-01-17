import mongoose from "mongoose";
import { ColorType, ProductDetailsType, ProductQuestionType, SizeType } from "../types/product";
import { CategoryType } from "./Category";
import { SubCategoryType } from "./SubCategory";
import { IUser } from "./User";


const ObjectId = mongoose.Schema.Types.ObjectId;

export interface ProductType extends mongoose.Document {
  _id: string;
  name: string;
  description: string;
  brand: string;
  slug: string;
  category: string | CategoryType;
  subCategories: string[] | SubCategoryType[];
  details: ProductDetailsType[];
  questions: ProductQuestionType[];
  reviews: ReviewType[];
  refundPolicy: string;
  rating: number;
  numReviews: number;
  shipping: number;
  subProducts: SubProductType[];
};

export type SubProductType = {
  sku: string;
  images: { url: string; public_url: string }[];
  description_images: string[];
  color: ColorType;
  sizes: SizeType[];
  discount: number;
  sold: number;
};
export type ReviewType = {
  _id?: string;
  reviewBy: string | IUser;
  rating: number;
  review: string;
  size: string;
  style: {
    color: string;
    image: string;
  };
  fit: string;
  images: { url: string; public_url: string }[];
  likes: {likes: number};
  updatedAt?: string;
  createdAt?: string;
};

const reviewSchema = new mongoose.Schema({
  reviewBy: {
    type: ObjectId,
    ref: "User",
    required: true,
  },
  rating: {
    type: Number,
    required: true,
    default: 0,
  },
  review: {
    type: String,
    required: true,
  },
  size: {
    type: String,
  },
  style: {
    color: String,
    image: String,
  },
  fit: {
    type: String,
  },
  images: [],
  likes: [],
});

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    brand: {
      type: String,
    },
    slug: {
      type: String,
      required: true,
      unique: true,
      //lowercase: true,
    },
    category: {
      type: ObjectId,
      required: true,
      ref: "Category",
    },
    subCategories: [
      {
        type: ObjectId,
        ref: "subCategory",
      },
    ],
    details: [
      {
        name: String,
        value: String,
      },
    ],
    questions: [
      {
        question: String,
        answer: String,
      },
    ],
    reviews: [reviewSchema],
    refundPolicy: {
      type: String,
      default: "30 days",
    },
    rating: {
      type: Number,
      required: true,
      default: 0,
    },
    numReviews: {
      type: Number,
      required: true,
      default: 0,
    },
    shipping: {
      type: Number,
      required: true,
      default: 0,
    },
    subProducts: [
      {
        sku: String,
        images: [],
        description_images: [],
        color: {
          color: {
            type: String,
          },
          image: {
            type: String,
          },
        },
        sizes: [
          {
            size: String,
            qty: Number,
            price: Number,
          },
        ],
        discount: {
          type: Number,
          default: 0,
        },
        sold: {
          type: Number,
          default: 0,
        },
      },
    ],
  },
  {
    timestamps: true,
  }
);
const Product =
  mongoose.models.Product || mongoose.model<ProductType & mongoose.Document>("Product", productSchema);

export default Product;

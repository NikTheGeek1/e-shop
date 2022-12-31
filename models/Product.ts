import mongoose from "mongoose";
const ObjectId = mongoose.Schema.Types.ObjectId;

export type ProductType = {
  _id: string;
  name: string;
  description: string;
  brand: string;
  slug: string;
  category: string;
  subCategories: string[];
  details: {
    name: string;
    value: string;
  }[];
  questions: {
    question: string;
    answer: string;
  }[];
  reviews: ReviewType[];
  refundPolicy: string;
  rating: number;
  numReviews: number;
  shipping: number;
  subProducts: SubProductType[];
}

export type SubProductType = {
  sku: string;
  images: string[];
  description_images: string[];
  color: {
    color: string;
    image: string;
  };
  sizes: {
    size: string;
    qty: number;
    price: number;
  }[];
  discount: number;
  sold: number;
}
export type ReviewType = {
  reviewBy: string;
  rating: number;
  review: string;
  size: string;
  style: {
    color: string;
    image: string;
  };
  fit: string;
  images: string[];
  likes: string[];
}

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
  mongoose.models.Product || mongoose.model("Product", productSchema);

export default Product;
